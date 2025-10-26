import dimasBagusImg from '../../assets/image/dimasBagus.png'
import julianandaFahrezaImg from '../../assets/image/julianandaFahreza.png'
import kartikaPutriImg from '../../assets/image/kartikaPutri.png'
import jihanIzraImg from '../../assets/image/jihanIzra.png'
import salasbilaZahraImg from '../../assets/image/salasbilaZahra.png'
import bintangFajriImg from '../../assets/image/bintangFajri.png'
import tsabitaNabilaImg from '../../assets/image/tsabitaNabila.png'
import tavitaNarazeldaImg from '../../assets/image/tavitaNarazelda.png'
import revalinaArilyaImg from '../../assets/image/revalinaArilya.png'
import anitaMargarethImg from '../../assets/image/anitaMargareth.png'
import hilmaSakinahImg from '../../assets/image/hilmaSakinah.png'
import tsamaraQaanitaImg from '../../assets/image/tsamaraQaanita.png'
import keyshaAudriaImg from '../../assets/image/keyshaAudria.png'
import zoelReiandaImg from '../../assets/image/zoelReianda.png'
import nasywaAnggitaImg from '../../assets/image/nasywaAnggita.png'
import muhammadMakinulImg from '../../assets/image/muhammadMakinul.png'
import wafiyAnwarulImg from '../../assets/image/wafiyAnwarul.png'

const TeamCard = ({
  name,
  role,
  imgSrc,
  isStaff = false,
  description,
  isDirector = false
}) => (
  <div className='relative w-full h-full min-w-40 min-h-52 sm:w-48 md:w-56 lg:w-64 sm:h-64 md:h-80 rounded-2xl overflow-hidden border-4 border-cyan-500 shrink-0 bg-sky-100'>
    <img src={imgSrc} alt={name} className='w-full h-full object-cover' />
    <div className='absolute bottom-0 left-0 right-0 flex flex-col items-center'>
      <div className='w-full bg-white text-cyan-500 py-2 text-center font-medium'>
        {name}
      </div>
      {!isStaff && (
        <div className='w-full bg-cyan-500 text-white py-2 text-center font-medium'>
          {isDirector ? `Director of ${role}` : `Manager of ${role}`}
          {description && <div className='text-xs italic'>{description}</div>}
        </div>
      )}
      {isStaff && (
        <div className='w-full bg-cyan-500 text-white py-2 text-center font-medium'>
          {role}
        </div>
      )}
    </div>
  </div>
)

const SectionTitle = ({ children }) => (
  <div className='flex justify-center mt-12 mb-8'>
    <div className='bg-white border-2 border-cyan-500 text-cyan-500 px-12 py-2 rounded-full text-lg font-medium'>
      {children}
    </div>
  </div>
)

const Cdsi = () => {
  return (
    <section className='min-h-screen pb-16 relative'>
      {/* Custom background gradient that starts below the directors section */}
      <div
        className='w-full h-full absolute top-0 left-0 -z-10'
        style={{
          background:
            'linear-gradient(to bottom, #4dd6e6 0%, rgba(163, 219, 242, 0.9) 30%, rgba(186, 230, 253, 0.7) 60%, rgba(218, 240, 251, 0.4) 85%, rgba(255, 255, 255, 1) 100%)',
          pointerEvents: 'none'
        }}
      ></div>

      <div className='relative text-white py-16 sm:py-20 md:py-24 lg:py-32'>
        {/* Diagonal banners - Made responsive with lower z-index */}
        <div className='absolute inset-0 overflow-hidden z-0'>
          {/* Top banner - Responsive height and position with new color and reduced opacity */}
          <div
            className='absolute top-[19%] sm:top-[18%] md:top-[20%] lg:top-[24%] left-0 w-[200%] h-5 sm:h-8 md:h-10 transform -rotate-3 flex items-center'
            style={{ backgroundColor: '#00B4D8', opacity: 0.7 }}
          >
            <div className='flex items-center space-x-2 sm:space-x-3 text-white whitespace-nowrap px-2 sm:px-4'>
              {Array(20)
                .fill(0)
                .map((_, i) => (
                  <div key={`top-${i}`} className='flex items-center'>
                    <span className='text-xs sm:text-base md:text-lg font-medium'>
                      CDSI
                    </span>
                    <svg
                      className='w-2 h-2 sm:w-4 sm:h-4 md:w-5 md:h-5 mx-1 sm:mx-2'
                      viewBox='0 0 24 24'
                      fill='none'
                    >
                      <path
                        d='M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z'
                        fill='currentColor'
                      />
                    </svg>
                  </div>
                ))}
            </div>
          </div>

          {/* Bottom banner - Responsive height and position with new color and reduced opacity */}
          <div
            className='absolute bottom-[65%] sm:bottom-[58%] md:bottom-[55%] lg:bottom-[52%] left-0 w-[200%] h-5 sm:h-8 md:h-10 transform rotate-3 flex items-center'
            style={{ backgroundColor: '#1A8FE3', opacity: 0.7 }}
          >
            <div className='flex items-center space-x-2 sm:space-x-3 text-white whitespace-nowrap px-2 sm:px-4'>
              {Array(20)
                .fill(0)
                .map((_, i) => (
                  <div key={`bottom-${i}`} className='flex items-center'>
                    <span className='text-xs sm:text-base md:text-lg font-medium'>
                      CDSI
                    </span>
                    <svg
                      className='w-2 h-2 sm:w-4 sm:h-4 md:w-5 md:h-5 mx-1 sm:mx-2'
                      viewBox='0 0 24 24'
                      fill='none'
                    >
                      <path
                        d='M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z'
                        fill='currentColor'
                      />
                    </svg>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Title Box - Made responsive with higher z-index and updated color */}
        <div className='relative z-20 flex justify-center px-2 sm:px-4'>
          <div
            style={{ backgroundColor: '#00B4D8' }}
            className='border-2 border-cyan-600 px-4 sm:px-8 sm:px-12 md:px-16 py-4 sm:py-5 md:py-6'
          >
            <h1 className='text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white text-center leading-tight'>
              Creative Design & System Information
            </h1>
          </div>
        </div>

        {/* Description */}
        <div className='container mx-auto mt-10 sm:mt-12 md:mt-16 px-4 sm:px-8 lg:px-16'>
          <p className='text-sm sm:text-base md:text-lg lg:text-xl text-white text-center max-w-4xl mx-auto leading-relaxed'>
            Creative Design & System Information adalah tim kreatif sekaligus
            teknologi di IFL Chapter Malang. Selain memproduksi konten visual,
            video, hingga copywriting, mereka juga melayani kebutuhan divisi
            lain dalam pembuatan media dan pengelolaan informasi.
          </p>
        </div>
      </div>

      {/* Team Members Section - Match the layout from NonDepartment */}
      <div className='container mx-auto px-4 pt-8 sm:pt-12 md:pt-16'>
        {/* Diamond layout - only visible on large screens */}

        <div className='hidden lg:block relative h-[700px] flex justify-center items-center'>
          {/* Atas Tengah - Director */}
          <div className='absolute top-0 left-1/2 transform -translate-x-1/2'>
            <div className='w-64 h-80'>
              <TeamCard
                name='Dimas Bagus'
                role='CDSI'
                description='Creative Design & System Information'
                imgSrc={dimasBagusImg}
                isDirector={true}
              />
            </div>
          </div>

          {/* Kiri Tengah */}
          <div className='absolute top-[50%] left-[5%] transform -translate-y-1/2'>
            <div className='w-64 h-80'>
              <TeamCard
                name='Juliananda Fahreza'
                role='VAD'
                description='Visual Art & Design'
                imgSrc={julianandaFahrezaImg}
                isDirector={false}
              />
            </div>
          </div>

          {/* Kanan Tengah */}
          <div className='absolute top-[50%] right-[5%] ml-50 transform -translate-y-1/2'>
            <div className='w-64 h-80'>
              <TeamCard
                name='Jihan Izra'
                role='DIGMAR'
                description='Digital Marketing'
                imgSrc={jihanIzraImg}
                isDirector={false}
              />
            </div>
          </div>

          {/* Bawah Tengah */}
          <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2'>
            <div className='w-64 h-80'>
              <TeamCard
                name='Kartika Putri'
                role='SI'
                description='System Information'
                imgSrc={kartikaPutriImg}
                isDirector={false}
              />
            </div>
          </div>
        </div>

        {/* Medium layout (768px - 1023px) */}
        <div className='hidden md:flex lg:hidden relative h-[680px] w-full justify-center items-center'>
          {/* Top Center - Director */}
          <div className='absolute top-0 left-1/2 transform -translate-x-1/2'>
            <div className='w-56 h-72'>
              <TeamCard
                name='Dimas Bagus'
                role='CDSI'
                description='Creative Design & System Information'
                imgSrc={dimasBagusImg}
                isDirector={true}
              />
            </div>
          </div>

          {/* Left Middle */}
          <div className='absolute top-1/2 left-[0%] transform -translate-y-1/2'>
            <div className='w-56 h-68'>
              <TeamCard
                name='Juliananda Fahreza'
                role='VAD'
                description='Visual Art & Design'
                imgSrc={julianandaFahrezaImg}
                isDirector={false}
              />
            </div>
          </div>

          {/* Right Middle */}
          <div className='absolute top-1/2 right-[0%] transform -translate-y-1/2'>
            <div className='w-54 h-68'>
              <TeamCard
                name='Jihan Izra'
                role='DIGMAR'
                description='Digital Marketing'
                imgSrc={jihanIzraImg}
                isDirector={false}
              />
            </div>
          </div>

          {/* Bottom Center */}
          <div className='absolute bottom-10 left-1/2 transform -translate-x-1/2'>
            <div className='w-56 h-72'>
              <TeamCard
                name='Kartika Putri'
                role='SI'
                description='System Information'
                imgSrc={kartikaPutriImg}
                isDirector={false}
              />
            </div>
          </div>
        </div>

        {/* Tablet layout */}
        <div className='hidden sm:flex md:hidden relative h-[580px] w-full justify-center items-center'>
          {/* Top Center - Director */}
          <div className='absolute top-0 left-1/2 transform -translate-x-1/2'>
            <div className='w-[190px] h-[230px]'>
              <TeamCard
                name='Dimas Bagus'
                role='CDSI'
                description='Creative Design & System Information'
                imgSrc={dimasBagusImg}
                isDirector={true}
              />
            </div>
          </div>

          {/* Left Middle */}
          <div className='absolute top-1/2 left-[5px] transform -translate-y-1/2'>
            <div className='w-[190px] h-[270px]'>
              <TeamCard
                name='Juliananda Fahreza'
                role='VAD'
                description='Visual Art & Design'
                imgSrc={julianandaFahrezaImg}
                isDirector={false}
              />
            </div>
          </div>

          {/* Right Middle */}
          <div className='absolute top-1/2 right-[5px] transform -translate-y-1/2'>
            <div className='w-[190px] h-[270px]'>
              <TeamCard
                name='Jihan Izra'
                role='DIGMAR'
                description='Digital Marketing'
                imgSrc={jihanIzraImg}
                isDirector={false}
              />
            </div>
          </div>

          {/* Bottom Center */}
          <div className='absolute bottom-16 left-1/2 transform -translate-x-1/2'>
            <div className='w-[190px] h-[230px]'>
              <TeamCard
                name='Kartika Putri'
                role='SI'
                description='System Information'
                imgSrc={kartikaPutriImg}
                isDirector={false}
              />
            </div>
          </div>
        </div>

        {/* Mobile layout */}
        <div className='flex flex-col items-center sm:hidden gap-12'>
          {/* Director first on mobile */}
          <div className='w-56 h-64'>
            <TeamCard
              name='Dimas Bagus'
              role='CDSI'
              description='Creative Design & System Information'
              imgSrc={dimasBagusImg}
              isDirector={true}
            />
          </div>

          {/* VAD Manager */}
          <div className='w-56 h-64'>
            <TeamCard
              name='Juliananda Fahreza'
              role='VAD'
              description='Visual Art & Design'
              imgSrc={julianandaFahrezaImg}
              isDirector={false}
            />
          </div>

          {/* SI Manager */}
          <div className='w-56 h-64'>
            <TeamCard
              name='Kartika Putri'
              role='SI'
              description='System Information'
              imgSrc={kartikaPutriImg}
              isDirector={false}
            />
          </div>

          {/* DIGMAR Manager */}
          <div className='w-56 h-64'>
            <TeamCard
              name='Jihan Izra'
              role='DIGMAR'
              description='Digital Marketing'
              imgSrc={jihanIzraImg}
              isDirector={false}
            />
          </div>
        </div>
      </div>

      {/* Staff of Visual Art & Design */}
      <SectionTitle>Staff of Visual Art & Design</SectionTitle>
      <div className='container mx-auto px-4 py-6 sm:py-8'>
        {/* Row 1 */}
        <div className='flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10'>
          <div className='w-56 h-64 sm:w-48 md:w-56 lg:w-64 sm:h-64 md:h-80'>
            <TeamCard
              name='Salasbila Zahra'
              role='Graphic Designer'
              isStaff={true}
              imgSrc={salasbilaZahraImg}
            />
          </div>
          <div className='w-56 h-64 sm:w-48 md:w-56 lg:w-64 sm:h-64 md:h-80'>
            <TeamCard
              name='Bintang Fajri'
              role='Graphic Designer'
              isStaff={true}
              imgSrc={bintangFajriImg}
            />
          </div>
          <div className='w-56 h-64 sm:w-48 md:w-56 lg:w-64 sm:h-64 md:h-80'>
            <TeamCard
              name='Tsabita Nabila'
              role='Graphic Designer'
              isStaff={true}
              imgSrc={tsabitaNabilaImg}
            />
          </div>
        </div>
        {/* Row 2 */}
        <div className='flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mt-6 sm:mt-10'>
          <div className='w-56 h-64 sm:w-48 md:w-56 lg:w-64 sm:h-64 md:h-80'>
            <TeamCard
              name='Tavita Narazelda'
              role='Videographer'
              isStaff={true}
              imgSrc={tavitaNarazeldaImg}
            />
          </div>
          <div className='w-56 h-64 sm:w-48 md:w-56 lg:w-64 sm:h-64 md:h-80'>
            <TeamCard
              name='Revalina Arilya'
              role='Videographer'
              isStaff={true}
              imgSrc={revalinaArilyaImg}
            />
          </div>
        </div>
      </div>

      {/* Staff of Digital Marketing */}
      <SectionTitle>Staff of Digital Marketing</SectionTitle>
      <div className='container mx-auto px-4 py-6 sm:py-8'>
        {/* Row 1 */}
        <div className='flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10'>
          <div className='w-56 h-64 sm:w-48 md:w-56 lg:w-64 sm:h-64 md:h-80'>
            <TeamCard
              name='Anita Margareth'
              role='Social Media Specialist'
              isStaff={true}
              imgSrc={anitaMargarethImg}
            />
          </div>
          <div className='w-56 h-64 sm:w-48 md:w-56 lg:w-64 sm:h-64 md:h-80'>
            <TeamCard
              name='Hilma Sakinah'
              role='Social Media Specialist'
              isStaff={true}
              imgSrc={hilmaSakinahImg}
            />
          </div>
        </div>
        {/* Row 2 */}
        <div className='flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mt-6 sm:mt-10'>
          <div className='w-56 h-64 sm:w-48 md:w-56 lg:w-64 sm:h-64 md:h-80'>
            <TeamCard
              name='Tsamara Qaanita'
              role='Copywriter'
              isStaff={true}
              imgSrc={tsamaraQaanitaImg}
            />
          </div>
          <div className='w-56 h-64 sm:w-48 md:w-56 lg:w-64 sm:h-64 md:h-80'>
            <TeamCard
              name='Keysha Audria'
              role='Copywriter'
              isStaff={true}
              imgSrc={keyshaAudriaImg}
            />
          </div>
        </div>
      </div>

      {/* Staff of System Information */}
      <SectionTitle>Staff of System Information</SectionTitle>
      <div className='container mx-auto px-4 py-6 sm:py-8'>
        {/* Row 1 */}
        <div className='flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10'>
          <div className='w-56 h-64 sm:w-48 md:w-56 lg:w-64 sm:h-64 md:h-80'>
            <TeamCard
              name='Moch Zoel Reianda'
              role='UI/UX Designer'
              isStaff={true}
              imgSrc={zoelReiandaImg}
            />
          </div>
          <div className='w-56 h-64 sm:w-48 md:w-56 lg:w-64 sm:h-64 md:h-80'>
            <TeamCard
              name='Nasywa Anggita'
              role='Frontend Developer'
              isStaff={true}
              imgSrc={nasywaAnggitaImg}
            />
          </div>
        </div>
        {/* Row 2 */}
        <div className='flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mt-6 sm:mt-10'>
          <div className='w-56 h-64 sm:w-48 md:w-56 lg:w-64 sm:h-64 md:h-80'>
            <TeamCard
              name='Muhammad Makinul'
              role='Backend Developer'
              isStaff={true}
              imgSrc={muhammadMakinulImg}
            />
          </div>
          <div className='w-56 h-64 sm:w-48 md:w-56 lg:w-64 sm:h-64 md:h-80'>
            <TeamCard
              name='Wafiy Anwarul'
              role='Fullstack Developer'
              isStaff={true}
              imgSrc={wafiyAnwarulImg}
            />
          </div>
        </div>
      </div>

      {/* Jobdesc Section */}
      <div className='container mx-auto px-4'>
        {/* Title container */}
        <div className='mb-6'>
          <div className='border-2 border-cyan-500 rounded-full text-cyan-500 text-center py-3 px-6'>
            <span className='font-medium text-lg'>Jobdesc</span>
          </div>
        </div>

        {/* Responsive Jobdesc Section */}
        <div className='space-y-6 sm:space-y-0 sm:grid sm:grid-cols-2 md:grid-cols-3 sm:gap-6'>
          {/* Visual Art & Design */}
          <div className='flex flex-col'>
            <div className='border-2 border-cyan-500 rounded-full text-cyan-500 text-center py-3 px-6 mb-4'>
              <span className='font-medium'>Visual Art & Design</span>
            </div>
            <div className='flex-1 p-4 bg-white shadow-sm rounded-lg border border-gray-100'>
              <p className='text-gray-600 text-justify leading-relaxed'>
                Bertanggung jawab dalam mengolah segala bentuk publikasi yang
                dibutuhkan oleh IFL Chapter Malang, pembuatan logo acara,
                proposal, dokumentasi, after movie, dan segala bentuk
                visualisasi, serta kepemilikan data dokumentasi program maupun
                project secara lengkap.
              </p>
            </div>
          </div>

          {/* Digital Marketing */}
          <div className='flex flex-col'>
            <div className='border-2 border-cyan-500 rounded-full text-cyan-500 text-center py-3 px-6 mb-4'>
              <span className='font-medium'>Digital Marketing</span>
            </div>
            <div className='flex-1 p-4 bg-white shadow-sm rounded-lg border border-gray-100'>
              <p className='text-gray-600 text-justify leading-relaxed'>
                Bertanggung jawab dalam menyusun konsep strategi pemaksimalan
                penggunaan social media IFL Chapter Malang, melakukan digital
                campaign, menyusun timeline jadwal publikasi, membuat content
                writing dan wording, serta press release kegiatan IFL Chapter
                Malang.
              </p>
            </div>
          </div>

          {/* System Information */}
          <div className='flex flex-col'>
            <div className='border-2 border-cyan-500 rounded-full text-cyan-500 text-center py-3 px-6 mb-4'>
              <span className='font-medium'>System Information</span>
            </div>
            <div className='flex-1 p-4 bg-white shadow-sm rounded-lg border border-gray-100'>
              <p className='text-gray-600 text-justify leading-relaxed'>
                Bertanggung jawab dalam penyusunan standar pengembangan sistem
                informasi dan pemanfaatan data, perancangan, analisis kebutuhan,
                pengembangan, dan pemeliharaan website resmi IFL Chapter Malang.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cdsi
