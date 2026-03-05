import { Upload, X, CheckCircle, Image as ImageIcon } from "lucide-react";
import { useState,useEffect } from "react";

export default function FileUpload({ onFileSelected, currentFile }) {
    const [preview, setPreview] = useState(currentFile?.preview || null);
    const [error, setError] = useState("");

    useEffect(() => {
        setPreview(currentFile?.preview || null);
        setError("");
    }, [currentFile]);


    const handleFileSelect = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
        if (!validTypes.includes(file.type)) {
            setError("Format file tidak didukung. Gunakan JPG, PNG, atau WebP.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError("File terlalu besar. Maksimal 5MB.");
            return;
        }

        setError("");

        const reader = new FileReader();
        reader.onload = (e) => {
            const previewUrl = e.target.result;
            setPreview(previewUrl);

            onFileSelected({
                file: file,
                preview: previewUrl,
                name: file.name,
                size: file.size,
            });
        };
        reader.readAsDataURL(file);
    };

    const clearFile = () => {
        setPreview(null);
        setError("");
        onFileSelected(null);
    };

    return (
        <div className="mb-2 relative z-0">
            {!preview ? (
                <label className="block">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                    />
                    <div className="flex items-center gap-3 p-4 border-2 border-dashed border-cyan-300 rounded-xl hover:border-cyan-500 hover:bg-cyan-50/50 transition-all cursor-pointer">
                        <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                            <Upload size={20} className="text-cyan-600" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-slate-700">Upload Gambar</p>
                            <p className="text-xs text-slate-500">JPG, PNG, WebP (Max 5MB)</p>
                        </div>
                    </div>
                </label>
            ) : (
                <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-xl">
                        <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                        <div className="flex-1">
                            <p className="text-sm font-medium text-green-700">File siap diupload!</p>
                            <p className="text-xs text-green-600 mt-0.5">Lanjutkan untuk konfirmasi</p>
                        </div>
                        <button
                            onClick={clearFile}
                            className="p-1 hover:bg-green-100 rounded-full transition-colors"
                        >
                            <X size={16} className="text-green-600" />
                        </button>
                    </div>

                    <div className="relative w-full max-w-xs mx-auto z-10">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full rounded-lg border-2 border-green-200 shadow-sm"
                        />
                        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                            <ImageIcon size={12} />
                            Preview
                        </div>
                    </div>
                </div>
            )}

            {error && (
                <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                    <X size={12} />
                    {error}
                </p>
            )}
        </div>
    );
}