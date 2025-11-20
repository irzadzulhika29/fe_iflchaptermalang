import { Button } from "../../components/button";
import Container from "../../components/container";
import Image from "../../components/image";

const Programs = () => {
  return (
    <Container>
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-wide text-primary-1">
          Program Kerja
        </h2>
        <div className="w-52 sm:w-60 h-1 bg-primary-1"></div>
      </div>

      <div className="flex flex-col items-center gap-16 mt-12">
        <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-12">
          <div className="absolute -z-10 bg-primary-1 rounded-full w-40 h-40 sm:w-56 sm:h-56 opacity-10 top-1/2 -translate-y-1/2 md:left-0"></div>

          <Image
            src="https://ik.imagekit.io/iflmalang/constant-image/programs?updatedAt=1734418500759"
            className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md"
            description="Program Indonesian Future Leaders Malang"
            isLazy
          />
          <div className="flex flex-col gap-4 px-4 md:pl-8">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-dark-1">Programs</h3>
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-500 max-w-4xl text-justify">
              Kegiatan berlandaskan urgensi Sustainable Development Goals yang dilakukan secara periodik dengan jangka waktu tertentu untuk berkontribusi satu arah terhadap kelompok masyarakat bertujuan untuk menyelesaikan atau mengurangi masalah di Malang melalui penerapan 3 pilar aksi IFL Chapter Malang.
            </p>
            <Button
              ariaLabel="program"
              intent="secondary"
              onClick={() => (window.location.href = "/program")}
              className="inline-flex sm:px-20 py-2 rounded-full"
            >
              Explore
            </Button>
          </div>
        </div>

        <div className="relative flex flex-col-reverse md:flex-row items-center gap-6 md:gap-12">
          <div className="absolute -z-10 bg-primary-1 rounded-full w-40 h-40 sm:w-56 sm:h-56 opacity-10 top-1/2 -translate-y-1/2 md:right-0"></div>

          <div className="flex flex-col gap-4 px-4 md:pr-8">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-dark-1">Projects</h3>
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-500 max-w-4xl text-justify">
              Kegiatan berlandaskan urgensi Sustainable Development Goals yang dilakukan secara non-periodik dengan jangka waktu tertentu untuk berkontribusi dua arah dalam menyelesaikan atau mengurangi masalah di Malang melalui penerapan 3 pilar aksi IFL Chapter Malang.
            </p>
            <Button
              ariaLabel="project"
              intent="secondary"
              onClick={() => (window.location.href = "/project")}
              className="inline-flex bg-primary-1 text-white px-12 sm:px-20 py-2 rounded-full hover:bg-primary-2"
            >
              Explore
            </Button>
          </div>
          <Image
            src="https://ik.imagekit.io/iflmalang/constant-image/Group%2019252%20(2).svg?updatedAt=1734500392776"
            className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md"
            description="Project Indonesian Future Leaders Malang"
            isLazy
          />
        </div>
      </div>
    </Container>
  );
};

export default Programs;
