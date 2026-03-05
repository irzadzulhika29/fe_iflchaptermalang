import hallieDavinaImg from "../../assets/image/hallieDavina.png";
import attallahRassyaImg from "../../assets/image/attallahRassya.png";
import aldaRaniaImg from "../../assets/image/aldaRania.png";
import muhammadFikriImg from "../../assets/image/muhammadFikri.png";
import ibrenaKhaninaImg from "../../assets/image/ibrenaKhanina.png";
import aliyaOktarinaImg from "../../assets/image/aliyaOktarina.png";
import muhammadAliImg from "../../assets/image/muhammadAli.png";

const TeamCard = ({ name, role, imgSrc, isStaff = false, isDirector = false, description }) => (
  <div className="relative w-full h-full min-w-40 min-h-52 sm:w-48 md:w-56 lg:w-64 sm:h-64 md:h-80 rounded-2xl overflow-hidden border-4 border-cyan-500 shrink-0 bg-sky-100">
    <img
      src={imgSrc}
      alt={name}
      className="w-full h-full object-cover"
    />
    <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center">
      <div className="w-full bg-white text-cyan-500 py-2 text-center font-medium">
        {name}
      </div>
      {!isStaff && (
        <div className="w-full bg-cyan-500 text-white py-2 text-center font-medium">
          {isDirector ? `Director of ${role}` : `Manager of ${role}`}
          {description && <div className="text-xs italic">{description}</div>}
        </div>
      )}
      {isStaff && (
        <div className="w-full bg-cyan-500 text-white py-2 text-center font-medium">
          {role}
          {description && <div className="text-xs italic">{description}</div>}
        </div>
      )}
    </div>
  </div>
);

const SectionTitle = ({ children }) => (
  <div className="flex justify-center mt-12 mb-8">
    <div className="bg-white border-2 border-cyan-500 text-cyan-500 px-12 py-2 rounded-full text-lg font-medium">
      {children}
    </div>
  </div>
);

const Comper = () => {
  return (
    <section className="min-h-screen pb-16 relative">
      {/* Custom background gradient that starts below the directors section */}
      <div
        className="w-full h-full absolute top-0 left-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, #4dd6e6 0%, rgba(163, 219, 242, 0.9) 30%, rgba(186, 230, 253, 0.7) 60%, rgba(218, 240, 251, 0.4) 85%, rgba(255, 255, 255, 1) 100%)",
          pointerEvents: "none",
        }}
      ></div>

      <div className="relative text-white py-16 sm:py-20 md:py-24 lg:py-32">
        {/* Diagonal banners - Made responsive with lower z-index */}
        <div className="absolute inset-0 overflow-hidden z-0">
          {/* Top banner - Responsive height and position with new color and reduced opacity */}
          <div
            className="absolute top-[15%] sm:top-[18%] md:top-[20%] lg:top-[23%] left-0 w-[200%] h-6 sm:h-8 md:h-10 transform -rotate-3 flex items-center"
            style={{ backgroundColor: "#00B4D8", opacity: 0.7 }}
          >
            <div className="flex items-center space-x-2 sm:space-x-3 text-white whitespace-nowrap px-2 sm:px-4">
              {Array(20)
                .fill(0)
                .map((_, i) => (
                  <div key={`top-${i}`} className="flex items-center">
                    <span className="text-sm sm:text-base md:text-lg font-medium">
                      COMPER
                    </span>
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mx-1 sm:mx-2"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                ))}
            </div>
          </div>

          {/* Bottom banner - Responsive height and position with new color and reduced opacity */}
          <div
            className='absolute bottom-[65%] sm:bottom-[62%] md:bottom-[60%] lg:bottom-[56%] left-0 w-[200%] h-5 sm:h-8 md:h-10 transform rotate-3 flex items-center'
            style={{ backgroundColor: '#1A8FE3', opacity: 0.7 }}
          >
            <div className="flex items-center space-x-2 sm:space-x-3 text-white whitespace-nowrap px-2 sm:px-4">
              {Array(20)
                .fill(0)
                .map((_, i) => (
                  <div key={`bottom-${i}`} className="flex items-center">
                    <span className="text-sm sm:text-base md:text-lg font-medium">
                      COMPER
                    </span>
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mx-1 sm:mx-2"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Title Box - Made responsive with higher z-index and updated color */}
        <div className="relative z-20 flex justify-center px-2 sm:px-4">
          <div
            style={{ backgroundColor: "#00B4D8" }}
            className="border-2 border-cyan-600 px-8 sm:px-12 md:px-16 py-4 sm:py-5 md:py-6"
          >
            <h1 className='text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white text-center leading-tight'>
              Communication & Cooperation
            </h1>
          </div>
        </div>

        {/* Description */}
        <div className="container mx-auto mt-10 sm:mt-12 md:mt-16 px-4 sm:px-8 lg:px-16">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white text-center max-w-4xl mx-auto leading-relaxed">
            Sebagai penghubung utama dengan dunia luar, Communication & Cooperation bertanggung jawab menjalin hubungan strategis dengan pihak eksternal. Melalui komunikasi yang efektif, mereka memperkuat jaringan kolaborasi dengan komunitas, organisasi, media, hingga alumni, memastikan hubungan yang saling mendukung untuk keberlanjutan program IFL.
          </p>
        </div>
      </div>

      {/* Team Members Section */}
      <div className="container mx-auto px-4 pt-8 sm:pt-12 md:pt-16">
        {/* Desktop layout using same flex approach as NonDept section */}
        <div className="hidden lg:flex lg:flex-row lg:items-center lg:justify-center lg:gap-20">
          {/* Manager of Partnership - Left position */}
          <div className="w-64 h-80">
            <TeamCard 
              name="Hallie Davina" 
              role="Partnership" 
              imgSrc={hallieDavinaImg} 
              isDirector={false}
            />
          </div>

          {/* Director - Center position */}
          <div className="w-64 h-80 transform -translate-y-12">
            <TeamCard
              name="Attallah Rassya"
              role="Communication & Cooperation"
              imgSrc={attallahRassyaImg}
              isDirector={true}
            />
          </div>

          {/* Manager of External Engagement - Right position */}
          <div className="w-64 h-80">
            <TeamCard 
              name="Alda Rania" 
              role="EXMEN" 
              imgSrc={aldaRaniaImg} 
              isDirector={false}
              description="External Engagement"
            />
          </div>
        </div>

        {/* Tablet layout */}
        <div className="hidden sm:flex sm:flex-col md:flex-row lg:hidden items-center justify-center gap-12">
          {/* Director on top for tablet */}
          <div className="w-56 h-64 mb-8 sm:mb-0">
            <TeamCard
              name="Attallah Rassya"
              role="Communication & Cooperation"
              imgSrc={attallahRassyaImg}
              isDirector={true}
            />
          </div>

          {/* Container for Managers */}
          <div className="flex flex-row justify-center items-center gap-20">
            {/* Manager of Partnership */}
            <div className="w-48 h-64">
              <TeamCard 
                name="Hallie Davina" 
                role="Partnership" 
                imgSrc={hallieDavinaImg} 
                isDirector={false}
              />
            </div>

            {/* Manager of External Engagement */}
            <div className="w-48 h-64">
              <TeamCard 
               name="Alda Rania" 
               role="EXMEN" 
               imgSrc={aldaRaniaImg} 
               isDirector={false}
               description="External Engagement"
              />
            </div>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="flex flex-col items-center sm:hidden gap-12">
          {/* Director first on mobile */}
          <div className="w-56 h-64">
            <TeamCard
              name="Attallah Rassya"
              role="Communication & Cooperation"
              imgSrc={attallahRassyaImg}
              isDirector={true}
            />
          </div>

          {/* Manager of Partnership */}
          <div className="w-56 h-64">
            <TeamCard 
              name="Hallie Davina" 
              role="Partnership" 
              imgSrc={hallieDavinaImg} 
              isDirector={false}
            />
          </div>

          {/* Manager of External Engagement */}
          <div className="w-56 h-64">
            <TeamCard 
             name="Alda Rania" 
             role="EXMEN" 
             imgSrc={aldaRaniaImg} 
             isDirector={false}
             description="External Engagement"
            />
          </div>
        </div>
      </div>

      {/* Staff of Partnership */}
      <SectionTitle>Staff of Partnership</SectionTitle>
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Consistent spacing and styling for all staff sections */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-6 sm:gap-10">
          <div className="w-56 h-64 sm:w-48 md:w-56 lg:w-64 sm:h-64 md:h-80">
            <TeamCard
              name="Muhammad Fikri"
              role="Staff of Partnership"
              isStaff={true}
              imgSrc={muhammadFikriImg}
            />
          </div>
          <div className="w-56 h-64 sm:w-48 md:w-56 lg:w-64 sm:h-64 md:h-80">
            <TeamCard
              name="Ibrena Khanina"
              role="Staff of Partnership"
              isStaff={true}
              imgSrc={ibrenaKhaninaImg}
            />
          </div>
        </div>
      </div>

      {/* Staff of External Engagement */}
      <SectionTitle>Staff of External Engagement</SectionTitle>
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Using same classes as Staff of Partnership for consistency */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-6 sm:gap-10">
          <div className="w-56 h-64 sm:w-48 md:w-56 lg:w-64 sm:h-64 md:h-80">
            <TeamCard
              name="Aliya Oktarina"
              role="Staff of External Engagement"
              isStaff={true}
              imgSrc={aliyaOktarinaImg}
            />
          </div>
          <div className="w-56 h-64 sm:w-48 md:w-56 lg:w-64 sm:h-64 md:h-80">
            <TeamCard
              name="Muhammad Ali"
              role="Staff of External Engagement"
              isStaff={true}
              imgSrc={muhammadAliImg}
            />
          </div>
        </div>
      </div>

      {/* Jobdesc Section */}
      <div className="container mx-auto px-4">
        {/* Title container */}
        <div className="mb-6">
          <div className="border-2 border-cyan-500 rounded-full text-cyan-500 text-center py-3 px-6">
            <span className="font-medium text-lg">Jobdesc</span>
          </div>
        </div>

        {/* Responsive Jobdesc Section */}
        <div className="space-y-6 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6">
          {/* Partnership */}
          <div className="flex flex-col">
            <div className="border-2 border-cyan-500 rounded-full text-cyan-500 text-center py-3 px-6 mb-4">
              <span className="font-medium">Partnership</span>
            </div>
            <div className="flex-1 p-4 bg-white shadow-sm rounded-lg border border-gray-100">
              <p className="text-gray-600 text-justify leading-relaxed">
                Bertugas dan bertanggung jawab dalam menjalin hubungan dengan
                komunitas, organisasi, dan media partner.
              </p>
            </div>
          </div>

          {/* External Engagement */}
          <div className="flex flex-col">
            <div className="border-2 border-cyan-500 rounded-full text-cyan-500 text-center py-3 px-6 mb-4">
              <span className="font-medium">External Engagement</span>
            </div>
            <div className="flex-1 p-4 bg-white shadow-sm rounded-lg border border-gray-100">
              <p className="text-gray-600 text-justify leading-relaxed">
                Bertanggung jawab dalam menjaga hubungan baik dengan pihak
                eksternal, perseorangan, pemerintah, pelayanan publik, alumni IFL
                Chapter Malang, serta sebagai jembatan penghubung antara member
                IFL Chapter Malang dengan pihak-pihak tersebut.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comper;