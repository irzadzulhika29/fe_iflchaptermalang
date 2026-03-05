import ProjectCard from "../projectcard";

/**
 * @param {{ items: Array<any> }} props
 */
const ProjectList = ({ items }) => {
    return (
        <div className="space-y-6">
            {items.map((project, idx) => (
                <ProjectCard key={project.title || idx} project={project} />
            ))}
        </div>
    );
};

export default ProjectList;
