import { Send } from "lucide-react";

export default function ChatComposer({ value, onChange, onSend, placeholder, disabled = false }) {
  const handleKey = (e) => {
    if (e.key === "Enter" && value.trim() !== "" && !disabled) {
      e.preventDefault();
      onSend();
    }
  };

  const isEmpty = value.trim() === "";
  const isDisabled = disabled || isEmpty;

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-primary-1/10 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-4">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKey}
          placeholder={placeholder}
          disabled={disabled}
          className={`flex-1 rounded-2xl border border-primary-1/20 bg-white px-5 py-3 text-sm text-dark-1 shadow-sm outline-none transition focus:border-primary-1 focus:ring-2 focus:ring-primary-1/30 ${
            disabled ? "opacity-60 cursor-not-allowed" : ""
          }`}
        />
        <button
          onClick={!isDisabled ? onSend : undefined}
          disabled={isDisabled}
          className={`rounded-2xl px-4 py-3 text-white shadow-lg transition-all duration-200 active:scale-95 ${
            isDisabled
              ? "bg-primary-1/30 text-white/70 cursor-not-allowed"
              : "bg-gradient-to-r from-primary-2 to-primary-1 hover:shadow-primary-1/40"
          }`}
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}