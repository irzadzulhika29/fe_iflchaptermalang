import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default function ValidationFeedback({ status, message, preview }) {
  if (!message && !preview) return null;

  const config = {
    valid: {
      icon: CheckCircle,
      color: "text-primary-1",
      bg: "bg-primary-1/5",
      border: "border-primary-1/20",
    },
    invalid: {
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
    },
    warning: {
      icon: AlertCircle,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
    },
  }[status || "warning"];

  const Icon = config.icon;

  return (
    <div className={`mb-3 rounded-2xl border ${config.border} ${config.bg} p-3 text-xs shadow-sm`}>
      <div className="flex items-start gap-2">
        <Icon size={16} className={`${config.color} mt-0.5 flex-shrink-0`} />
        <div className="flex-1">
          {message && <p className={`${config.color} font-semibold mb-1`}>{message}</p>}
          {preview && (
            <p className="text-slate-600">
              <span className="font-medium">Preview:</span>{" "}
              <code className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[11px]">
                {preview}
              </code>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}