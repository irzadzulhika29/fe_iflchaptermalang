import { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useGetCampaignBySlug } from "../../features/campaign";
import { useGetDonationByCampaignSlug } from "../../features/donation";

import SingleDonation from "../../layouts/donate/id";

import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import Loading from "../../components/loader";
import HelmetLayout from "../../layouts/helmet";

const SingleDonationPage = () => {
  const { slug } = useParams();

  const { data: dataCampaign, isLoading } = useGetCampaignBySlug(slug);

  const { data: donators } = useGetDonationByCampaignSlug(slug);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !dataCampaign) navigate("/404");
  }, [navigate, dataCampaign, isLoading]);

  return (
    <div className="inner_body">
      <HelmetLayout
        title={`${dataCampaign?.title || ""} | Indonesian Future Leaders Chapter Malang`}
        description={`Indonesian Future Leaders memiliki acara atau agenda yang berkaitan dengan berdonasi kepada masyarakat yang membutuhkan. Agenda kali ini yaitu berjudul ${
          dataCampaign?.title || ""
        }`}
        pageLink="/donasi/*"
        keywords={`indonesian future leaders, ifl malang, ifl chapter malang, ifl, isu terkini, ifl donasi, donasi, ${dataCampaign?.title || ""}`}
      />
      <Navbar />
      {isLoading ? (
        <Loading height={100} width={100} className="m-20" />
      ) : (
        <SingleDonation dataCampaign={dataCampaign} donators={donators?.donations?.length} />
      )}
      <Footer />
    </div>
  );
};

export default SingleDonationPage;
