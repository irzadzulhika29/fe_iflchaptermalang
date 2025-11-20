import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useMemo, useEffect } from "react";
import { programsData } from "../../../static/event/program/programData";
import { programRegistrationFlow } from "../../../static/chatbot/eventRegistration";
import { useRegisterVolunteer } from "../../../features/volunteer/services";
import { useChatFlow } from "../../../features/volunteer/hooks/useChatFlow";
import ChatContainer from "../../../components/chatbot/chatcontainer";
import { isValidPhoneNumber, isValidInstagram } from "../../../utils/chatbot/formatter";

const findProgram = (slugOrId) =>
    programsData.find((p) => (p.slug || String(p.id)) === slugOrId) ||
    programsData.find((p) => String(p.id) === slugOrId);

export default function Chatbot() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { state } = useLocation();
    const programFromState = state?.program;
    const finalPrice = state?.finalPrice;
    const originalPrice = programFromState?.price || 75000;

    const program = useMemo(
        () =>
            programFromState ||
            findProgram(slug) || {
                title: "Program",
                sdgs: [{ code: "SDG3", name: "Good Health and Well-being" }],
                start_date: "2025-05-01",
                event_photo:
                    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
                description: "Program default",
                event_activity: "Workshop, Diskusi",
                participant: 0,
                committee: 0,
            },
        [programFromState, slug]
    );

    const flow = useMemo(() => programRegistrationFlow(program), [program]);

    const {
        messages,
        input,
        isTyping,
        answers,
        currentOptions,
        showSummary,
        currentStep,
        totalSteps,
        validationState,
        labels,
        setShowSummary,
        handleInputChange,
        handleSend,
        handleQuickReply,
        handleEdit,
        pushBot,
        flowIndex,
    } = useChatFlow(flow);

    const { mutate: submitRegistration, isPending: isSubmitting } = useRegisterVolunteer();

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (Object.keys(answers).length > 0 && !showSummary) {
                e.preventDefault();
                e.returnValue = "Data pendaftaran belum tersimpan. Yakin ingin keluar?";
                return e.returnValue;
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [answers, showSummary]);

    const handleConfirm = (editedAnswers) => {
        const finalAnswers = editedAnswers || answers;

        setShowSummary(false);
        pushBot("Sedang mengirim data kamu...");

        if (!finalAnswers.name) {
            pushBot("😔 Nama tidak boleh kosong. Coba lagi ya!");
            return;
        }

        if (!finalAnswers.phone_number || !isValidPhoneNumber(finalAnswers.phone_number)) {
            pushBot("😔 Nomor telepon tidak valid. Coba lagi ya!");
            return;
        }

        if (!finalAnswers.instagram || !isValidInstagram(finalAnswers.instagram)) {
            pushBot("😔 Instagram tidak valid. Coba lagi ya!");
            return;
        }

        const payload = {
            event_id: program.id,

            name: finalAnswers.name,
            phone_number: finalAnswers.phone_number,

            username_instagram: finalAnswers.instagram,
            info_source: finalAnswers.infoSource,
            motivation: finalAnswers.reason,

            experience: finalAnswers.experience,
            has_read_guidebook: String(finalAnswers.hasReadGuidebook).toUpperCase() === "SUDAH",
            is_committed: String(finalAnswers.commitment).toUpperCase() === "SIAP",

            google_drive_link: finalAnswers.proofDocuments,
        };

        submitRegistration(payload, {
            onSuccess: (data) => {
                let successMsg = "🎉 PENDAFTARAN BERHASIL!\n\n";
                successMsg += "━━━━━━━━━━━━━━━━━━━━━━\n\n";

                // Registration Info
                successMsg += "📋 INFORMASI PENDAFTARAN\n";
                successMsg += `👤 Nama: ${data?.name || finalAnswers.name}\n`;
                successMsg += `🎯 Event: ${program?.title || program?.event_name}\n`;

                if (data?.registration_id) {
                    successMsg += `🔖 ID Pendaftaran: ${data.registration_id}\n`;
                }

                successMsg += "\n━━━━━━━━━━━━━━━━━━━━━━\n\n";

                // Payment Info
                successMsg += "💰 RINCIAN PEMBAYARAN\n";

                const finalPriceValue = data?.pricing?.final_price || data?.final_price || finalPrice || originalPrice;
                const originalPriceValue = data?.pricing?.original_price || originalPrice;

                if (data?.pricing?.has_discount) {
                    successMsg += `💵 Harga Normal: Rp ${parseInt(originalPriceValue).toLocaleString("id-ID")}\n`;
                    successMsg += `🎁 Diskon: -Rp ${parseInt(
                        data?.pricing?.discount_amount || 0
                    ).toLocaleString("id-ID")}\n`;
                    successMsg += `✨ Kode Referral: ${data?.pricing?.referral_code_used}\n`;
                    successMsg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
                    successMsg += `✅ Total Bayar: Rp ${parseInt(finalPriceValue).toLocaleString("id-ID")}\n`;
                } else {
                    successMsg += `✅ Total Bayar: Rp ${parseInt(finalPriceValue).toLocaleString("id-ID")}\n`;
                }

                successMsg += "\n━━━━━━━━━━━━━━━━━━━━━━\n\n";

                // Status
                const statusText = data?.status === "pending" ? "⏳ Menunggu Verifikasi Pembayaran" : `✨ ${data?.status}`;
                successMsg += `📊 Status: ${statusText}\n\n`;

                successMsg += "━━━━━━━━━━━━━━━━━━━━━━\n\n";

                // Next Steps
                successMsg += "📱 LANGKAH SELANJUTNYA\n";
                successMsg += "• Tim kami akan menghubungi kamu via WhatsApp\n";
                successMsg += "• Pastikan nomor WhatsApp kamu aktif\n";
                successMsg += "• Cek email untuk konfirmasi pendaftaran\n\n";

                successMsg += "Terima kasih sudah mendaftar! 🙏✨\n";
                successMsg += "See you at the event! 🚀";

                pushBot(successMsg);

                setTimeout(() => navigate("/"), 5000);
            },
            onError: (error) => {
                console.error("Registration error:", error);

                let errorMsg = "😔 Maaf, terjadi kesalahan. ";

                if (error?.response?.status === 400) {
                    errorMsg += error.response?.data?.message || "Data yang kamu kirim tidak valid.";
                } else if (error?.response?.status === 401) {
                    errorMsg += "Kamu harus login dulu untuk mendaftar.";
                } else if (error?.response?.status === 404) {
                    errorMsg += "Event tidak ditemukan. Hubungi admin ya.";
                } else if (error?.response?.status === 500) {
                    errorMsg += "Server sedang bermasalah. Coba lagi nanti ya.";
                } else {
                    errorMsg += error?.message || "Coba lagi ya atau hubungi kami jika masalah berlanjut.";
                }

                if (error?.response?.data?.errors) {
                    errorMsg += "\n\nDetail:\n";
                    Object.entries(error.response.data.errors).forEach(([key, value]) => {
                        errorMsg += `- ${key}: ${value}\n`;
                    });
                }

                pushBot(errorMsg);
            },
        });
    };

    return (
        <ChatContainer
            program={program}
            currentStep={currentStep}
            totalSteps={totalSteps}
            messages={messages}
            isTyping={isTyping}
            showSummary={showSummary}
            validationState={validationState}
            currentOptions={currentOptions}
            answers={answers}
            labels={labels}
            input={input}
            isSubmitting={isSubmitting}
            onBack={() => navigate(-1)}
            onInputChange={handleInputChange}
            onSend={handleSend}
            onQuickReply={handleQuickReply}
            onConfirm={handleConfirm}
            onEdit={handleEdit}
            flow={flow}
            flowIndex={flowIndex}
            finalPrice={finalPrice}
            originalPrice={originalPrice}
        />
    );
}
