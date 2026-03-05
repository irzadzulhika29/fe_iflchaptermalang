import { useState } from "react";
import { CheckCircle2, Edit3, ExternalLink, X, Check } from "lucide-react";

export default function SummaryCard({ answers, mapping, onConfirm, onEdit }) {
  const [editMode, setEditMode] = useState(null); // key yang sedang diedit
  const [editValue, setEditValue] = useState("");
  const [localAnswers, setLocalAnswers] = useState(answers);

  const entries = Object.keys(mapping)
    .filter((k) => localAnswers[k] != null && String(localAnswers[k]).trim() !== "")
    .map((k) => ({
      key: k,
      label: mapping[k],
      value: localAnswers[k],
    }));

  const startEdit = (key, value) => {
    setEditMode(key);
    setEditValue(value);
  };

  const saveEdit = (key) => {
    setLocalAnswers({ ...localAnswers, [key]: editValue });
    setEditMode(null);
    setEditValue("");
  };

  const cancelEdit = () => {
    setEditMode(null);
    setEditValue("");
  };

  const handleConfirmWithEdits = () => {
    // Pass edited answers back
    onConfirm(localAnswers);
  };

  return (
    <div className="w-full max-w-2xl rounded-[28px] border border-primary-1/15 bg-white shadow-2xl shadow-primary-1/10">
      <div className="rounded-t-[28px] bg-primary-1 px-6 py-5 text-white">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={22} />
          <div>
            <h3 className="text-lg font-bold leading-tight">Review Data Kamu</h3>
            <p className="text-sm text-white/80">Klik ikon edit untuk mengubah data.</p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-slate-100 px-6">
        {entries.length ? (
          entries.map((entry) => (
            <div key={entry.key} className="py-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-2">
                    {entry.label}
                  </p>

                  {editMode === entry.key ? (
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="flex-1 rounded-lg border border-primary-1/30 px-3 py-2 text-sm focus:border-primary-1 focus:outline-none focus:ring-2 focus:ring-primary-1/20"
                        autoFocus
                      />
                      <button
                        onClick={() => saveEdit(entry.key)}
                        className="rounded-lg bg-primary-1 p-2 text-white hover:bg-primary-2"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="rounded-lg border border-slate-300 p-2 text-slate-600 hover:bg-slate-100"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <p className="mt-1 text-sm text-dark-1 break-words">
                      {entry.value?.startsWith("http") ? (
                        <a
                          href={entry.value}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-full border border-primary-1/20 px-3 py-1 text-primary-2 hover:bg-primary-1/5"
                        >
                          Lihat Link
                          <ExternalLink size={14} />
                        </a>
                      ) : (
                        entry.value
                      )}
                    </p>
                  )}
                </div>

                {editMode !== entry.key && (
                  <button
                    onClick={() => startEdit(entry.key, entry.value)}
                    className="rounded-lg border border-primary-1/20 p-2 text-primary-2 hover:bg-primary-1/5"
                  >
                    <Edit3 size={16} />
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="py-10 text-center text-slate-400">Belum ada data yang diisi</div>
        )}
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50 px-6 py-5 sm:flex-row">
        <button
          onClick={handleConfirmWithEdits}
          className="flex-1 rounded-2xl bg-primary-1 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-1/30 transition hover:bg-primary-2 active:scale-95"
        >
          Kirim Sekarang
        </button>
        <button
          onClick={onEdit}
          className="flex items-center justify-center gap-2 rounded-2xl border border-primary-1/20 px-5 py-3 text-sm font-semibold text-primary-2 transition hover:bg-primary-1/5 active:scale-95"
        >
          Kembali ke Chat
        </button>
      </div>
    </div>
  );
}