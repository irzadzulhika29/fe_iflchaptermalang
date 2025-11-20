export const ProgramActions = ({ isClosed, isAuthenticated, onRegister }) => {
    const getButtonText = () => {
        if (isClosed) return 'Pendaftaran Ditutup';
        if (!isAuthenticated) return 'Login dahulu';
        return 'Daftar Sekarang';
    };

    const getButtonStyle = () => {
        if (isClosed) return 'bg-gray-400 cursor-not-allowed';
        if (!isAuthenticated) return 'bg-amber-500 hover:bg-amber-600';
        return 'bg-cyan-500 hover:bg-cyan-600';
    };

    return (
        <div className="w-full mt-4">
            <button
                onClick={onRegister}
                disabled={isClosed}
                className={`py-2 px-6 w-full rounded-2xl font-semibold text-lg text-white transition-colors ${getButtonStyle()}`}>
                {getButtonText()}
            </button>
        </div>
    );
};
