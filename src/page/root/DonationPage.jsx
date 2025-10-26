import { useGetAllCampaign } from "../../features/campaign";

import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

import DonateSection from "../../layouts/donate";
import HelmetLayout from "../../layouts/helmet";

const DonationPage = () => {
  const { data: campaignData, isLoading } = useGetAllCampaign();

  return (
    <div className="inner_body">
      <HelmetLayout
        title="Donasi | Indonesian Future Leaders Chapter Malang"
        description="Indonesian Future Leaders memiliki acara atau agenda yang berkaitan dengan berdonasi kepada masyarakat yang membutuhkan. Berdonasi tidak hanya berarti menyerahkan sejumlah uang atau barang kepada seseorang atau organisasi."
        pageLink="/donasi"
        keywords="indonesian future leaders, ifl malang, ifl chapter malang, ifl, isu terkini, ifl donasi, donasi, donation, campaign"
      />
      <Navbar />
      <DonateSection campaignData={campaignData?.campaigns} isLoading={isLoading} />
      <Footer />
    </div>
  );
};

export default DonationPage;
