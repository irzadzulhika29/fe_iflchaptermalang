import { Button } from "../../../components/button";

export default function PaymentSummary({
  input,
  dataProfile,
  displayDonationAmount,
  isPending,
  onBack,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Summary */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-gray-800 mb-2">Ringkasan Donasi</h3>
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-600">Jumlah Donasi:</span>
          <span className="text-xl font-bold text-primary-1">
            {displayDonationAmount || "Rp. 0"}
          </span>
        </div>
        <div className="mt-2 text-sm text-gray-600 space-y-1">
          <p>Nama: {input.name || dataProfile?.username}</p>
          <p>Email: {input.email || dataProfile?.email}</p>
          {input.phone && <p>Phone: {input.phone}</p>}
          {input.donation_message && (
            <p className="mt-2 italic">"{input.donation_message}"</p>
          )}
        </div>
      </div>

      {/* Payment Methods Info */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-4 rounded-lg border border-cyan-200">
        <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <span>💳</span>
          Metode Pembayaran
        </h3>
        <p className="text-sm text-gray-600">
          Anda akan diarahkan ke halaman pembayaran Midtrans yang aman.
          Pilih metode pembayaran favorit Anda:
        </p>
        <ul className="mt-2 text-sm text-gray-600 space-y-1 ml-4">
          <li>• Kartu Kredit/Debit</li>
          <li>• Transfer Bank (BCA, Mandiri, BNI, BRI, dll)</li>
          <li>• E-Wallet (GoPay, OVO, DANA, dll)</li>
          <li>• Gerai (Indomaret, Alfamart)</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8">
        <Button
          type="button"
          onClick={onBack}
          className="w-1/3 py-3 bg-gray-300 text-gray-700 border-2 border-transparent hover:bg-gray-400"
        >
          Back
        </Button>
        <Button
          variant="primary"
          type="submit"
          className="w-2/3 py-3 bg-primary-1 text-white border-2 border-transparent hover:bg-white hover:border-primary-1 hover:text-primary-1"
          disabled={isPending}
        >
          {isPending ? "Processing..." : "Lanjut ke Pembayaran"}
        </Button>
      </div>
    </form>
  );
}