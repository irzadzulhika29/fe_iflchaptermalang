export const ProgramImage = ({ program, isClosed, isAuthenticated, onRegister }) => {
  const getSDGIcon = () => {
    if (program.sdgs && program.sdgs.length > 0) {
      const sdgCode = program.sdgs[0].code;
      const sdgNumber = sdgCode.replace("SDG", "");

      if (sdgNumber === "3") {
        return "https://ik.imagekit.io/iflmalang/constant-image/sdgs3?updatedAt=1744982438642";
      } else if (sdgNumber === "4") {
        return "https://ik.imagekit.io/iflmalang/constant-image/sdgs4?updatedAt=1744982438696";
      }
    }
    return "https://ik.imagekit.io/iflmalang/constant-image/sdgs4?updatedAt=1744982438696";
  };

  const getSDGNumbers = () => {
    if (program.sdgs && program.sdgs.length > 0) {
      return program.sdgs.map((sdg) => sdg.code.replace("SDG", "")).join(", ");
    }
    return program.sdgNumber || "-";
  };

  return (
    <div className="w-full md:w-2/5 lg:w-1/3 relative group">
      <div className="relative w-full h-64 sm:h-80 md:h-full overflow-hidden rounded-l-3xl">
        <img
          src={
            program.event_photo ||
            program.image ||
            "https://via.placeholder.com/400x300"
          }
          alt={program.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {!isClosed && (
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        )}

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {isClosed ? (
            <div className="bg-gray-400 text-white px-5 py-2 rounded-full font-semibold text-sm sm:text-base cursor-not-allowed">
              Pendaftaran Ditutup
            </div>
          ) : (
            <button
              onClick={onRegister}
              className={`text-white px-5 py-2 rounded-full font-semibold text-sm sm:text-base transition-colors duration-200 ${!isAuthenticated
                  ? "bg-amber-500 hover:bg-amber-600"
                  : "bg-cyan-500 hover:bg-cyan-600"
                }`}
            >
              {!isAuthenticated ? "Login dahulu" : "Daftar Sekarang"}
            </button>
          )}
        </div>

        <div className="absolute top-0 left-0 p-4 z-10">
          <img
            src={getSDGIcon()}
            alt={`SDG ${getSDGNumbers()}`}
            className="w-12 h-12 sm:w-16 sm:h-16"
          />
        </div>
      </div>
    </div>
  );
};
