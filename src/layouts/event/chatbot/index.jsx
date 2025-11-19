import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
// import { programsData } from "../../../static/event/program/programData";
import TypingDots from "../../../components/chatbot/typingdots";
import ChatHeader from "../../../components/chatbot/chatheader";
import ChatComposer from "../../../components/chatbot/chatcomposer";
import MessageBubble from "../../../components/chatbot/messagebubble";
import { programRegistrationFlow } from "../../../static/chatbot/eventRegistration";
import SummaryCard from "../../../components/chatbot/summarycard";
import QuickReplyButtons from "../../../components/chatbot/quickreply";
import ProgressIndicator from "../../../components/chatbot/progressindicator";
import { formatWhatsApp, formatInstagram, isValidWhatsApp, isValidInstagram } from "../../../utils/chatbot/formatter";
import ValidationFeedback from "../../../components/chatbot/validationfeddback";
import FileUpload from "../../../components/chatbot/chatcomposer/fileupload";

const findProgram = (slugOrId) =>
    programsData.find((p) => (p.slug || String(p.id)) === slugOrId) ||
    programsData.find((p) => String(p.id) === slugOrId);

export default function Chatbot() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { state } = useLocation();
    const programFromState = state?.program;

    const program = useMemo(
        () =>
            programFromState ||
            findProgram(slug) || {
                title: "Program",
                sdgs: [{ code: "SDG3", name: "Good Health and Well-being" }],
                start_date: "2025-05-01",
                event_photo: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
                description: "Program default",
                event_activity: "Workshop, Diskusi",
                participant: 0,
                committee: 0
            },
        [programFromState, slug]
    );
    const flow = useMemo(() => programRegistrationFlow(program), [program]);
    const labels = useMemo(() => {
        const map = {};
        flow.forEach((s) => {
            if (s.type === "ask") map[s.key] = s.label || s.key;
        });
        return map;
    }, [flow]);

    const totalSteps = useMemo(() => {
        return flow.filter((s) => s.type === "ask").length;
    }, [flow]);

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [flowIndex, setFlowIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [answers, setAnswers] = useState({});
    const [uploadedFiles, setUploadedFiles] = useState({});
    const [currentUploadKey, setCurrentUploadKey] = useState(null); const [showSummary, setShowSummary] = useState(false);
    const [currentOptions, setCurrentOptions] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const endRef = useRef(null);
    const [validationState, setValidationState] = useState({
        status: null,
        message: "",
        preview: ""
    });

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "auto" });
    }, []);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
        if (messages.length > 0) {
        }
    }, [messages, isTyping, showSummary]);

    const calcDelay = (text) => {
        const len = (text || "").length;
        const perChar = 18;
        const base = 400;
        return Math.min(base + len * perChar, 1800);
    };

    const pushBot = (text, next) => {
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            setMessages((m) => [...m, { id: Date.now(), from: "bot", text }]);
            next && next();
        }, calcDelay(text));
    };

    const runStep = (i) => {
        const step = flow[i];
        if (!step) return;
        pushBot(step.text, () => {
            setFlowIndex(i);

            if (step.type === "ask") {
                const askSteps = flow.slice(0, i + 1).filter((s) => s.type === "ask");
                setCurrentStep(askSteps.length);
            }

            if (step.allowUpload) {
                setCurrentUploadKey(step.key);
            } else {
                setCurrentUploadKey(null);
            }

            if (step.type === "ask" && step.options) {
                setCurrentOptions(step.options);
            } else {
                setCurrentOptions(null);
            }

            const nxt = flow[i + 1];
            if (nxt && nxt.type === "bot" && !nxt.waitFor) {
                runStep(i + 1);
            }
        });
    };
    useEffect(() => {
        if (flow.length) runStep(0);
    }, [flow]);

    const goNextAsk = () => {
        const nextIndex = flow.findIndex((s, i) => i > flowIndex && s.type === "ask");
        if (nextIndex !== -1) {
            runStep(nextIndex);
        } else {
            const hint = flow.find((s) => s.id === "hint_done");
            if (hint) pushBot(hint.text);
        }
    };

    const validateInput = (value, step) => {
        if (!value.trim() || !step) {
            setValidationState({ status: null, message: "", preview: "" });
            return;
        }

        const v = value.trim();

        if (step.key === "whatsapp") {
            const formatted = formatWhatsApp(v);
            const isValid = isValidWhatsApp(formatted);

            if (isValid) {
                setValidationState({
                    status: "valid",
                    message: "✓ Format WhatsApp benar!",
                    preview: formatted,
                });
            } else if (v.length < 10) {
                setValidationState({
                    status: "warning",
                    message: "Nomor terlalu pendek. Minimal 10 digit.",
                    preview: "",
                });
            } else {
                setValidationState({
                    status: "invalid",
                    message: "Format belum benar. Contoh: 081234567890",
                    preview: formatted,
                });
            }
            return;
        }

        if (step.key === "instagram") {
            const formatted = formatInstagram(v);
            const isValid = isValidInstagram(formatted);

            if (isValid) {
                setValidationState({
                    status: "valid",
                    message: "✓ Username Instagram valid!",
                    preview: formatted,
                });
            } else if (v.length < 3) {
                setValidationState({
                    status: "warning",
                    message: "Username terlalu pendek.",
                    preview: "",
                });
            } else {
                setValidationState({
                    status: "invalid",
                    message: "Format belum benar. Contoh: @username atau username",
                    preview: formatted,
                });
            }
            return;
        }

        if (step.options && step.options.length > 0) {
            const normalizedInput = v.toUpperCase();
            const validOption = step.options.find(
                (opt) => opt.toUpperCase() === normalizedInput
            );

            if (validOption) {
                setValidationState({
                    status: "valid",
                    message: `✓ Pilihan valid: "${validOption}"`,
                    preview: "",
                });
            } else {
                setValidationState({
                    status: "warning",
                    message: `Pilih salah satu: ${step.options.join(", ")}`,
                    preview: "",
                });
            }
            return;
        }

        setValidationState({ status: null, message: "", preview: "" });
    };

    const handleSend = () => {
        const raw = input;
        const v = raw.trim();
        if (!v) return;

        setValidationState({ status: null, message: "", preview: "" });
        setMessages((m) => [...m, { id: Date.now(), from: "user", text: raw }]);
        setInput("");
        setCurrentUploadKey(null);

        const step = flow[flowIndex];

        if (step?.waitFor === "keyword") {
            const bag = (step.keyword || []).map((k) => k.toLowerCase());
            if (bag.includes(v.toLowerCase())) {
                const nextIndex = flowIndex + 1;
                if (flow[nextIndex]) runStep(nextIndex);
            } else {
                pushBot('Ketik **"siap"** dulu ya kalau kamu udah ready 😄');
            }
            return;
        }

        if (v.toLowerCase() === "udah") {
            setShowSummary(true);
            return;
        }

        if (step && step.type === "ask" && step.key) {
            let valueToSave = v;

            if (step.key === "whatsapp") {
                valueToSave = formatWhatsApp(v);

                if (!isValidWhatsApp(valueToSave)) {
                    pushBot('Format WhatsApp tidak valid. Coba lagi dengan nomor yang benar ya! 😊\n\nContoh: **081234567890** atau **+6281234567890**');
                    return;
                }

                pushBot(`Nomor WhatsApp kamu: ${valueToSave}`);
            }

            if (step.key === "instagram") {
                valueToSave = formatInstagram(v);

                if (!isValidInstagram(valueToSave)) {
                    pushBot('Format Instagram tidak valid. Pastikan username benar ya! 😊\n\nContoh: **@username** atau **username**');
                    return;
                }

                pushBot(`Instagram kamu: ${valueToSave}`);
            }

            if (step.options && step.options.length > 0) {
                const normalizedInput = v.toUpperCase();
                const validOption = step.options.find(opt => opt.toUpperCase() === normalizedInput);

                if (!validOption) {
                    pushBot(`Pilih salah satu: **${step.options.join("** atau **")}** ya 😊`);
                    return;
                }
                valueToSave = validOption;
            }

            if (step.allowUpload) {
                if (!uploadedFiles[step.key]) {
                    pushBot('⚠️ Kamu belum upload file. Silakan upload file atau ketik **"skip"** untuk lewati.');
                    return;
                }

                valueToSave = `📎 ${uploadedFiles[step.key].name}`;
                pushBot(`✅ File berhasil dipilih: **${uploadedFiles[step.key].name}**`);
            }

            setAnswers((a) => ({ ...a, [step.key]: valueToSave }));
        }

        setTimeout(goNextAsk, 250);
    };

    const handleFileSelected = (fileData) => {
        if (!fileData) {
            setUploadedFiles((prev) => {
                const newFiles = { ...prev };
                delete newFiles[currentUploadKey];
                return newFiles;
            });
            setInput("");
            return;
        }

        setUploadedFiles((prev) => ({
            ...prev,
            [currentUploadKey]: fileData,
        }));

        setInput(`📎 ${fileData.name}`);
    };

    const handleQuickReply = (selectedOption) => {
        setMessages((m) => [...m, { id: Date.now(), from: "user", text: selectedOption }]);

        const step = flow[flowIndex];

        if (step && step.type === "ask" && step.key) {
            setAnswers((a) => ({ ...a, [step.key]: selectedOption }));
        }

        setCurrentOptions(null);
        setTimeout(goNextAsk, 250);
    };

    const handleInputChange = (value) => {
        setInput(value);

        const step = flow[flowIndex];
        validateInput(value, step);
    };

    const handleConfirm = async () => {
        setShowSummary(false);
        pushBot("Sedang mengirim data kamu...");

        try {
            const uploadPromises = Object.entries(uploadedFiles).map(
                async ([key, fileData]) => {
                    const formData = new FormData();
                    formData.append("file", fileData.file);
                    formData.append("type", key);

                    const response = await fetch("/api/upload", {
                        method: "POST",
                        body: formData,
                    });

                    const data = await response.json();
                    return { key, url: data.url };
                }
            );

            const uploadResults = await Promise.all(uploadPromises);

            const finalAnswers = { ...answers };
            uploadResults.forEach(({ key, url }) => {
                finalAnswers[key] = url;
            });

            const response = await fetch("/api/volunteer/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...finalAnswers,
                    program_id: program.id,
                    registered_at: new Date().toISOString(),
                }),
            });

            if (response.ok) {
                pushBot("Mantap! Pendaftaran kamu berhasil dikirim!\n\nKami akan menghubungi kamu via WhatsApp untuk info selanjutnya. Terima kasih! 🙏");
            } else {
                throw new Error("Submission failed");
            }
        } catch (error) {
            console.error(error);
            pushBot("Maaf, terjadi kesalahan. Coba lagi ya atau hubungi kami jika masalah berlanjut.");
        }
    };

    const handleEdit = () => {
        setShowSummary(false);
        const lastAskIndex = [...flow]
            .map((s, i) => ({ s, i }))
            .filter((x) => x.s.type === "ask")
            .map((x) => x.i)
            .reverse()[0];
        if (Number.isInteger(lastAskIndex)) runStep(lastAskIndex);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <div className="max-w-4xl mx-auto w-full p-4 ">
                <div className="relative z-20">
                    <ChatHeader program={program} onBack={() => navigate(-1)} />
                </div>

                <div className="mt-6 relative z-20">
                    <ProgressIndicator
                        current={currentStep}
                        total={totalSteps}
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto ">
                <div className="max-w-4xl mx-auto px-4 pb-28 ">
                    <div className="min-h-screen flex flex-col justify-end gap-3">
                        {messages.map((m) => (
                            <MessageBubble key={m.id} from={m.from} text={m.text} />
                        ))}
                        {isTyping && <TypingDots />}
                        {!isTyping && !showSummary && validationState.status && (
                            <ValidationFeedback
                                status={validationState.status}
                                message={validationState.message}
                                preview={validationState.preview}
                            />
                        )}
                        {!isTyping && !showSummary && currentOptions && (
                            <QuickReplyButtons
                                options={currentOptions}
                                onSelect={handleQuickReply}
                            />
                        )}

                        {!isTyping && !showSummary && !currentOptions && currentUploadKey && (
                            <FileUpload
                                onFileSelected={handleFileSelected}
                                currentFile={uploadedFiles[currentUploadKey]}
                            />
                        )}

                        {showSummary && (
                            <SummaryCard
                                answers={answers}
                                mapping={labels}
                                files={uploadedFiles}
                                onConfirm={handleConfirm}
                                onEdit={handleEdit}
                            />
                        )}
                        <div ref={endRef} />
                    </div>
                </div>
            </div>

            <ChatComposer
                value={input}
                onChange={handleInputChange}
                onSend={handleSend}
                placeholder={currentOptions ? "Pilih salah satu opsi di atas..." : "Type your answer..."}
                disabled={currentOptions !== null}
            />
        </div>
    );
}
