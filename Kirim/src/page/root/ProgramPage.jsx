import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

import HelmetLayout from "../../layouts/helmet";
import ProgramSection from "../../layouts/program";

const ProgramPage = () => {
  return (
    <div className="inner_body">
      <HelmetLayout
        title="Program | Indonesian Future Leaders Chapter Malang"
        description="Indonesian Future Leaders Chapter Malang memiliki kegiatan bernama 'program' yang berkaitan dengan salah satu poin SDGs yaitu good health & well being dan quality education. Pada kegiatan ini memiliki beberapa agenda yaitu ada we care them dan aku pintar"
        pageLink="/program"
        keywords="indonesian future leaders, ifl malang, ifl chapter malang, ifl, we care them, aku pintar, program, ifl program"
      />
      <Navbar />
      <ProgramSection />
      <Footer />
    </div>
  );
};

export default ProgramPage;
