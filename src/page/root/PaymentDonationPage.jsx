import { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useGetCampaignBySlug } from "../../features/campaign";
import { useGetProfile } from "../../features/profile";
import { useAddDonationForCampaign } from "../../features/donation";

import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

import DonationPayment from "../../layouts/donate/DonationPayment";
import HelmetLayout from "../../layouts/helmet";

const PaymentDonationPage = () => {
  const { slug } = useParams();

  const { data: dataCampaign, isLoading } = useGetCampaignBySlug(slug);

  const { data: dataProfile } = useGetProfile();

  const { mutate, isPending } = useAddDonationForCampaign();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !dataCampaign) navigate("/404");
  }, [navigate, dataCampaign, isLoading]);

  return (
    <div className="inner_body">
      <HelmetLayout
        title={`${dataCampaign?.title || ""} | Indonesian Future Leaders Chapter Malang`}
        description="Indonesian Future Leaders memiliki acara atau agenda yang berkaitan dengan berdonasi kepada masyarakat yang membutuhkan. Pembayaran donasi pada beberapa agenda yang diadakan IFL Chapter Malang ini bisa melalui transfer maupun scan barcode"
        pageLink="/donasi/*/pembayaran"
        keywords={`indonesian future leaders, ifl malang, ifl chapter malang, ifl, isu terkini, ifl donasi, donasi, pembayaran donasi, ifl berdonasi, ${
          dataCampaign?.title || ""
        }`}
      />
      <Navbar />
      <DonationPayment
        isLoading={isLoading}
        dataCampaign={dataCampaign}
        mutate={mutate}
        isPending={isPending}
        dataProfile={dataProfile?.data}
        slug={slug}
      />
      <Footer />
    </div>
  );
};

export default PaymentDonationPage;
