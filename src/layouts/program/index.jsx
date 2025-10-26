import { useState, useEffect } from "react";

const ProgramCard = ({ program, isActive }) => {
  return (
    <div
      className={`flex flex-col md:flex-row gap-4 bg-white rounded-3xl overflow-hidden shadow-lg mx-2 sm:mx-6 lg:mx-10 ${
        isActive ? "block" : "hidden"
      }`}
    >
      {/* Left Side - Program Image */}
      <div className="w-full md:w-2/5 lg:w-1/3">
        <div className="relative w-full h-64 sm:h-80 md:h-full">
          <div className="absolute top-0 left-0 p-4 z-10">
            {program.sdgNumber === "3" ? (
              <img
                src="https://ik.imagekit.io/iflmalang/constant-image/sdgs3?updatedAt=1744982438642"
                alt="SDG 3"
                className="w-12 h-12 sm:w-16 sm:h-16"
              />
            ) : (
              <img
                src="https://ik.imagekit.io/iflmalang/constant-image/sdgs4?updatedAt=1744982438696"
                alt="SDG 4"
                className="w-12 h-12 sm:w-16 sm:h-16"
              />
            )}
          </div>
          <img
            src={program.image}
            alt={program.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right Side - Program Info */}
      <div className="w-full md:w-3/5 lg:w-2/3 p-4 sm:p-5 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
          <div className="flex items-center gap-2 mb-2 sm:mb-0">
            <div className="bg-cyan-500 text-white rounded-full p-1 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
              {/* User SVG icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 sm:w-5 sm:h-5"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <span className="font-semibold text-lg sm:text-xl text-gray-800">
              {program.title}
            </span>
          </div>
          <div className="text-cyan-500 font-medium text-sm flex items-center">
            {/* Clock icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 sm:w-5 sm:h-5 mr-1"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span className="text-cyan-500">{program.date}</span>
          </div>
        </div>

        <div className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">
          Supports SDGs No. {program.sdgNumber}
        </div>

        <div className="text-gray-800 text-sm sm:text-base mb-4 sm:mb-6">
          {program.description}
        </div>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mb-4 sm:mb-6">
          <div className="flex-1 border border-cyan-200 rounded-lg p-2 sm:p-3 flex items-center gap-2 sm:gap-3">
            <div className="bg-cyan-100 rounded-full p-1 sm:p-2">
              {/* Participants icon (users) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-500"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div>
              <div className="font-semibold text-lg sm:text-xl">
                {program.participants}
              </div>
              <div className="text-xs sm:text-sm text-gray-500">
                Participant
              </div>
            </div>
          </div>

          <div className="flex-1 border border-cyan-200 rounded-lg p-2 sm:p-3 flex items-center gap-2 sm:gap-3">
            <div className="bg-cyan-100 rounded-full p-1 sm:p-2">
              {/* Committee icon (brain) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-500"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div>
              <div className="font-semibold text-lg sm:text-xl">
                {program.committee}
              </div>
              <div className="text-xs sm:text-sm text-gray-500">Committee</div>
            </div>
          </div>
        </div>

        {/* Activities */}
        <div>
          <div className="font-medium text-sm sm:text-base mb-2">
            Kegiatan Program:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm sm:text-base">
            {program.activities.map((activity, index) => (
              <div key={index} className="flex items-start gap-2">
                {/* Check circle icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-1 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 text-cyan-500"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>{activity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProgramSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-advancing slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === 2 ? 0 : prev + 1));
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Header slideshow data
  const headerSlides = [
    {
      id: 1,
      title: "We Care Them",
      description:
        "Salah satu program IFL Chapter Malang berfokus pada isu down syndrome di Kota Malang",
      image:
        "https://ik.imagekit.io/iflmalang/constant-image/program1?updatedAt=1744995070010",
    },
    {
      id: 2,
      image:
        "https://ik.imagekit.io/iflmalang/constant-image/program2?updatedAt=1744995069847",
    },
    {
      id: 3,
      image:
        "https://ik.imagekit.io/iflmalang/constant-image/program-pic.webp?updatedAt=1720372205829",
    },
  ];

  // Program data matching the images
  const programs = [
    {
      title: "We Care Them",
      sdgNumber: "3",
      date: "12/2024",
      image:
        "https://ik.imagekit.io/iflmalang/constant-image/wct?updatedAt=1749782206325",
      description:
        "Salah satu program dari Indonesian Future Leaders Chapter Malang yang berfokus pada poin SDGs no. 3 (Good Health and Well-being). Berangkat dari isu kesehatan, We Care Them berfokus pada isu down syndrome yang berada di Kota Malang. We Care Them bertujuan untuk mengajarkan perhatian mawas diri kepada anak-anak down syndrome.",
      participants: "50+",
      committee: "20+",
      activities: [
        "Edukasi Tentang Down Syndrome",
        "Melakukan Kegiatan Bersama Down Syndrome",
        "Berinteraksi dengan Down Syndrome",
      ],
    },
    {
      title: "Aku Pintar",
      sdgNumber: "4",
      date: "05/2025",
      image:
        "https://ik.imagekit.io/iflmalang/constant-image/ap?updatedAt=1749781232279",
      description:
        "Salah satu program dari Indonesian Future Leaders Chapter Malang yang memiliki fokus pada poin SDGs no. 4 (Quality Education). Berangkat dari isu pendidikan, program Aku Pintar bertujuan untuk ikut berkontribusi dalam mendukung serta meningkatkan kualitas pendidikan dengan mengangkat isu anti-bullying dan literasi di Malang Raya.",
      participants: "15",
      committee: "14",
      activities: [
        "Pemaparan Materi Literasi & Bullying",
        "Games Seputar Literasi",
        "3 Pos Games (Puzzle Cerita, Teka-Teki Cerdas, Imajinasi Bebas)",
      ],
    },
  ];

  return (
    <>
      {/* Hero Section with Background Slideshow */}
      <div className="relative bg-cyan-500 text-white">
        {/* Background Slideshow with Overlay */}
        <div className="absolute inset-0 z-0">
          {headerSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                activeSlide === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover opacity-30"
              />
            </div>
          ))}
        </div>

        {/* Content - Static, doesn't change with slideshow */}
        <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-20 md:py-24 lg:py-28 relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Program
          </h1>
          <p className="text-sm sm:text-base md:text-lg max-w-4xl leading-relaxed">
            Program IFL Chapter Malang 2023/2024 berlandaskan pada dua poin
            Sustainable Development Goals (SDGs) yaitu Good Health & Well being;
            dan Quality Education yang berdasarkan The Way Forward Indonesia
            yang dikeluarkan oleh United Nation Development Programme (UNDP)
            serta, berdasarkan rancangan pembangunan yang dikeluarkan oleh
            Pemerintah Kota Malang.
          </p>
        </div>

        {/* Slideshow Indicators - Centered and Lower */}
        <div className="absolute bottom-8 left-0 right-0 z-10">
          <div className="flex justify-center gap-2">
            {headerSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeSlide === index
                    ? "bg-white w-6"
                    : "bg-white bg-opacity-50"
                }`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Tab Section */}
      <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-6 sm:py-8 md:py-10">
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 w-full max-w-xs sm:max-w-sm md:max-w-md">
            <button
              className={`py-2 sm:py-3 px-3 sm:px-4 md:px-6 rounded-full flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base ${
                activeTab === 0
                  ? "bg-cyan-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => setActiveTab(0)}
            >
              <b>
                <span className="flex items-center justify-center">
                  {/* Heart SVG icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                  We Care Them
                </span>
              </b>
            </button>
            <button
              className={`py-2 sm:py-3 px-3 sm:px-4 md:px-6 rounded-full flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base ${
                activeTab === 1
                  ? "bg-cyan-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => setActiveTab(1)}
            >
              <b>
                <span className="flex items-center justify-center">
                  {/* Book/Education icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  >
                    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.84-5.36 2.5 2.5 0 1 1 4.26-2.62 2.5 2.5 0 0 1 2-3.88Z"></path>
                    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .84-5.36 2.5 2.5 0 1 0-4.26-2.62 2.5 2.5 0 0 0-2-3.88Z"></path>
                  </svg>
                  Aku Pintar
                </span>
              </b>
            </button>
          </div>
        </div>

        {/* Program Cards */}
        <div className="mb-10 sm:mb-16 md:mb-20">
          {programs.map((program, index) => (
            <ProgramCard
              key={index}
              program={program}
              isActive={activeTab === index}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProgramSection;
