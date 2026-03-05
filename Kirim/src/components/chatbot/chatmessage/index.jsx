import { useEffect, useRef } from "react";
import MessageBubble from "../../../components/chatbot/messagebubble";
import TypingDots from "../../../components/chatbot/typingdots";
import ValidationFeedback from "../../../components/chatbot/validationfeddback";
import QuickReplyButtons from "../../../components/chatbot/quickreply";
import SummaryCard from "../../../components/chatbot/summarycard";
import PaymentInfo from "../../../components/chatbot/paymentinfo";

export default function ChatMessages({
  messages,
  isTyping,
  showSummary,
  validationState,
  currentOptions,
  answers,
  labels,
  endRef,
  onQuickReply,
  onConfirm,
  onEdit,
  program,
  flow,
  flowIndex,
  finalPrice,
  originalPrice,
}) {
  // Check if current flow step should show Payment Info
  const shouldShowPayment = () => {
    if (!flow || flowIndex === undefined) return false;
    const currentStep = flow[flowIndex];
    return currentStep?.showPayment === true;
  };

  return (
    <div className="flex flex-col justify-end gap-4">
      {messages.map((m) => (
        <MessageBubble key={m.id} from={m.from} text={m.text} />
      ))}

      {isTyping && <TypingDots />}

      {!isTyping && !showSummary && shouldShowPayment() && (
        <div className="mb-4">
          <PaymentInfo
            program={program}
            finalPrice={finalPrice}
            originalPrice={originalPrice}
          />
        </div>
      )}

      {!isTyping && !showSummary && validationState.status && (
        <ValidationFeedback
          status={validationState.status}
          message={validationState.message}
          preview={validationState.preview}
        />
      )}

      {!isTyping && !showSummary && currentOptions && (
        <QuickReplyButtons options={currentOptions} onSelect={onQuickReply} />
      )}

      {showSummary && <SummaryCard answers={answers} mapping={labels} onConfirm={onConfirm} onEdit={onEdit} />}

      <div ref={endRef} />
    </div>
  );
}