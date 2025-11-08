export default function DonationStepper({ currentStep }) {
    return (
      <div className="flex items-center justify-center gap-4 py-4">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
            currentStep === 1 ? 'bg-primary-1 text-white' : 'bg-green-500 text-white'
          }`}>
            {currentStep === 1 ? '1' : '✓'}
          </div>
          <span className="text-sm font-medium text-gray-700">Data Diri</span>
        </div>
        
        <div className="w-12 h-1 bg-gray-300"></div>
        
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
            currentStep === 2 ? 'bg-primary-1 text-white' :
            currentStep === 3 ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
          }`}>
            {currentStep === 3 ? '✓' : '2'}
          </div>
          <span className="text-sm font-medium text-gray-700">Pembayaran</span>
        </div>
      </div>
    );
  }