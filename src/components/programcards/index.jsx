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

    // Check if user is authenticated
    const token = localStorage.getItem("token");
    const isAuthenticated = !!token;

    const isClosed = program.status?.toLowerCase() === "closed";

    const handleReferralApplied = (data, code) => {
        setReferralInfo({ data, code });
    };

    const goChatbot = () => {
        if (isClosed) {
            return;
        }

        // Redirect to login if not authenticated
        if (!isAuthenticated) {
            navigate("/masuk");
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
            className={`relative flex flex-col md:flex-row gap-4 bg-white rounded-3xl overflow-hidden max-w-4xl shadow-lg mx-2 sm:mx-6 lg:mx-10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isActive ? "block" : "hidden"
                }`}
        >
            <ProgramImage
                program={program}
                isClosed={isClosed}
                isAuthenticated={isAuthenticated}
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
                        isAuthenticated={isAuthenticated}
                        onReferralApplied={handleReferralApplied}
                    />
                    <ProgramActions
                        isClosed={isClosed}
                        isAuthenticated={isAuthenticated}
                        onRegister={goChatbot}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProgramCard;
