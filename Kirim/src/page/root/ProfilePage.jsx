import { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useGetProfile, useEditProfile } from "../../features/profile";

import ProfileSection from "../../layouts/profile";
import DonationHistory from "../../layouts/donate/HistoryDonation";

import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import Loading from "../../components/loader";
import HelmetLayout from "../../layouts/helmet";

const ProfilePage = () => {
  const { data, isLoading } = useGetProfile();

  const { mutate, isPending } = useEditProfile();

  const { mutate: mutateAboutMe, isPending: aboutMePending } = useEditProfile();

  const { mutate: mutateImage, isPending: imagePending } = useEditProfile();

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && id !== data?.data?.id) navigate("/404");
  }, [id, navigate, data?.data?.id, isLoading]);

  if (isLoading) {
    <Loading className="min-h-screen" height={100} width={100} />;
  }

  return (
    <div className="inner_body">
      <HelmetLayout
        title="Profil | Indonesian Future Leaders Chapter Malang"
        description="Halaman ini berisi deskripsi atau informasi pengguna dari indonesian future leaders chapter malang"
        pageLink="/profil/*"
        keywords="indonesian future leaders, ifl malang, ifl chapter malang, ifl"
      />
      <Navbar />
      <ProfileSection
        imagePending={imagePending}
        mutateImage={mutateImage}
        mutateAboutMe={mutateAboutMe}
        aboutMePending={aboutMePending}
        mutate={mutate}
        isPending={isPending}
        data={data?.data}
      />
      <DonationHistory data={data?.donation} />
      <Footer />
    </div>
  );
};

export default ProfilePage;
