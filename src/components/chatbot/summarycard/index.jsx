import { FileImage, CheckCircle2, Edit3 } from "lucide-react";

export default function SummaryCard({ answers, mapping, files = {}, onConfirm, onEdit }) {
    const entries = Object.keys(mapping)
        .filter((k) => answers[k] != null && String(answers[k]).trim() !== "")
        .map((k) => ({
            key: k,
            label: mapping[k],
            value: answers[k],
            hasFile: !!files[k],
            fileData: files[k],
        }));

    return (
        <div className="mb-2 w-full max-w-2xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-t-2xl p-4">
                <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 size={20} />
                    <h3 className="font-bold text-lg">Rangkuman Pendaftaran</h3>
                </div>
                <p className="text-cyan-50 text-sm">
                    Periksa kembali data kamu sebelum mengirim
                </p>
            </div>

            {/* Content */}
            <div className="bg-white border-2 border-cyan-500 rounded-b-2xl">
                {entries.length ? (
                    <ul className="divide-y divide-slate-200">
                        {entries.map((entry, i) => (
                            <li key={i} className="p-4 hover:bg-slate-50 transition-colors">
                                {/* Label */}
                                <div className="text-xs font-semibold text-cyan-600 uppercase tracking-wide mb-1">
                                    {entry.label}
                                </div>

                                {/* Value atau File Preview */}
                                {entry.hasFile ? (
                                    <div className="space-y-2">
                                        {/* File Info */}
                                        <div className="flex items-center gap-2 text-sm text-slate-700">
                                            <FileImage size={16} className="text-cyan-500" />
                                            <span className="font-medium">
                                                {entry.fileData.name}
                                            </span>
                                            <span className="text-xs text-slate-500">
                                                ({(entry.fileData.size / 1024).toFixed(1)} KB)
                                            </span>
                                        </div>

                                        {/* Image Preview */}
                                        <div className="relative inline-block">
                                            <img
                                                src={entry.fileData.preview}
                                                alt={`Preview ${entry.label}`}
                                                className="w-full max-w-xs rounded-lg border-2 border-slate-200 shadow-sm"
                                            />
                                            <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                                                ✓ Ready
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-slate-800 text-sm font-medium break-words">
                                        {entry.value}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="p-8 text-center text-slate-400">
                        <p>Belum ada data yang diisi</p>
                    </div>
                )}

                {/* Footer Question */}
                <div className="bg-slate-50 p-4 border-t-2 border-slate-200">
                    <p className="text-center text-slate-700 font-medium">
                        Apakah semua data sudah benar?
                    </p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4">
                <button
                    onClick={onConfirm}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
                >
                    <CheckCircle2 size={18} />
                    Ya, Kirim Sekarang
                </button>
                <button
                    onClick={onEdit}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
                >
                    <Edit3 size={18} />
                    Edit
                </button>
            </div>
        </div>
    );
}