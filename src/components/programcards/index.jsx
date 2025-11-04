import { useNavigate } from "react-router-dom";

const ProgramCard = ({ program, isActive }) => {
    const navigate = useNavigate();
    const goChatbot = () => {
        navigate(`/chatbot/${program.slug || program.id}`, { state: { program } });
    };

    return (
        <div
            className={`relative flex flex-col md:flex-row gap-4 bg-white rounded-3xl overflow-hidden shadow-lg mx-2 sm:mx-6 lg:mx-10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isActive ? "block" : "hidden"
                }`}
        >
            <div className="w-full md:w-2/5 lg:w-1/3 relative group">
                <div className="relative w-full h-64 sm:h-80 md:h-full overflow-hidden rounded-l-3xl">
                    <img
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Overlay gelap saat hover */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Tombol Daftar muncul di tengah */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                            onClick={goChatbot}
                            className="bg-cyan-500 text-white px-5 py-2 rounded-full font-semibold text-sm sm:text-base hover:bg-cyan-600 transition-colors duration-200"
                        >
                            Daftar Sekarang
                        </button>
                    </div>

                    {/* SDG icon tetap di pojok kiri atas */}
                    <div className="absolute top-0 left-0 p-4 z-10">
                        {program.sdgNumber === "3" ? (
                            <img
                                src="https://ik.imagekit.io/iflmalang/constant-image/sdgs3?updatedAt=1744982438642"
                                alt="SDG 3"
                                className="w-12 h-12 sm:w-16 sm:h-16"
                            />
                        ) : (
                            <img
                                src="https://ik.imagekit.io/iflmalang/constant-image/sdgs4?updatedAt=1744982438696"
                                alt="SDG 4"
                                className="w-12 h-12 sm:w-16 sm:h-16"
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Right Side - Program Info */}
            <div className="w-full md:w-3/5 lg:w-2/3 p-4 sm:p-5 md:p-6 flex flex-col justify-between">
                <div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <div className="flex items-center gap-2 mb-2 sm:mb-0">
                            <div className="bg-cyan-500 text-white rounded-full p-1 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-4 h-4 sm:w-5 sm:h-5"
                                >
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <span className="font-semibold text-lg sm:text-xl text-gray-800">
                                {program.title}
                            </span>
                        </div>
                        <div className="text-cyan-500 font-medium text-sm flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-4 h-4 sm:w-5 sm:h-5 mr-1"
                            >
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            <span className="text-cyan-500">{program.date}</span>
                        </div>
                    </div>

                    <div className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">
                        Supports SDGs No. {program.sdgNumber}
                    </div>

                    <div className="text-gray-800 text-sm sm:text-base mb-4 sm:mb-6">
                        {program.description}
                    </div>
                </div>

                {/* Stats + Activities */}
                <div>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mb-4 sm:mb-6">
                        <div className="flex-1 border border-cyan-200 rounded-lg p-2 sm:p-3 flex items-center gap-2 sm:gap-3">
                            <div className="bg-cyan-100 rounded-full p-1 sm:p-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-500"
                                >
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                            </div>
                            <div>
                                <div className="font-semibold text-lg sm:text-xl">
                                    {program.participants}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-500">
                                    Participant
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 border border-cyan-200 rounded-lg p-2 sm:p-3 flex items-center gap-2 sm:gap-3">
                            <div className="bg-cyan-100 rounded-full p-1 sm:p-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-500"
                                >
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                            </div>
                            <div>
                                <div className="font-semibold text-lg sm:text-xl">
                                    {program.committee}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-500">Committee</div>
                            </div>
                        </div>
                    </div>

                    {/* Activities */}
                    <div>
                        <div className="font-medium text-sm sm:text-base mb-2">
                            Kegiatan Program:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm sm:text-base">
                            {program.activities.map((activity, index) => (
                                <div key={index} className="flex items-start gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="mt-1 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 text-cyan-500"
                                    >
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                    </svg>
                                    <span>{activity}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-full mt-4">
                        <button
                            onClick={goChatbot}
                            className="py-2 px-6 w-full bg-cyan-500 hover:bg-cyan-600 rounded-2xl font-semibold text-lg text-white">
                            Daftar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgramCard;
