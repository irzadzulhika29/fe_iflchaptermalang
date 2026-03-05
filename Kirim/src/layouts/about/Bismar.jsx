import dannyWahyuImg from '../../assets/image/dannyWahyu.png'
import blessingMaranathaImg from '../../assets/image/blessingMaranatha.png'
import deshintaDyanImg from '../../assets/image/deshintaDyan.png'
import mawaPutriImg from '../../assets/image/mawaPutri.png'
import kaelaResyahreinaImg from '../../assets/image/kaelaResyahreina.png'
import indiraCitaImg from '../../assets/image/indiraCita.png'
import farizkiImg from '../../assets/image/muhammadFarizki.png'
import keisyaShafiaImg from '../../assets/image/keisyaShafia.png'
import fitrotunNadifahImg from '../../assets/image/fitrotunNadifah.png'
import habibSyahrulImg from '../../assets/image/habibSyahrul.png'
import putriFriskaImg from '../../assets/image/putriFriska.png'
import alyaAuliaImg from '../../assets/image/alyaAulia.png'
import iffahAlyaImg from '../../assets/image/iffahAlya.png'
import dannyPrastiaImg from '../../assets/image/dannyPrastia.png'
import christselaSantosoImg from '../../assets/image/christselaSantoso.png'

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
          {description && <div className='text-xs italic'>{description}</div>}
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

const Bismar = () => {
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
            className='absolute top-[15%] sm:top-[18%] md:top-[19%] lg:top-[22%] left-0 w-[200%] h-5 sm:h-8 md:h-10 transform -rotate-3 flex items-center'
            style={{ backgroundColor: '#00B4D8', opacity: 0.7 }}
          >
            <div className='flex items-center space-x-2 sm:space-x-3 text-white whitespace-nowrap px-2 sm:px-4'>
              {Array(20)
                .fill(0)
                .map((_, i) => (
                  <div key={`top-${i}`} className='flex items-center'>
                    <span className='text-xs sm:text-base md:text-lg font-medium'>
                      BISMAR
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
            className='absolute bottom-[70%] sm:bottom-[64%] md:bottom-[62%] lg:bottom-[58%] left-0 w-[200%] h-5 sm:h-8 md:h-10 transform rotate-3 flex items-center'
            style={{ backgroundColor: '#1A8FE3', opacity: 0.7 }}
          >
            <div className='flex items-center space-x-2 sm:space-x-3 text-white whitespace-nowrap px-2 sm:px-4'>
              {Array(20)
                .fill(0)
                .map((_, i) => (
                  <div key={`bottom-${i}`} className='flex items-center'>
                    <span className='text-xs sm:text-base md:text-lg font-medium'>
                      BISMAR
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
              Department Business Marketing
            </h1>
          </div>
        </div>

        {/* Description */}
        <div className='container mx-auto mt-10 sm:mt-12 md:mt-16 px-4 sm:px-8 lg:px-16'>
          <p className='text-sm sm:text-base md:text-lg lg:text-xl text-white text-center max-w-4xl mx-auto leading-relaxed'>
            Bertanggung jawab untuk mendukung pemasukan dana IFL Chapter Malang
            melalui berbagai strategi seperti menjalin kerja sama eksternal
            dalam bentuk sponsorship, mengembangkan promosi digital dan
            merchandise, serta mengadakan event baik online maupun offline.
            Divisi ini juga fokus pada pengelolaan media sosial, penggalangan
            dana, dan membangun relasi dengan pihak luar demi kelancaran program
            dan proyek organisasi.
          </p>
        </div>
      </div>

      {/* Team Members Section */}
      <div className='container mx-auto px-4 pt-8 sm:pt-12 md:pt-16'>
        {/* Diamond layout - only visible on large screens */}
        <div className='hidden lg:block relative h-[700px] flex justify-center items-center'>
          {/* Top Middle - Director */}
          <div className='absolute top-0 left-1/2 transform -translate-x-1/2'>
            <div className='w-64 h-80'>
              <TeamCard
                name='Danny Wahyu'
                role='BISMAR'
                description='Business & Marketing'
                imgSrc={dannyWahyuImg}
                isDirector={true}
              />
            </div>
          </div>

          {/* Left Middle */} {/* Sponsorship Manager */}
          <div className='absolute top-[50%] left-[5%] transform -translate-y-1/2'>
            <div className='w-64 h-80'>
              <TeamCard
                name='Blessing Maranatha'
                role='Sponsorship'
                imgSrc={blessingMaranathaImg}
                isDirector={false}
              />
            </div>
          </div>

          {/* Right Middle */} {/* Donation Manager */}
          <div className='absolute top-[50%] right-[5%] ml-50 transform -translate-y-1/2'>
            <div className='w-64 h-80'>
              <TeamCard
                name='Mawa Putri'
                role='Donation & Charity'
                imgSrc={mawaPutriImg}
                isDirector={false}
              />
            </div>
          </div>

          {/* Bottom Middle */} {/* Marketing Exec Manager */}
          <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2'>
            <div className='w-64 h-80'>
              <TeamCard
                name='Deshinta Dyan'
                role='MEPS'
                description='Marketing Executive & Product Specialist'
                imgSrc={deshintaDyanImg}
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
                name='Danny Wahyu'
                role='BISMAR'
                description='Business & Marketing'
                imgSrc={dannyWahyuImg}
                isDirector={true}
              />
            </div>
          </div>

          {/* Left Middle */} {/* Sponsorship Manager */}
          <div className='absolute top-1/2 left-[0%] transform -translate-y-1/2'>
            <div className='w-56 h-68'>
              <TeamCard
                name='Blessing Maranatha'
                role='Sponsorship'
                imgSrc={blessingMaranathaImg}
                isDirector={false}
              />
            </div>
          </div>

          {/* Right Middle */} {/* Donation Manager */}
          <div className='absolute top-1/2 right-[0%] transform -translate-y-1/2'>
            <div className='w-54 h-68'>
              <TeamCard
                name='Mawa Putri'
                role='Donation & Charity'
                imgSrc={mawaPutriImg}
                isDirector={false}
              />
            </div>
          </div>

          {/* Bottom Center */} {/* Marketing Exec Manager */}
          <div className='absolute bottom-10 left-1/2 transform -translate-x-1/2'>
            <div className='w-56 h-72'>
              <TeamCard
                name='Deshinta Dyan'
                role='MEPS'
                description='Marketing Executive & Product Specialist'
                imgSrc={deshintaDyanImg}
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
                name='Danny Wahyu'
                role='BISMAR'
                description='Business & Marketing'
                imgSrc={dannyWahyuImg}
                isDirector={true}
              />
            </div>
          </div>

          {/* Left Middle */} {/* Sponsorship Manager */}
          <div className='absolute top-1/2 left-[5px] transform -translate-y-1/2'>
            <div className='w-[190px] h-[270px]'>
              <TeamCard
                name='Blessing Maranatha'
                role='Sponsorship'
                imgSrc={blessingMaranathaImg}
                isDirector={false}
              />
            </div>
          </div>

          {/* Right Middle */} {/* Donation Manager */}
          <div className='absolute top-1/2 right-[5px] transform -translate-y-1/2'>
            <div className='w-[190px] h-[270px]'>
              <TeamCard
                name='Mawa Putri'
                role='Donation & Charity'
                imgSrc={mawaPutriImg}
                isDirector={false}
              />
            </div>
          </div>

          {/* Bottom Center */} {/* Marketing Exec Manager */}
          <div className='absolute bottom-16 left-1/2 transform -translate-x-1/2'>
            <div className='w-[190px] h-[230px]'>
              <TeamCard
                name='Deshinta Dyan'
                role='MEPS'
                description='Marketing Executive & Product Specialist'
                imgSrc={deshintaDyanImg}
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
              name='Danny Wahyu'
              role='BISMAR'
              description='Business Marketing'
              imgSrc={dannyWahyuImg}
              isDirector={true}
            />
          </div>

          {/* Sponsorship Manager */}
          <div className='w-56 h-64'>
            <TeamCard
              name='Blessing Maranatha'
              role='Sponsorship'
              imgSrc={blessingMaranathaImg}
              isDirector={false}
            />
          </div>

          {/* Marketing Exec Manager */}
          <div className='w-56 h-64'>
            <TeamCard
              name='Deshinta Dyan'
              role='MEPS'
              description='Marketing Executive & Product Specialist'
              imgSrc={deshintaDyanImg}
              isDirector={false}
            />
          </div>

          {/* Donation Manager */}
          <div className='w-56 h-64'>
            <TeamCard
              name='Mawa Putri'
              role='Donation & Charity'
              imgSrc={mawaPutriImg}
              isDirector={false}
            />
          </div>
        </div>
      </div>

      {/* Staff of Sponsorship */}
      <SectionTitle>Staff of Sponsorship</SectionTitle>
      <div className='container mx-auto px-4 py-6 sm:py-8'>
        {/* Row 1 */}
        <div className='flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10'>
          <div className='w-56 h-64 sm:w-48 md:w-56 lg:w-64 sm:h-64 md:h-80'>
            <TeamCard
              name='Kaela Resyahreina'
              role='Staff of Sponsorship'
              isStaff={true}
              imgSrc={kaelaResyahreinaImg}
            />
          </div>
          <div className='w-56 h-64 sm:w-48 md:w-56 lg:w-64 sm:h-64 md:h-80'>
            <TeamCard
              name='Indira Cita'
              role='Staff of Sponsorship'
              isStaff={true}
              imgSrc={indiraCitaImg}
            />
          </div>
        </div>
        {/* Row 2 */}
        <div className='flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mt-6 sm:mt-10'>
          <div className='w-56 h-64 sm:w-48 md:w-56 lg:w-64 sm:h-64 md:h-80'>
            <TeamCard
              name='Keisya Shafia Auliansyah'
              role='Staff of Sponsorship'
              isStaff={true}
              imgSrc={keisyaShafiaImg}
            />
          </div>
        </div>
      </div>

      {/* Staff of Marketing Executive & Product Specialist */}
      <SectionTitle>
        Staff of Marketing Executive & Product Specialist
      </SectionTitle>
      <div className='container mx-auto px-4 py-6 sm:py-8'>
        {/* Row 1 */}
        <div className='flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10'>
          <div className='w-56 h-64 sm:w-48 md:w-56 lg:w-64 sm:h-64 md:h-80'>
            <TeamCard
              name='Fitrotun Nadifah'
              role='Staff of MEPS'
              isStaff={true}
              imgSrc={fitrotunNadifahImg}
            />
          </div>
        </div>
        {/* Row 2 */}
        <div className='flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mt-6 sm:mt-10'>
          <div className='w-56 h-64 sm:w-48 md:w-56 lg:w-64 sm:h-64 md:h-80'>
            <TeamCard
              name='Putri Friska Afrilya'
              role='Staff of MEPS'
              isStaff={true}
              imgSrc={putriFriskaImg}
            />
          </div>
          <div className='w-56 h-64 sm:w-48 md:w-56 lg:w-64 sm:h-64 md:h-80'>
            <TeamCard
              name='Alya Aulia Salsabila'
              role='Staff of MEPS'
              isStaff={true}
              imgSrc={alyaAuliaImg}
            />
          </div>
        </div>
      </div>

      {/* Staff of Donation & Charity */}
      <SectionTitle>Staff of Donation & Charity</SectionTitle>
      <div className='container mx-auto px-4 py-6 sm:py-8'>
        {/* Row 1 */}
        <div className='flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10'>
          <div className='w-56 h-64 sm:w-48 md:w-56 lg:w-64 sm:h-64 md:h-80'>
            <TeamCard
              name='Iffah Alya Mukhbita'
              role='Staff of Donation & Charity'
              isStaff={true}
              imgSrc={iffahAlyaImg}
            />
          </div>
          <div className='w-56 h-64 sm:w-48 md:w-56 lg:w-64 sm:h-64 md:h-80'>
            <TeamCard
              name='Danny Prastia'
              role='Staff of Donation & Charity'
              isStaff={true}
              imgSrc={dannyPrastiaImg}
            />
          </div>
        </div>
        {/* Row 2 - Single centered item */}
        <div className='flex justify-center mt-6 sm:mt-10'>
          <div className='w-56 h-64 sm:w-48 md:w-56 lg:w-64 sm:h-64 md:h-80'>
            <TeamCard
              name='Christsela Santoso'
              role='Staff of Donation & Charity'
              isStaff={true}
              imgSrc={christselaSantosoImg}
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
          {/* Sponsorship */}
          <div className='flex flex-col'>
            <div className='border-2 border-cyan-500 rounded-full text-cyan-500 text-center py-3 px-6 mb-4'>
              <span className='font-medium'>Sponsorship</span>
            </div>
            <div className='flex-1 p-4 bg-white shadow-sm rounded-lg border border-gray-100'>
              <p className='text-gray-600 text-justify leading-relaxed'>
                Bertanggung jawab untuk mengadakan pendanaan secara menyeluruh,
                baik dan menjaga relasi perusahaan sponsor untuk kerjasama saat
                event berjalan di daerah Chapter Malang, baik berupa in kind
                maupun pendanaan program dan project IFL Chapter Malang.
              </p>
            </div>
          </div>

          {/* Marketing Exec & Product Specialist */}
          <div className='flex flex-col'>
            <div className='border-2 border-cyan-500 rounded-full text-cyan-500 text-center py-3 px-6 mb-4'>
              <span className='font-medium'>
                Marketing Exec. & Product Spec.
              </span>
            </div>
            <div className='flex-1 p-4 bg-white shadow-sm rounded-lg border border-gray-100'>
              <p className='text-gray-600 text-justify leading-relaxed'>
                Bertanggung jawab dalam mengembangkan segala media fisik maupun
                barang merchandising untuk promosi branding image dalam
                organisasi, membuat design untuk pengadaan merchandise.
              </p>
            </div>
          </div>

          {/* Donation & Charity */}
          <div className='flex flex-col'>
            <div className='border-2 border-cyan-500 rounded-full text-cyan-500 text-center py-3 px-6 mb-4'>
              <span className='font-medium'>Donation & Charity</span>
            </div>
            <div className='flex-1 p-4 bg-white shadow-sm rounded-lg border border-gray-100'>
              <p className='text-gray-600 text-justify leading-relaxed'>
                Bertanggung jawab dalam perencanaan konsep fundraising dan
                setiap event Chapter Malang, berkolaborasi dalam kaitan kegiatan
                berkarakter sosial IFL Chapter Malang dan melakukan penggalangan
                donasi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Bismar
