export default function ProgressIndicator({ current, total }) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="rounded-2xl fixed w-11/12 left-0 right-0 mx-auto translate-y-20 border border-primary-1/15 bg-white/95 px-5 py-4 shadow-lg shadow-primary-1/10">
      <div className="mb-3 flex items-center justify-between text-xs font-semibold text-primary-2">
        <span>{current} dari {total} pertanyaan</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-primary-1/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary-2 to-primary-1 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}