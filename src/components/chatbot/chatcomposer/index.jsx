import { Send } from "lucide-react";

export default function ChatComposer({ value, onChange, onSend, placeholder }) {
  const handleKey = (e) => {
    if (e.key === "Enter" && value.trim() !== "") {
      e.preventDefault();
      onSend();
    }
  };

  const disabled = value.trim() === "";

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur border-t border-slate-200">
      <div className="max-w-4xl mx-auto p-3">
        <div className="flex items-center gap-2">
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKey}
            placeholder={placeholder}
            className="flex-1 px-4 py-3 rounded-full border border-slate-500 bg-white outline-none focus:ring-2 focus:ring-cyan-500 transition"
          />
          <button
            onClick={!disabled ? onSend : undefined}
            disabled={disabled}
            className={`p-3 rounded-full transition-all duration-200 ${
              disabled
                ? "bg-slate-300 text-white cursor-not-allowed"
                : "bg-cyan-500 hover:bg-cyan-600 text-white active:scale-[0.98]"
            }`}
          >
            <Send
              className={`transition-transform ${
                disabled ? "opacity-60" : "opacity-100"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
