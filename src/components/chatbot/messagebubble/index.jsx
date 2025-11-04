export default function MessageBubble({ from, text }) {
  if (from === "bot") {
    return (
      <div className="mb-1 flex">
        <div className="max-w-[85%] bg-cyan-500 text-white rounded-2xl rounded-bl-sm p-3 text-sm whitespace-pre-wrap">
          {text}
        </div>
      </div>
    );
  }
  return (
    <div className="mb-1 flex justify-end ">
      <div className="max-w-[85%] bg-white border border-slate-200 text-slate-800 rounded-2xl rounded-br-sm p-3 text-sm">
        {text}
      </div>
    </div>
  );
}
