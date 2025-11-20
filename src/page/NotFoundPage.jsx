import { useState } from "react";
import { Links } from "../components/button";

const NotFoundPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePosition({
      x: (clientX / innerWidth - 0.5) * 20,
      y: (clientY / innerHeight - 0.5) * 20,
    });
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full min-h-screen overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-cyan-50"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-1 px-4">
        <div className="relative">
          <h1
            className="text-[12rem] sm:text-[16rem] md:text-[20rem] font-black text-primary-1/10 select-none transition-transform duration-300 ease-out"
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            }}
          >
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1
              className="text-8xl sm:text-9xl md:text-[12rem] font-black text-primary-1 animate-pulse-slow"
              style={{
                transform: `translate(${-mousePosition.x * 0.5}px, ${-mousePosition.y * 0.5}px)`,
              }}
            >
              404
            </h1>
          </div>
        </div>

        <div className="animate-bounce-slow">
          <svg
            className="w-20 h-20 text-primary-1/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <div className="text-center space-y-3 animate-fade-in-up">
          <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">
            Halaman Tidak Ditemukan
          </p>
          <p className="text-base sm:text-lg text-gray-600 max-w-md mx-auto px-4">
            Halaman yang Anda cari sepertinya tidak ada atau telah dipindahkan.
          </p>
        </div>

        <div className="mt-4 animate-fade-in-up animation-delay-300">
          <button
            onClick={() => window.location.href = '/'}
            className="group relative px-10 py-4 bg-white border-2 border-primary-1 text-primary-1 font-bold text-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-110 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              <svg
                className="w-6 h-6 group-hover:rotate-[-360deg] transition-transform duration-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Kembali ke Beranda
            </span>
            <div className="absolute inset-0 bg-primary-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white font-bold text-lg z-20">
              <svg
                className="w-6 h-6 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Kembali ke Beranda
            </span>
          </button>
        </div>

        <div className="absolute top-20 left-10 w-16 h-16 border-2 border-primary-1/20 rounded-full animate-spin-slow" />
        <div className="absolute bottom-20 right-10 w-12 h-12 border-2 border-primary-1/20 rounded-full animate-spin-slow animation-delay-1000" />
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;
