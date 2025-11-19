import { useState } from 'react';
import volunteerQRIS from '../../../assets/image/volunteer/qr_volunteer.webp';

/**
 * PaymentInfo Component
 * 
 * Displays payment information including:
 * 1. Registration Fee
 * 2. QRIS Image
 * 3. Bank Transfer Details (Mandiri & GoPay)
 * 
 * @param {Object} props
 * @param {Object} props.program - Program details
 * @param {number} props.finalPrice - Final registration fee
 * @param {number} props.originalPrice - Original registration fee (before discount)
 */
export default function PaymentInfo({ program, finalPrice, originalPrice }) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    // Use provided prices or defaults
    const priceToDisplay = finalPrice !== undefined ? finalPrice : 75000;
    const basePrice = originalPrice !== undefined ? originalPrice : 75000;
    const hasDiscount = priceToDisplay < basePrice;

    const formatPrice = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        // Could add a toast here if needed
    };

    return (
        <div className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-md border border-gray-100 max-w-sm w-full">
            {/* Header & Price */}
            <div className="text-center border-b border-gray-100 pb-4">
                <h3 className="text-gray-600 text-sm font-medium">Total Pembayaran</h3>
                <div className="flex flex-col items-center justify-center mt-1">
                    {hasDiscount && (
                        <span className="text-sm text-gray-400 line-through decoration-red-500">
                            {formatPrice(basePrice)}
                        </span>
                    )}
                    <p className="text-2xl font-bold text-primary-2">
                        {formatPrice(priceToDisplay)}
                    </p>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                    {program?.title || 'Volunteer Registration'}
                </p>
            </div>

            {/* QRIS Section */}
            <div className="flex flex-col items-center">
                <div className="relative w-48 h-48 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 mb-2">
                    {!imageLoaded && !imageError && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-6 h-6 border-2 border-primary-2 border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}

                    <img
                        src={volunteerQRIS}
                        alt="QRIS Payment"
                        className={`w-full h-full object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                        onLoad={() => setImageLoaded(true)}
                        onError={() => setImageError(true)}
                    />
                </div>
                <p className="text-xs text-gray-500 font-medium">Scan QRIS Volunteer IFL Malang</p>
            </div>

            {/* Bank Transfer Details */}
            <div className="space-y-3 pt-2">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-bold text-gray-700">MANDIRI</span>
                        <button
                            onClick={() => copyToClipboard("1440027846200")}
                            className="text-[10px] text-primary-2 font-medium hover:underline"
                        >
                            Salin
                        </button>
                    </div>
                    <p className="text-sm font-mono text-gray-800">1440027846200</p>
                    <p className="text-[10px] text-gray-500">a.n. Az Zahra Aura Rizky</p>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-bold text-gray-700">GOPAY</span>
                        <button
                            onClick={() => copyToClipboard("083813145964")}
                            className="text-[10px] text-primary-2 font-medium hover:underline"
                        >
                            Salin
                        </button>
                    </div>
                    <p className="text-sm font-mono text-gray-800">083813145964</p>
                    <p className="text-[10px] text-gray-500">a.n. Az Zahra Aura Rizky</p>
                </div>
            </div>
        </div>
    );
}
