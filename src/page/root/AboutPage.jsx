import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

import HeadAbout from "../../layouts/about/HeadAbout";
import HelmetLayout from "../../layouts/helmet";

const AboutPage = () => {
  return (
    <div className="inner_body">
      <HelmetLayout
        title="Tentang Kami | Indonesian Future Leaders Chapter Malang"
        description="Indonesian Future Leaders berdiri secara resmi sebagai sebuah Lembaga Swadaya Masyarakat yang digerakkan oleh kaum muda, pada tahun 2009, oleh sekelompok anak muda berusia 17-18 tahun."
        pageLink="/tentang-kami"
        keywords="indonesian future leaders, ifl malang, ifl chapter malang, ifl, tentang kami, about"
      />
      <Navbar />
      <HeadAbout />
      <Footer />
    </div>
  );
};

export default AboutPage;
