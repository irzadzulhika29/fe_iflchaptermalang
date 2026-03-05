import { useRef, useEffect } from "react";
import ChatHeader from "../../../components/chatbot/chatheader";
import ChatComposer from "../../../components/chatbot/chatcomposer";
import ChatMessages from "../../../components/chatbot/chatmessage";

export default function ChatContainer({
    program,
    currentStep,
    totalSteps,
    messages,
    isTyping,
    showSummary,
    validationState,
    currentOptions,
    answers,
    labels,
    input,
    isSubmitting,
    onBack,
    onInputChange,
    onSend,
    onQuickReply,
    onConfirm,
    onEdit,
    flow,
    flowIndex,
    finalPrice,
    originalPrice,
}) {
    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping, showSummary]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-primary-2/10 via-white to-white pt-[88px] md:pt-[96px]">
            <div className="fixed inset-x-0 top-[100px] z-30 px-4">
                <div className="mx-auto w-full max-w-4xl py-4">
                    <ChatHeader
                        program={program}
                        onBack={onBack}
                        currentStep={currentStep}
                        totalSteps={totalSteps}
                    />
                </div>
            </div>

            <div className="mx-auto flex min-h-[calc(100vh-280px)] max-w-4xl flex-col justify-end translate-y-48 px-4 pb-32 pt-[220px] md:pt-[210px]">
                <div className="rounded-[32px] px-4 py-8 lg:px-10">
                    <ChatMessages
                        messages={messages}
                        isTyping={isTyping}
                        showSummary={showSummary}
                        validationState={validationState}
                        currentOptions={currentOptions}
                        answers={answers}
                        labels={labels}
                        endRef={endRef}
                        onQuickReply={onQuickReply}
                        onConfirm={onConfirm}
                        onEdit={onEdit}
                        program={program}
                        flow={flow}
                        flowIndex={flowIndex}
                        finalPrice={finalPrice}
                        originalPrice={originalPrice}
                    />
                </div>
            </div>

            <ChatComposer
                value={input}
                onChange={onInputChange}
                onSend={onSend}
                placeholder={
                    isSubmitting
                        ? "Sedang mengirim data..."
                        : currentOptions
                            ? "Pilih salah satu opsi di atas..."
                            : "Tulis jawabanmu di sini..."
                }
                disabled={currentOptions !== null || isSubmitting}
            />
        </div>
    );
}