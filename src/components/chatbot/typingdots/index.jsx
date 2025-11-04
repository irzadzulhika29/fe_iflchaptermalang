export default function TypingDots() {
  return (
    <div className="mb-1 flex">
      <div className="max-w-[85%] bg-cyan-500 text-white rounded-2xl rounded-bl-sm p-3 text-sm">
        <div className="flex items-center gap-1 h-4">
          <span className="w-2 h-2 rounded-full bg-white/90 animate-bounce [animation-delay:-0.2s]" />
          <span className="w-2 h-2 rounded-full bg-white/90 animate-bounce" />
          <span className="w-2 h-2 rounded-full bg-white/90 animate-bounce [animation-delay:0.2s]" />
        </div>
      </div>
    </div>
  );
}
