// Helper function to detect and render URLs as clickable links
const renderTextWithLinks = (text) => {
  // Regex to detect URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-300 underline hover:text-blue-200"
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

export default function MessageBubble({ from, text }) {
  if (from === "bot") {
    return (
      <div className="mb-2 flex">
        <div className="max-w-[85%] rounded-3xl rounded-bl-md bg-primary-1 p-4 text-sm text-white shadow-lg shadow-primary-1/25 whitespace-pre-wrap">
          {renderTextWithLinks(text)}
        </div>
      </div>
    );
  }
  return (
    <div className="mb-2 flex justify-end">
      <div className="max-w-[85%] rounded-3xl rounded-br-md border border-primary-1/15 bg-white p-4 text-sm text-dark-1 shadow-lg shadow-slate-200 whitespace-pre-wrap">
        {text}
      </div>
    </div>
  );
}