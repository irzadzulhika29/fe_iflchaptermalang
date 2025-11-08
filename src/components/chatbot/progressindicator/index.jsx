export default function ProgressIndicator({ current, total }) {
  const percentage = Math.round((current / total) * 100);
  
  return (
    <div className="w-11/12 fixed left-0 right-0 mx-auto translate-y-12 rounded-lg p-2 border bg-white">
      <div className="w-full bg-slate-200 rounded-full h-1 overflow-hidden mb-1.5">
        <div
          className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <div className="flex items-center justify-between text-[10px] text-slate-600">
        <span className="flex items-center gap-1">
          <span className="text-cyan-600">●</span>
          <span>{current} dari {total} pertanyaan</span>
        </span>
        <span className="font-semibold text-cyan-600">{percentage}%</span>
      </div>
    </div>
  );
}