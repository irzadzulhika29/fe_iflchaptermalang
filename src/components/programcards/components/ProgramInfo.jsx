export const ProgramInfo = ({ program }) => {
    const getFormattedDate = () => {
        const dateString = program.start_date || program.date;

        if (!dateString) return '-';

        try {
            const date = new Date(dateString);

            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();

            return `${day}/${month}/${year}`;
        } catch (error) {
            return dateString;
        }
    };

    const getSDGNumbers = () => {
        if (program.sdgs && program.sdgs.length > 0) {
            return program.sdgs.map(sdg => sdg.code.replace('SDG', '')).join(', ');
        }
        return program.sdgNumber || '-';
    };

    return (
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
                    <span className="text-cyan-500">{getFormattedDate()}</span>
                </div>
            </div>

            <div className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">
                Supports SDGs No. {getSDGNumbers()}
            </div>

            <div className="mb-5 text-gray-800 text-sm sm:text-base line-clamp-7 h-[168px] overflow-hidden">
                {program.description}
            </div>
        </div>
    );
};
