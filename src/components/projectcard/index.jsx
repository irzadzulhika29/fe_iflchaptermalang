const ProjectCard = ({ project }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 bg-white rounded-3xl overflow-hidden shadow-lg mx-2 sm:mx-6 lg:mx-10">
      {/* Left image / thumbnail */}
      {project.image ? (
        <div className="w-full md:w-2/5 lg:w-1/3">
          <div className="relative w-full h-64 sm:h-80 md:h-full">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      ) : null}

      {/* Right content */}
      <div className="w-full md:w-3/5 lg:w-2/3 p-4 sm:p-5 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
          <div className="flex items-center gap-2 mb-2 sm:mb-0">
            <div className="bg-cyan-500 text-white rounded-full p-1 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
              {/* Folder icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 sm:w-5 sm:h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 7h5l2 2h11v9a2 2 0 0 1-2 2H3z" />
                <path d="M3 7V5a2 2 0 0 1 2-2h3l2 2h5" />
              </svg>
            </div>
            <span className="font-semibold text-lg sm:text-xl text-gray-800">
              {project.title}
            </span>
          </div>

          {project.status ? (
            <span className="text-sm font-medium px-3 py-1 rounded-full bg-cyan-50 text-cyan-600 border border-cyan-200">
              {project.status}
            </span>
          ) : null}
        </div>

        {project.timeline ? (
          <div className="text-cyan-500 font-medium text-sm flex items-center mb-3">
            {/* Calendar icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 sm:w-5 sm:h-5 mr-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {project.timeline}
          </div>
        ) : null}

        {project.description ? (
          <div className="text-gray-800 text-sm sm:text-base mb-4 sm:mb-6">
            {project.description}
          </div>
        ) : null}

        {/* Meta */}
        <div className="flex flex-wrap gap-3">
          {project.owner ? (
            <div className="text-sm text-gray-600">
              <span className="font-semibold">Owner:</span> {project.owner}
            </div>
          ) : null}
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-cyan-600 hover:underline"
            >
              Repository
            </a>
          ) : null}
          {Array.isArray(project.tags) && project.tags.length > 0 ? (
            <div className="flex gap-2 flex-wrap">
              {project.tags.map((t, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
