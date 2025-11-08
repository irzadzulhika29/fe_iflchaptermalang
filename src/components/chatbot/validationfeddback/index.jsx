import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default function ValidationFeedback({ status, message, preview }) {
    if (!message && !preview) return null;

    const getStatusConfig = () => {
        switch (status) {
            case "valid":
                return {
                    icon: CheckCircle,
                    color: "text-green-600",
                    bg: "bg-green-50",
                    border: "border-green-200",
                };
            case "invalid":
                return {
                    icon: XCircle,
                    color: "text-red-600",
                    bg: "bg-red-50",
                    border: "border-red-200",
                };
            case "warning":
                return {
                    icon: AlertCircle,
                    color: "text-orange-600",
                    bg: "bg-orange-50",
                    border: "border-orange-200",
                };
            default:
                return {
                    icon: AlertCircle,
                    color: "text-slate-600",
                    bg: "bg-slate-50",
                    border: "border-slate-200",
                };
        }
    };

    const config = getStatusConfig();
    const Icon = config.icon;

    return (
        <div
            className={`mb-2 p-2.5 rounded-lg border ${config.bg} ${config.border} animate-fadeIn`}
        >
            <div className="flex items-start gap-2">
                <Icon size={16} className={`${config.color} mt-0.5 flex-shrink-0`} />
                <div className="flex-1 text-xs">
                    {message && (
                        <p className={`${config.color} font-medium mb-1`}>{message}</p>
                    )}
                    {preview && (
                        <p className="text-slate-600">
                            <span className="font-medium">Preview:</span>{" "}
                            <code className="bg-white px-1.5 py-0.5 rounded text-[10px] border border-slate-200">
                                {preview}
                            </code>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}