export const ProjectStats = ({ project }) => {
    return (
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
                        {project.participant || project.participants || '0'}
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
                        {project.committee || '0'}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">Committee</div>
                </div>
            </div>
        </div>
    );
};
