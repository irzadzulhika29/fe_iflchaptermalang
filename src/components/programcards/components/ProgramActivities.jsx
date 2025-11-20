export const ProgramActivities = ({ program }) => {
    const getActivities = () => {
        if (Array.isArray(program.activities)) {
            return program.activities;
        }
        if (typeof program.event_activity === 'string') {
            return program.event_activity.split(',').map(a => a.trim());
        }
        return [];
    };

    return (
        <div>
            <div className="font-medium text-sm sm:text-base mb-2">
                Kegiatan Program:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm sm:text-base">
                {getActivities().map((activity, index) => (
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
    );
};
