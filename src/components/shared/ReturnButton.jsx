import { useNavigate } from "react-router-dom";
import { CaretLeft } from "@phosphor-icons/react";

export default function ReturnButton() {
  const navigate = useNavigate();
  
  const goBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/campaign");
    }
  };

  return (
    <button
      className="flex items-center gap-2 text-primary-1 text-base font-medium mb-10 md:text-lg"
      onClick={goBack}
    >
      <div className="w-7 h-7 flex items-center justify-center bg-primary-1 text-white rounded-full">
        <CaretLeft size={18} weight="bold" className="text-white" />
      </div>
      <span className="font-semibold">Return</span>
    </button>
  );
}