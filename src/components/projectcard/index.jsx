import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectImage } from "./components/ProjectImage";
import { ProjectInfo } from "./components/ProjectInfo";
import { ProjectStats } from "./components/ProjectStats";
import { ProjectActivities } from "./components/ProjectActivities";
import { ProjectPrice } from "./components/ProjectPrice";
import { ProjectActions } from "./components/ProjectActions";

const ProjectCard = ({ project }) => {
    const navigate = useNavigate();
    const [referralInfo, setReferralInfo] = useState(null);

    // Check if user is authenticated
    const token = localStorage.getItem("token");
    const isAuthenticated = !!token;

    const isClosed = project.status?.toLowerCase() === "closed";

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

        navigate(`/chatbot/${project.slug || project.id}`, {
            state: {
                program: project,
                referralCode: referralInfo?.code || null,
                finalPrice:
                    referralInfo?.data?.price_calculation?.final_price || project.price,
            },
        });
    };

    return (
        <div
            className="relative flex flex-col md:flex-row gap-4 bg-white rounded-3xl overflow-hidden max-w-4xl shadow-lg mx-2 sm:mx-6 lg:mx-10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
            <ProjectImage
                project={project}
                isClosed={isClosed}
                isAuthenticated={isAuthenticated}
                onRegister={goChatbot}
            />

            <div className="w-full md:w-3/5 lg:w-2/3 p-4 sm:p-5 md:p-6 flex flex-col justify-between">
                <div>
                    <ProjectInfo project={project} />
                </div>

                <div>
                    <ProjectStats project={project} />
                    <ProjectActivities project={project} />
                    <ProjectPrice
                        project={project}
                        isAuthenticated={isAuthenticated}
                        onReferralApplied={handleReferralApplied}
                    />
                    <ProjectActions
                        isClosed={isClosed}
                        isAuthenticated={isAuthenticated}
                        onRegister={goChatbot}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
