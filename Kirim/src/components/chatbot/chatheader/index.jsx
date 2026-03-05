import { useState } from "react";
import { ArrowLeft, CalendarDays, Sparkles, ChevronDown } from "lucide-react";

const getDefaultProgressState = () => {
  if (typeof window === "undefined") return true;
  return window.innerWidth >= 768;
};

export default function ChatHeader({
  program,
  onBack,
  currentStep = 0,
  totalSteps = 0,
}) {
  const [showProgress, setShowProgress] = useState(getDefaultProgressState);
  const toggleProgress = () => setShowProgress((prev) => !prev);

  const getSDGNumbers = () => {
    if (Array.isArray(program.sdgs) && program.sdgs.length) {
      return program.sdgs.map((sdg) => sdg.code.replace("SDG", "")).join(", ");
    }
    return program.sdgNumber || "-";
  };



  const getImage = () => program.event_photo || program.image || "https://via.placeholder.com/400x300";

  const getDate = () => {
    const dateString = program.start_date || program.date;
    if (!dateString) return "—";
    const date = new Date(dateString);
    return Number.isNaN(date.getTime())
      ? dateString
      : `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
  };

  const percentage = totalSteps ? Math.round((currentStep / totalSteps) * 100) : 0;

  return (
    <div className="rounded-3xl border border-primary-1/15 bg-white/95 px-3 py-3 shadow-md shadow-primary-1/15 backdrop-blur sm:px-4 sm:py-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onBack}
            className="rounded-2xl border border-primary-1/20 p-2 text-primary-1 transition hover:bg-primary-1/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <img
            src={getImage()}
            alt={program.title}
            className="h-10 w-10 rounded-2xl object-cover ring-2 ring-primary-1/20 sm:h-12 sm:w-12"
          />

          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.35em] text-primary-2 sm:text-[11px]">
              Volunteer Program
            </p>
            <p className="text-sm font-bold text-dark-1 leading-tight sm:text-base">
              {program.title}
            </p>
            <p className="text-[10px] text-slate-500 sm:text-xs">
              SDGs #{getSDGNumbers()}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs">
          <span className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-dark-1">
            <CalendarDays size={12} /> {getDate()}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={toggleProgress}
        className="mt-3 flex w-full items-center justify-between rounded-2xl border border-primary-1/15 bg-primary-1/5 px-3 py-2 text-[11px] font-semibold text-primary-2 transition hover:bg-primary-1/10 sm:text-xs"
      >
        <span>{currentStep} dari {totalSteps} pertanyaan</span>
        <ChevronDown
          size={16}
          className={`transition-transform ${showProgress ? "rotate-180" : ""}`}
        />
      </button>

      {showProgress && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-[10px] font-semibold text-primary-2 sm:text-xs">
            <span>Progress</span>
            <span>{percentage}%</span>
          </div>
          <div className="mt-1 h-2 w-full rounded-full bg-primary-1/10">
            <div
              className="h-full rounded-full bg-primary-1 transition-all duration-500 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}