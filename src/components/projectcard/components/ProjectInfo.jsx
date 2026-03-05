export const ProjectInfo = ({ project }) => {
  const getFormattedDate = () => {
    const dateString = project.start_date || project.date;

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

  const getSDGNumbers = () => {
    if (project.sdgs && project.sdgs.length > 0) {
      return project.sdgs.map((sdg) => sdg.code.replace("SDG", "")).join(", ");
    }
    return project.sdgNumber || "-";
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
            {project.title}
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
        {project.description}
      </div>

      <a
        href={project.proposal_link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-full transition-colors duration-200 mb-5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
        Akses Proposal
      </a>
    </div>
  );
};
