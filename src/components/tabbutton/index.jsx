const TabButton = ({ id, active, onClick, ariaControls, icon, label }) => {
  return (
    <button
      id={id}
      role="tab"
      aria-selected={active}
      aria-controls={ariaControls}
      className={`py-2 sm:py-3 px-3 sm:px-4 md:px-6 rounded-full flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base transition-colors ${
        active ? "bg-cyan-500 text-white" : "bg-gray-200 text-gray-600"
      }`}
      onClick={onClick}
      type="button"
    >
      <b className="flex items-center justify-center">{icon}{label}</b>
    </button>
  );
};

export default TabButton;
