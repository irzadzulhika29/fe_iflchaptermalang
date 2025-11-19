export default function QuickReplyButtons({ options, onSelect }) {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onSelect(option)}
          className="rounded-full border border-primary-1/30 bg-white px-5 py-2 text-sm font-semibold text-primary-1 shadow-sm transition hover:-translate-y-0.5 hover:bg-primary-1 hover:text-white hover:shadow-lg"        >
          {option}
        </button>
      ))}
    </div>
  );
}