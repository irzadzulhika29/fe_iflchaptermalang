import { formatCurrency } from "../../utils/formatCurrency";

const ProgressBar3 = ({ className, current_donation, target_donation }) => {
  const progress = current_donation ? Math.round((current_donation / target_donation) * 100) : 0;

  return (
    <div className={`w-full ${className ?? ""}`}>
  
      <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-1 transition-all duration-300 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      
  
      <div className="text-left mt-2">
        <span className="text-sm text-gray-500 block">Terkumpul</span>
        <span className="text-lg text-black font-bold block">
          Rp {formatCurrency(current_donation)}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar3;
//1