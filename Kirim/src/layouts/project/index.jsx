import { useState, useEffect } from "react";

const ProjectCard = ({ project, isActive }) => {
  return (
    <div
      className={`flex flex-col md:flex-row gap-4 bg-white rounded-3xl overflow-hidden shadow-lg mx-2 sm:mx-6 lg:mx-10 ${
        isActive ? "block" : "hidden"
      }`}
    >
      {/* Left Side - Project Image */}
      <div className="w-full md:w-2/5 lg:w-1/3">
        <div className="relative w-full h-64 sm:h-80 md:h-full">
          <div className="absolute top-0 left-0 p-4 z-10">
            {project.id === "close-the-gap" && (
              <img
                src="https://ik.imagekit.io/iflmalang/constant-image/sdgs10?updatedAt=1744990771804"
                alt="SDG 10"
                className="w-12 h-12 sm:w-16 sm:h-16"
              />
            )}
            {project.id === "grow-them-great" && (
              <img
                src="https://ik.imagekit.io/iflmalang/constant-image/sdgs8?updatedAt=1744990771830"
                alt="SDG 8"
                className="w-12 h-12 sm:w-16 sm:h-16"
              />
            )}
            {project.id === "youthquake" && (
              <img
                src="https://ik.imagekit.io/iflmalang/constant-image/sdgs5?updatedAt=1744990771864"
                alt="SDG 5"
                className="w-12 h-12 sm:w-16 sm:h-16"
              />
            )}
            {project.id === "ifl-take-action" && (
              <div className="flex">
                <img
                  src="https://ik.imagekit.io/iflmalang/constant-image/sdgs11?updatedAt=1744990771846"
                  alt="SDG 11"
                  className="w-12 h-12 sm:w-16 sm:h-16"
                />
                <img
                  src="https://ik.imagekit.io/iflmalang/constant-image/sdgs13?updatedAt=1744990771859"
                  alt="SDG 13"
                  className="w-12 h-12 sm:w-16 sm:h-16 ml-1"
                />
              </div>
            )}
          </div>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right Side - Project Info */}
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
              {project.title}
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
              className="w-4 h-4 sm:w-5 sm:h-5 mr-1 text-cyan-500"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span className="text-cyan-500">{project.date}</span>
          </div>
        </div>

        <div className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">
          Supports SDGs No. {project.sdgText}
        </div>

        <div className="text-gray-800 text-sm sm:text-base mb-4 sm:mb-6">
          {project.description}
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
                {project.participants}
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
                {project.committee}
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
            {project.activities.map((activity, index) => (
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

const ProjectSection = () => {
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
      title: "Close The Gap",
      image: "https://ik.imagekit.io/iflmalang/constant-image/project1",
    },
    {
      id: 2,
      title: "Grow Them Great",
      image: "https://ik.imagekit.io/iflmalang/constant-image/project2",
    },
    {
      id: 3,
      title: "YouthQuake",
      image:
        "https://ik.imagekit.io/iflmalang/constant-image/program-pic.webp?updatedAt=1720372205829",
    },
  ];

  // Project data matching the images
  const projects = [
    {
      id: "close-the-gap",
      title: "Close The Gap",
      sdgNumber: "10",
      sdgText: "10",
      date: "12/2024",
      image:
        "https://ik.imagekit.io/iflmalang/constant-image/ctg?updatedAt=1744995566761",
      description:
        "Salah satu project dari Indonesian Future Leaders Chapter Malang yang memiliki fokus pada poin SDGs no. 10 (Reduced Inequalities). Berangkat dari adanya isu ketidaksetaraan, Close The Gap berfokus pada pemberdayaan kelompok masyarakat penyandang difabel yang bertujuan untuk menciptakan ruang inklusif serta untuk menghilangkan stigma negatif.",
      participants: "50+",
      committee: "20+",
      activities: [
        "Edukasi Tentang Disabilitas",
        "Melakukan Kegiatan Baking Bersama Teman Difabel",
        "Berinteraksi dengan Teman Difabel",
      ],
    },
    {
      id: "grow-them-great",
      title: "Grow Them Great",
      sdgNumber: "8",
      sdgText: "8",
      date: "01/2025",
      image:
        "https://ik.imagekit.io/iflmalang/constant-image/gtg?updatedAt=1749782190298",
      description:
        "Grow Them Great merupakan salah satu project yang berfokus pada poin SDGs no. 8 (Decent Work and Economic Growth). Berangkat dari isu UMKM, project ini memiliki beberapa fase yang berfokus pada pemberdayaan masyarakat. Grow Them Great bertujuan untuk digitalisasi UMKM dengan tujuan memasarkan UMKM lokal terhadap khalayak luas.",
      participants: "50+",
      committee: "20+",
      activities: [
        "Edukasi Tentang Keramik Dinoyo",
        "Melihat Rumah Produksi Keramik Dinoyo",
        "Workshop Membuat Keramik",
      ],
    },
    {
      id: "youthquake",
      title: "YouthQuake",
      sdgNumber: "5",
      sdgText: "5",
      date: "04/2025",
      image:
        "https://ik.imagekit.io/iflmalang/constant-image/yq?updatedAt=1749781214273",
      description:
        "Kegiatan di luar program dan project utama IFL Chapter Malang dan berfokus pada poin SDGs no. 5 yaitu (Reduced Inequality). Berangkat dari isu kesetaraan gender yang bertujuan untuk mengedukasi masyarakat perihal kesetaraan gender dan mengurangi bahkan menghapus stigma negatif mengenai peran gender.",
      participants: "50+",
      committee: "20+",
      activities: [
        "Edukasi Tentang Kesetaraan Gender",
        "Menonton Film Pendek dan Diskusi",
        "Pameran Installasi Seni",
      ],
    },
    {
      id: "ifl-take-action",
      title: "IFL Take Action",
      sdgNumber: "11,13",
      sdgText: "11 & No. 13",
      date: "05/2025",
      image:
        "https://ik.imagekit.io/iflmalang/constant-image/ifl%20ta?updatedAt=1749781262936",
      description:
        "Kegiatan yang mempunyai fokus pada poin SDGs no. 11 (Sustainable Cities and Communities) dan SDGs no. 13 (Climate Action), terkait dengan disaster risk reduction dan climate action. Berangkat dari adanya urgensi terhadap situasi masyarakat yang terdampak oleh sesuatu atau bencana, IFL Take Action ini bertujuan sebagai wadah untuk berkontribusi dalam menangani masyarakat yang terkena dampak bencana dan juga mengedukasi masyarakat mengenai penanganan sampah plastik dan jenis sampah lainnya dan mengurangi sampah plastik yang sulit terurai.",
      participants: "50+",
      committee: "20+",
      activities: [
        "Edukasi Tentang Macam Sampah dan Cara Pengelolaannya",
        "Melakukan Kegiatan Bersih-Bersih Sampah",
        "Memilah Sampah Plastik dan Non-Plastik",
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
            Project
          </h1>
          <p className="text-sm sm:text-base md:text-lg max-w-4xl leading-relaxed">
            Project IFL Chapter Malang 2022/2023 berlandaskan pada enam poin
            Sustainable Development Goals (SDGs) yaitu Reduced Inequalities; No
            Poverty; Peace, Justice, & Strong Institutions; Gender Equality; dan
            Sustainable Cities & Communities berdasarkan The Way Forward
            Indonesia yang dikeluarkan oleh United Nation Development Programme
            (UNDP) serta berdasarkan rancangan pembangunan yang dikeluarkan oleh
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full">
            <button
              className={`py-2 px-4 sm:px-6 rounded-full flex items-center justify-center gap-1 text-xs sm:text-sm ${
                activeTab === 0
                  ? "bg-cyan-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => setActiveTab(0)}
            >
              <b>
                <span className="flex items-center justify-center">
                  {/* Accessibility icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1 w-3 h-3 sm:w-4 sm:h-4"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="10" r="3"></circle>
                    <path d="m12 13-1.5 9h3L12 13Z"></path>
                  </svg>
                  Close The Gap
                </span>
              </b>
            </button>
            <button
              className={`py-2 px-4 sm:px-6 rounded-full flex items-center justify-center gap-1 text-xs sm:text-sm ${
                activeTab === 1
                  ? "bg-cyan-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => setActiveTab(1)}
            >
              <b>
                <span className="flex items-center justify-center">
                  {/* Growth/trending up icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1 w-3 h-3 sm:w-4 sm:h-4"
                  >
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                    <polyline points="17 6 23 6 23 12"></polyline>
                  </svg>
                  Grow Them Great
                </span>
              </b>
            </button>
            <button
              className={`py-2 px-4 sm:px-6 rounded-full flex items-center justify-center gap-1 text-xs sm:text-sm ${
                activeTab === 2
                  ? "bg-cyan-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => setActiveTab(2)}
            >
              <b>
                <span className="flex items-center justify-center">
                  {/* Users/equality icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1 w-3 h-3 sm:w-4 sm:h-4"
                  >
                    <path d="M5 3v4M9 3v4M13 3v4M17 3v4M5 20h14" />
                    <circle cx="7" cy="9" r="2" />
                    <circle cx="17" cy="9" r="2" />
                    <path d="M7 20v-5a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v5" />
                  </svg>
                  YouthQuake
                </span>
              </b>
            </button>
            <button
              className={`py-2 px-4 sm:px-6 rounded-full flex items-center justify-center gap-1 text-xs sm:text-sm ${
                activeTab === 3
                  ? "bg-cyan-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => setActiveTab(3)}
            >
              <b>
                <span className="flex items-center justify-center">
                  {/* Recycling icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1 w-3 h-3 sm:w-4 sm:h-4"
                  >
                    <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
                    <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" />
                    <path d="m14 16-3 3 3 3" />
                    <path d="M8.293 13.596 4.5 9.497l1.906-3.35a1.786 1.786 0 0 1 1.663-.909h2.641" />
                    <path d="m10 5 3-3-3-3" />
                    <path d="M12.313 13.596h7.371a1.83 1.83 0 0 0 1.57-.881 1.784 1.784 0 0 0 .017-1.775l-3.043-5.261a1.775 1.775 0 0 0-1.57-.879h-3.349" />
                    <path d="m17 9-3-3-3 3" />
                  </svg>
                  IFL Take Action
                </span>
              </b>
            </button>
          </div>
        </div>

        {/* Project Cards */}
        <div className="mb-10 sm:mb-16 md:mb-20">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              isActive={activeTab === index}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectSection;
