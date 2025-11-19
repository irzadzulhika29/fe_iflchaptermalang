import ProgramCard from "../../components/programcards";

/**
 * @param {{ items: Array<any> }} props
 */
const ProgramList = ({ items }) => {
    return (
        <div className="space-y-6 flex flex-col items-center">
            {items.map((program, idx) => (
                <ProgramCard key={program.title || idx} program={program} isActive={true} />
            ))}
        </div>
    );
};

export default ProgramList;
