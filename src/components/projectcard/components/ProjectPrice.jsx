import { useState, useEffect, useRef } from "react";
import { useValidateReferralCode, useGetReferralCodes } from "../../../features/volunteer";

export const ProjectPrice = ({ project, onReferralApplied, isAuthenticated }) => {
    const [referralCode, setReferralCode] = useState("");
    const [referralError, setReferralError] = useState("");
    const hasAppliedRef = useRef(false);

    const validateReferral = useValidateReferralCode();

    // Fetch referral codes from API (only if authenticated)
    const { data: referralCodesData, isLoading: isLoadingReferral } = useGetReferralCodes(
        project.id,
        { enabled: isAuthenticated }
    );

    // Extract used code info from API response
    const usedCodeInfo = referralCodesData?.data?.user_has_used_code
        ? referralCodesData.data.used_code_info
        : null;

    // Set referral code from API data (only once)
    useEffect(() => {
        if (usedCodeInfo && !hasAppliedRef.current) {
            setReferralCode(usedCodeInfo.code);
            // Notify parent component with the used referral data
            if (onReferralApplied) {
                const referralData = {
                    description: usedCodeInfo.description || `Kode ${usedCodeInfo.code} berhasil digunakan`,
                    price_calculation: {
                        original_price: parseFloat(referralCodesData.data.event.price),
                        discount_amount: parseFloat(usedCodeInfo.discount_amount),
                        final_price: parseFloat(referralCodesData.data.event.price) - parseFloat(usedCodeInfo.discount_amount),
                        you_save: parseFloat(usedCodeInfo.discount_amount)
                    }
                };
                onReferralApplied(referralData, usedCodeInfo.code);
                hasAppliedRef.current = true;
            }
        }
    }, [usedCodeInfo, referralCodesData]);

    const handleValidateReferral = async () => {
        if (!referralCode.trim()) return;

        setReferralError("");
        try {
            const result = await validateReferral.mutateAsync({
                eventId: project.id,
                code: referralCode.trim()
            });

            if (result.valid) {
                // Notify parent component
                onReferralApplied && onReferralApplied(result.data, referralCode.trim());
                // Refresh referral codes data
                window.location.reload(); // Simple refresh to get updated data
            } else {
                setReferralError(result.message || "Kode referral tidak valid");
            }
        } catch (error) {
            setReferralError(error.response?.data?.message || "Gagal memvalidasi kode referral");
        }
    };

    // Calculate display price
    const displayPrice = usedCodeInfo
        ? parseFloat(referralCodesData.data.event.price) - parseFloat(usedCodeInfo.discount_amount)
        : project.price || 0;

    const originalPrice = usedCodeInfo
        ? parseFloat(referralCodesData.data.event.price)
        : null;

    const savings = usedCodeInfo
        ? parseFloat(usedCodeInfo.discount_amount)
        : null;

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
                    {originalPrice && (
                        <div className="text-xs text-gray-500 line-through">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(originalPrice)}
                        </div>
                    )}
                    <div className="font-bold text-lg sm:text-xl text-cyan-600">
                        {isLoadingReferral ? (
                            <span className="text-sm">Loading...</span>
                        ) : (
                            new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(displayPrice)
                        )}
                    </div>
                    {savings && (
                        <div className="text-xs text-green-600 font-semibold">
                            Hemat {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(savings)}
                        </div>
                    )}
                </div>
            </div>

            {/* Referral Code Input - Only show if authenticated */}
            {isAuthenticated && (
                <div className="mt-3 pt-3 border-t border-cyan-100">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Punya Kode Referral?</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={referralCode}
                            onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                            placeholder="Masukkan kode"
                            disabled={usedCodeInfo !== null || isLoadingReferral}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:bg-gray-100"
                        />
                        <button
                            onClick={handleValidateReferral}
                            disabled={!referralCode.trim() || validateReferral.isPending || usedCodeInfo !== null || isLoadingReferral}
                            className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                        >
                            {validateReferral.isPending ? 'Cek...' : usedCodeInfo ? '✓' : 'Cek'}
                        </button>
                    </div>
                    {referralError && (
                        <p className="mt-2 text-sm text-red-600">{referralError}</p>
                    )}
                    {usedCodeInfo && (
                        <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-sm text-green-700">
                                ✓ Kode <span className="font-bold">{usedCodeInfo.code}</span> berhasil digunakan
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
