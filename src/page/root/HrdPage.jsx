import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

import Hrd from "../../layouts/about/Hrd";
import HelmetLayout from "../../layouts/helmet";

const HrdPage = () => {
  return (
    <div className="inner_body">
      <HelmetLayout
        title="Tentang Kami | Indonesian Future Leaders Chapter Malang"
        description="Indonesian Future Leaders berdiri secara resmi sebagai sebuah Lembaga Swadaya Masyarakat yang digerakkan oleh kaum muda, pada tahun 2009, oleh sekelompok anak muda berusia 17-18 tahun."
        pageLink="/hrd"
        keywords="indonesian future leaders, ifl malang, ifl chapter malang, ifl, tentang kami, about, hrd, human resource developement"
      />
      <Navbar />
      <Hrd />
      <Footer />
    </div>
  );
};

export default HrdPage;
