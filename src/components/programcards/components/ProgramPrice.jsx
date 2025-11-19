import { useState, useEffect } from "react";
import { useValidateReferralCode } from "../../../features/volunteer";

export const ProgramPrice = ({ program, onReferralApplied }) => {
    const [referralCode, setReferralCode] = useState("");
    const [referralData, setReferralData] = useState(null);
    const [referralError, setReferralError] = useState("");

    const validateReferral = useValidateReferralCode();

    // Load saved referral data on mount
    useEffect(() => {
        const savedData = localStorage.getItem(`referral_${program.id}`);
        if (savedData) {
            try {
                const { code, data } = JSON.parse(savedData);
                setReferralCode(code);
                setReferralData(data);
                onReferralApplied && onReferralApplied(data, code);
            } catch (error) {
                console.error('Failed to load referral data:', error);
            }
        }
    }, [program.id]);

    const handleValidateReferral = async () => {
        if (!referralCode.trim()) return;

        setReferralError("");
        try {
            const result = await validateReferral.mutateAsync({
                eventId: program.id,
                code: referralCode.trim()
            });

            if (result.valid) {
                setReferralData(result.data);
                // Save to localStorage
                localStorage.setItem(`referral_${program.id}`, JSON.stringify({
                    code: referralCode.trim(),
                    data: result.data
                }));
                onReferralApplied && onReferralApplied(result.data, referralCode.trim());
            } else {
                setReferralError(result.message || "Kode referral tidak valid");
            }
        } catch (error) {
            setReferralError(error.response?.data?.message || "Gagal memvalidasi kode referral");
        }
    };

    return (
        <div className="mt-6 p-3 bg-gradient-to-r from-cyan-50 to-white rounded-xl border border-cyan-100">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-white rounded-lg shadow-sm text-cyan-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <span className="font-medium text-sm sm:text-base text-gray-700">Biaya Pendaftaran</span>
                </div>
                <div className="text-right">
                    {referralData && (
                        <div className="text-xs text-gray-500 line-through">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(referralData.price_calculation.original_price)}
                        </div>
                    )}
                    <div className="font-bold text-lg sm:text-xl text-cyan-600">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(referralData?.price_calculation?.final_price || program.price || 0)}
                    </div>
                    {referralData && (
                        <div className="text-xs text-green-600 font-semibold">
                            Hemat {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(referralData.price_calculation.you_save)}
                        </div>
                    )}
                </div>
            </div>

            {/* Referral Code Input */}
            <div className="mt-3 pt-3 border-t border-cyan-100">
                <label className="block text-sm font-medium text-gray-700 mb-2">Punya Kode Referral?</label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={referralCode}
                        onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                        placeholder="Masukkan kode"
                        disabled={referralData !== null}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:bg-gray-100"
                    />
                    <button
                        onClick={handleValidateReferral}
                        disabled={!referralCode.trim() || validateReferral.isPending || referralData !== null}
                        className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                        {validateReferral.isPending ? 'Cek...' : referralData ? '✓' : 'Cek'}
                    </button>
                </div>
                {referralError && (
                    <p className="mt-2 text-sm text-red-600">{referralError}</p>
                )}
                {referralData && (
                    <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-700">✓ {referralData.description}</p>
                    </div>
                )}
            </div>
        </div>
    );
};
