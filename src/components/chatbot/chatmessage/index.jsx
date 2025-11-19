import MessageBubble from "../../../components/chatbot/messagebubble";
import TypingDots from "../../../components/chatbot/typingdots";
import ValidationFeedback from "../../../components/chatbot/validationfeddback";
import QuickReplyButtons from "../../../components/chatbot/quickreply";
import SummaryCard from "../../../components/chatbot/summarycard";

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
}) {
  return (
    <div className="flex flex-col justify-end gap-4">
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
        <QuickReplyButtons options={currentOptions} onSelect={onQuickReply} />
      )}

      {showSummary && <SummaryCard answers={answers} mapping={labels} onConfirm={onConfirm} onEdit={onEdit} />}

      <div ref={endRef} />
    </div>
  );
}