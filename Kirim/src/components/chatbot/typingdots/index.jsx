export default function TypingDots() {
  return (
    <div className="mb-2 flex">
      <div className="max-w-[85%] rounded-3xl rounded-bl-md bg-primary-1 p-3 text-sm text-white shadow-lg shadow-primary-1/25">        <div className="flex h-4 items-center gap-1">
        <span className="h-2 w-2 animate-bounce rounded-full bg-white/90 [animation-delay:-0.2s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-white/90" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-white/90 [animation-delay:0.2s]" />
      </div>
      </div>
    </div>
  );
}