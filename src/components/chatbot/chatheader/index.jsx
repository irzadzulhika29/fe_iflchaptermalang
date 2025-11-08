import { ArrowLeft } from "lucide-react";

export default function ChatHeader({ program, onBack }) {
  return (
    <div className="bg-white fixed left-0 right-0 mx-auto w-11/12 rounded-2xl shadow-sm border border-slate-100 p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>

        <img
          src={program.image}
          alt={program.title}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="font-semibold leading-tight">{program.title}</span>
          <span className="text-xs text-slate-500">
            Supports SDGs No. {program.sdgNumber}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100">
          <span className="i-lucide-badge-check w-3 h-3" />
          Live
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100">
          <span className="i-lucide-clock w-3 h-3" />
          {program.date || "—"}
        </span>
      </div>
    </div>
  );
}
