import azzahraAuraImg from "../../assets/image/azzahraAura.png";
import tsuraiyaIzzaImg from "../../assets/image/tsuraiyaIzza.png";
import baiqRizaImg from "../../assets/image/baiqRiza.png";
import radenIzzanImg from "../../assets/image/radenIzzan.png";
import nickArneztiImg from "../../assets/image/nickyArnezti.png";
import nailaKamilaImg from "../../assets/image/nailaKamila.png";

const TeamCard = ({
  name,
  role,
  imgSrc,
  isStaff = false,
  isDirector = false,
  description,
}) => (
  <div className="relative w-full h-full min-w-40 min-h-52 sm:w-48 md:w-56 lg:w-64 sm:h-64 md:h-80 rounded-2xl overflow-hidden border-4 border-cyan-500 shrink-0 bg-sky-100">
    <img src={imgSrc} alt={name} className="w-full h-full object-cover" />
    <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center">
      <div className="w-full bg-white text-cyan-500 py-2 text-center font-medium">
        {name}
      </div>
      {!isStaff && (
        <div className="w-full bg-cyan-500 text-white py-2 text-center font-medium">
          {isDirector
            ? role.includes("Executive")
              ? role
              : `Director of ${role}`
            : `Manager of ${role}`}
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

const NonDepartment = () => {
  return (
    <section className="min-h-screen pb-16 relative">
      {/* Custom background gradient */}
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
            className="absolute top-[17%] sm:top-[17%] md:top-[22%] left-0 w-[200%] h-6 sm:h-8 md:h-10 transform -rotate-3 flex items-center"
            style={{ backgroundColor: "#00B4D8", opacity: 0.7 }}
          >
            <div className="flex items-center space-x-2 sm:space-x-3 text-white whitespace-nowrap px-2 sm:px-4">
              {Array(20)
                .fill(0)
                .map((_, i) => (
                  <div key={`top-${i}`} className="flex items-center">
                    <span className="text-sm sm:text-base md:text-lg font-medium">
                      NONDEPT
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
            className='absolute bottom-[70%] sm:bottom-[60%] md:bottom-[59%] lg:bottom-[55%] left-0 w-[200%] h-5 sm:h-8 md:h-10 transform rotate-3 flex items-center'
            style={{ backgroundColor: '#1A8FE3', opacity: 0.7 }}
          >
            <div className="flex items-center space-x-2 sm:space-x-3 text-white whitespace-nowrap px-2 sm:px-4">
              {Array(20)
                .fill(0)
                .map((_, i) => (
                  <div key={`bottom-${i}`} className="flex items-center">
                    <span className="text-sm sm:text-base md:text-lg font-medium">
                      NONDEPT
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
              Non-Department
            </h1>
          </div>
        </div>

        {/* Description */}
        <div className="container mx-auto mt-10 sm:mt-12 md:mt-16 px-4 sm:px-8 lg:px-16">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white text-center max-w-4xl mx-auto leading-relaxed">
            Non-Department adalah pilar utama yang memastikan kelancaran seluruh
            aktivitas di IFL Chapter Malang. Selain bertugas dalam administrasi,
            pengawasan operasional, dan pengelolaan keuangan, mereka juga
            memegang peran penting dalam mengawasi jalannya program dan proyek,
            memastikan setiap inisiatif berjalan sesuai rencana dan visi
            organisasi.
          </p>
        </div>
      </div>

      {/* Team Members Section */}
      <div className="container mx-auto px-4 pt-8 sm:pt-12 md:pt-16">
        {/* Desktop layout */}
        <div className="hidden lg:flex lg:flex-row lg:items-center lg:justify-center lg:gap-20">
          {/* Secretary */}
          <div className="w-64 h-80">
            <TeamCard
              name="Nicky Arnezti"
              role="Secretary"
              imgSrc={nickArneztiImg}
              isDirector={false}
            />
          </div>

          {/* Executive Director */}
          <div className="w-64 h-80 transform -translate-y-12">
            <TeamCard
              name="Raden Izzan"
              role="Executive Director"
              imgSrc={radenIzzanImg}
              isDirector={true}
            />
          </div>

          {/* Treasurer */}
          <div className="w-64 h-80">
            <TeamCard
              name="Naila Kamila"
              role="Treasurer"
              imgSrc={nailaKamilaImg}
              isDirector={false}
            />
          </div>
        </div>

        {/* Tablet layout */}
        <div className="hidden sm:flex sm:flex-col md:flex-row lg:hidden items-center justify-center gap-12">
          {/* Executive Director on top */}
          <div className="w-56 h-64 mb-8 sm:mb-0">
            <TeamCard
              name="Raden Izzan"
              role="Executive Director"
              imgSrc={radenIzzanImg}
              isDirector={true}
            />
          </div>

          {/* Secretary and Treasurer */}
          <div className="flex flex-row justify-center items-center gap-20">
            {/* Secretary */}
            <div className="w-48 h-64">
              <TeamCard
                name="Nicky Arnezti"
                role="Secretary"
                imgSrc={nickArneztiImg}
                isDirector={false}
              />
            </div>

            {/* Treasurer */}
            <div className="w-48 h-64">
              <TeamCard
                name="Naila Kamila"
                role="Treasurer"
                imgSrc={nailaKamilaImg}
                isDirector={false}
              />
            </div>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="flex flex-col items-center sm:hidden gap-12">
          {/* Executive Director first */}
          <div className="w-56 h-64">
            <TeamCard
              name="Raden Izzan"
              role="Executive Director"
              imgSrc={radenIzzanImg}
              isDirector={true}
            />
          </div>

          {/* Secretary */}
          <div className="w-56 h-64">
            <TeamCard
              name="Nicky Arnezti"
              role="Secretary"
              imgSrc={nickArneztiImg}
              isDirector={false}
            />
          </div>

          {/* Treasurer */}
          <div className="w-56 h-64">
            <TeamCard
              name="Naila Kamila"
              role="Treasurer"
              imgSrc={nailaKamilaImg}
              isDirector={false}
            />
          </div>
        </div>
      </div>

      {/* Staff of Secretary */}
      <SectionTitle>Staff of Secretary</SectionTitle>
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Staff grid */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          <div className="w-56 h-64 sm:w-48 md:w-56 lg:w-64 sm:h-64 md:h-80">
            <TeamCard
              name="Tsuraiya Izza"
              role="Staff of Secretary"
              isStaff={true}
              imgSrc={tsuraiyaIzzaImg}
            />
          </div>
          <div className="w-56 h-64 sm:w-48 md:w-56 lg:w-64 sm:h-64 md:h-80">
            <TeamCard
              name="Baiq Riza Nurfitri"
              role="Staff of Secretary"
              isStaff={true}
              imgSrc={baiqRizaImg}
            />
          </div>
        </div>
      </div>

      {/* Staff of Treasurer */}
      <SectionTitle>Staff of Treasurer</SectionTitle>
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Staff grid */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          <div className="w-56 h-64 sm:w-48 md:w-56 lg:w-64 sm:h-64 md:h-80">
            <TeamCard
              name="Az.zahra Aura Rizky"
              role="Staff of Treasurer"
              isStaff={true}
              imgSrc={azzahraAuraImg}
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
        <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-6">
          {/* Secretary */}
          <div className="flex flex-col">
            <div className="border-2 border-cyan-500 rounded-full text-cyan-500 text-center py-3 px-6 mb-4">
              <span className="font-medium">Secretary</span>
            </div>
            <div className="flex-1 p-4 bg-white shadow-sm rounded-lg border border-gray-100">
              <p className="text-gray-600 text-justify leading-relaxed">
                Bertanggung jawab atas kegiatan administrasi yang meliputi
                pembuatan surat, pencatatan berita acara, dan penyusunan buku
                tahunan baik di IFL Chapter Malang secara umum, maupun pada
                program-program kerja di IFL Chapter Malang.
              </p>
            </div>
          </div>

          {/* Executive Director */}
          <div className="flex flex-col">
            <div className="border-2 border-cyan-500 rounded-full text-cyan-500 text-center py-3 px-6 mb-4">
              <span className="font-medium">Executive Director</span>
            </div>
            <div className="flex-1 p-4 bg-white shadow-sm rounded-lg border border-gray-100">
              <p className="text-gray-600 text-justify leading-relaxed">
                Bertanggung jawab pada seluruh kegiatan yang berlangsung di IFL
                Chapter Malang, melakukan pengawasan, evaluasi, dan pemberian
                keputusan tertinggi pada IFL Chapter Malang.
              </p>
            </div>
          </div>

          {/* Treasurer */}
          <div className="flex flex-col">
            <div className="border-2 border-cyan-500 rounded-full text-cyan-500 text-center py-3 px-6 mb-4">
              <span className="font-medium">Treasurer</span>
            </div>
            <div className="flex-1 p-4 bg-white shadow-sm rounded-lg border border-gray-100">
              <p className="text-gray-600 text-justify leading-relaxed">
                Bertanggung jawab dalam pengelolaan keuangan IFL Chapter Malang,
                mencakup pembuatan anggaran, mekanisme uang kas, dan pelaporan
                keuangan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NonDepartment;
