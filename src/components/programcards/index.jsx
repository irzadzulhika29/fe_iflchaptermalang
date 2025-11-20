import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProgramImage } from "./components/ProgramImage";
import { ProgramInfo } from "./components/ProgramInfo";
import { ProgramStats } from "./components/ProgramStats";
import { ProgramActivities } from "./components/ProgramActivities";
import { ProgramPrice } from "./components/ProgramPrice";
import { ProgramActions } from "./components/ProgramActions";

const ProgramCard = ({ program, isActive }) => {
  const navigate = useNavigate();
  const [referralInfo, setReferralInfo] = useState(null);

  const isClosed = program.status?.toLowerCase() === "closed";

  const handleReferralApplied = (data, code) => {
    setReferralInfo({ data, code });
  };

  const getFormattedDate = () => {
    const dateString = program.start_date || program.date;

    if (!dateString) return "-";

    try {
      const date = new Date(dateString);

      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    } catch (error) {
      return dateString;
    }
  };

  const getSDGIcon = () => {
    if (program.sdgs && program.sdgs.length > 0) {
      const sdgCode = program.sdgs[0].code;
      const sdgNumber = sdgCode.replace("SDG", "");

      if (sdgNumber === "3") {
        return "https://ik.imagekit.io/iflmalang/constant-image/sdgs3?updatedAt=1744982438642";
      } else if (sdgNumber === "4") {
        return "https://ik.imagekit.io/iflmalang/constant-image/sdgs4?updatedAt=1744982438696";
      }
    }
    return "https://ik.imagekit.io/iflmalang/constant-image/sdgs4?updatedAt=1744982438696";
  };

  const getSDGNumbers = () => {
    if (program.sdgs && program.sdgs.length > 0) {
      return program.sdgs.map((sdg) => sdg.code.replace("SDG", "")).join(", ");
    }
    return program.sdgNumber || "-";
  };

  const getActivities = () => {
    if (Array.isArray(program.activities)) {
      return program.activities;
    }
    if (typeof program.event_activity === "string") {
      return program.event_activity.split(",").map((a) => a.trim());
    }
    return [];
  };

  const goChatbot = () => {
    if (isClosed) {
      return;
    }
    navigate(`/chatbot/${program.slug || program.id}`, {
      state: {
        program,
        referralCode: referralInfo?.code || null,
        finalPrice:
          referralInfo?.data?.price_calculation?.final_price || program.price,
      },
    });
  };

  return (
    <div
      className={`relative flex flex-col md:flex-row gap-4 bg-white rounded-3xl overflow-hidden max-w-4xl shadow-lg mx-2 sm:mx-6 lg:mx-10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        isActive ? "block" : "hidden"
      }`}
    >
      <ProgramImage
        program={program}
        isClosed={isClosed}
        onRegister={goChatbot}
      />

      <div className="w-full md:w-3/5 lg:w-2/3 p-4 sm:p-5 md:p-6 flex flex-col justify-between">
        <div>
          <ProgramInfo program={program} />
        </div>

        <div>
          <ProgramStats program={program} />
          <ProgramActivities program={program} />
          <ProgramPrice
            program={program}
            onReferralApplied={handleReferralApplied}
          />
          <ProgramActions isClosed={isClosed} onRegister={goChatbot} />
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;
