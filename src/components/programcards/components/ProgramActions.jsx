export const ProgramActions = ({ isClosed, onRegister }) => {
    return (
        <div className="w-full mt-4">
            <button
                onClick={onRegister}
                disabled={isClosed}
                className={`py-2 px-6 w-full rounded-2xl font-semibold text-lg text-white transition-colors ${isClosed
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-cyan-500 hover:bg-cyan-600'
                    }`}>
                {isClosed ? 'Pendaftaran Ditutup' : 'Daftar Sekarang'}
            </button>
        </div>
    );
};
