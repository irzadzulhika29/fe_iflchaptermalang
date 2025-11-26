export const ProjectMeta = ({ project }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {project.owner && (
        <div className="text-sm text-gray-600">
          <span className="font-semibold">Owner:</span> {project.owner}
        </div>
      )}
      
      {project.repoUrl && (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-cyan-600 hover:text-cyan-700 hover:underline transition-colors duration-200"
        >
          Repository →
        </a>
      )}
      
      {Array.isArray(project.tags) && project.tags.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs px-3 py-1 rounded-full bg-cyan-50 text-cyan-600 border border-cyan-200 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
