

export default function SummaryCard({ answers, mapping, onConfirm, onEdit }) {
    const lines = Object.keys(mapping)
        .filter((k) => answers[k] != null && String(answers[k]).trim() !== "")
        .map((k) => `${mapping[k]}: ${answers[k]}`);

    return (
        <div className="mb-2">
            <div className="max-w-[85%] bg-cyan-500 text-white rounded-2xl rounded-bl-sm p-4 text-sm whitespace-pre-wrap">
                <div className="font-semibold mb-2">
                    Terima kasih sudah mengisi semua data, berikut rangkuman jawaban kamu:
                </div>
                {lines.length ? (
                    <ul className="list-none space-y-1">
                        {lines.map((l, i) => (
                            <li key={i}>{l}</li>
                        ))}
                    </ul>
                ) : (
                    <div>(Belum ada data yang diisi)</div>
                )}
                <div className="mt-3">Apakah semua data sudah benar?</div>
            </div>

            <div className="flex gap-3 mt-2">
                <button
                    onClick={onConfirm}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium"
                >
                    Benar
                </button>
                <button
                    onClick={onEdit}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium"
                >
                    Edit
                </button>
            </div>
        </div>
    );
}
