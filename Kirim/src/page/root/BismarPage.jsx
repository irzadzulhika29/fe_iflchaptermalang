import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

import Bismar from "../../layouts/about/Bismar";
import HelmetLayout from "../../layouts/helmet";

const BismarPage = () => {
  return (
    <div className="inner_body">
      <HelmetLayout
        title="Tentang Kami | Indonesian Future Leaders Chapter Malang"
        description="Indonesian Future Leaders berdiri secara resmi sebagai sebuah Lembaga Swadaya Masyarakat yang digerakkan oleh kaum muda, pada tahun 2009, oleh sekelompok anak muda berusia 17-18 tahun."
        pageLink="/bismar"
        keywords="indonesian future leaders, ifl malang, ifl chapter malang, ifl, tentang kami, about, Bismar, creative design and system information"
      />
      <Navbar />
      <Bismar />
      <Footer />
    </div>
  );
};

export default BismarPage;
