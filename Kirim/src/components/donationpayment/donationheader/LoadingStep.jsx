export default function LoadingStep() {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-1"></div>
        <p className="text-gray-600 font-medium">Memproses transaksi...</p>
        <p className="text-sm text-gray-500">Mohon tunggu sebentar</p>
      </div>
    );
  }