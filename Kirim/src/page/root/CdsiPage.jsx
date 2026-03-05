import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

import Cdsi from "../../layouts/about/Cdsi";
import HelmetLayout from "../../layouts/helmet";

const CdsiPage = () => {
  return (
    <div className="inner_body">
      <HelmetLayout
        title="Tentang Kami | Indonesian Future Leaders Chapter Malang"
        description="Indonesian Future Leaders berdiri secara resmi sebagai sebuah Lembaga Swadaya Masyarakat yang digerakkan oleh kaum muda, pada tahun 2009, oleh sekelompok anak muda berusia 17-18 tahun."
        pageLink="/cdsi"
        keywords="indonesian future leaders, ifl malang, ifl chapter malang, ifl, tentang kami, about, cdsi, creative design and system information"
      />
      <Navbar />
      <Cdsi />
      <Footer />
    </div>
  );
};

export default CdsiPage;
