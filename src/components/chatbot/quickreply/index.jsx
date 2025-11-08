export default function QuickReplyButtons({ options, onSelect }) {
    return (
      <div className="mb-2 flex flex-wrap gap-2">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelect(option)}
            className="px-4 py-2 bg-white border-2 border-cyan-500 text-cyan-600 rounded-full font-medium text-sm hover:bg-cyan-500 hover:text-white transition-all duration-200 active:scale-95 shadow-sm"
          >
            {option}
          </button>
        ))}
      </div>
    );
  }