import { Link, useNavigate } from "react-router-dom";
import { ShareNetwork, WarningCircle, CaretLeft } from "@phosphor-icons/react";
import { user_heart } from "../../../assets/icons";
import Container from "../../../components/container";
import Image from "../../../components/image";
import Icon from "../../../components/icon";
import ProgressBar2 from "../../../components/progressbar2";
import { Button } from "../../../components/button";
import { formatCurrency } from "../../../utils/formatCurrency";
import DonationTimeline from "../../../components/timeline";
import LatestNews from "../../../components/latestnews";

const getRelativeTime = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInMillis = now - date;
  const diffInSeconds = Math.floor(diffInMillis / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInMonths / 12);

  if (diffInYears > 0) {
    return `${diffInYears} ${diffInYears === 1 ? 'Tahun' : 'Tahun'} yang lalu`;
  } else if (diffInMonths > 0) {
    return `${diffInMonths} ${diffInMonths === 1 ? 'Bulan' : 'Bulan'} yang lalu`;
  } else if (diffInDays > 0) {
    return `${diffInDays} ${diffInDays === 1 ? 'Hari' : 'Hari'} yang lalu`;
  } else if (diffInHours > 0) {
    return `${diffInHours} ${diffInHours === 1 ? 'Jam' : 'Jam'} yang lalu`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'Menit' : 'Menit'} yang lalu`;
  } else {
    return 'Baru Saja';
  }
};

const getDaysRemaining = (endDate) => {
  const today = new Date();
  const end = new Date(endDate);
  const differenceInTime = end - today;
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
  return differenceInDays > 0 ? differenceInDays : 0;
};

const SingleDonation = ({ dataCampaign = {}, donatorsCount = 0 }) => {
  const navigate = useNavigate();

  const campaign = dataCampaign.dataCampaign.campaign || dataCampaign || {};
  const safeDonaturData = Array.isArray(dataCampaign.dataCampaign?.donors) ? dataCampaign.dataCampaign.donors : [];

  const filteredDonors = safeDonaturData;
  const filteredPrayers = safeDonaturData.filter(
    (prayer) =>
      prayer?.donation_message &&
      prayer.donation_message.trim() !== ""
  );

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: campaign || "Donation Campaign",
          text: "Check out this donation campaign!",
          url: window.location.href,
        });
        console.log("Share successful");
      } catch (error) {
        console.log("Sharing failed", error);
      }
    } else {
      alert("Sharing is not supported in this browser.");
    }
  };

  const isCampaignClosed = campaign?.end_date
    ? new Date(campaign.end_date) < new Date()
    : false;
  return (
    <Container className="space-y-8 text-dark-1">
      <button
        className="flex items-center gap-2 text-primary-1 text-base font-medium mb-4"
        onClick={() => navigate(-1)}
      >
        <div className="w-7 h-7 flex items-center justify-center bg-primary-1 text-white rounded-full">
          <CaretLeft size={18} weight="bold" className="text-white" />
        </div>
        <span className="font-semibold">Return</span>
      </button>

      <div className="text-sm text-gray-500">
        Published at: {new Date(campaign.publish_date).toLocaleDateString('id-ID', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}, {new Date(campaign.publish_date).toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit'
        })}
      </div>

      <div className="relative w-full">
        <Image
          src={campaign.image || "" || "https://via.placeholder.com/150"}
          className="w-full rounded-xl"
          description={campaign.title}
        />
        <div className="absolute bottom-0 left-0 w-32 h-32 border-b-8 border-l-8 border-primary-1 rounded-bl-3xl"></div>
        <div className="absolute top-0 right-0 w-32 h-32 border-t-8 border-r-8 border-primary-1 rounded-tr-3xl"></div>
      </div>

      <div className="flex justify-between items-start mt-6">
        <div className="flex items-center space-x-4">
          <Icon
            src={user_heart}
            className="w-12 h-12 bg-gray-300 rounded-full"
            size="large"
            description="person-heart"
          />
          <div>
            <h3 className="text-lg font-semibold">Indonesian Future Leaders</h3>
            <p className="text-sm text-gray-500">Fundraiser</p>
          </div>
        </div>

        <div className="text-primary-1 cursor-pointer" onClick={handleShare}>
          <ShareNetwork size={24} weight="bold" />
        </div>
      </div>

      <h1 className="text-2xl font-bold">
        {campaign.title || "Campaign Title"}
      </h1>

      <div className="flex flex-wrap gap-2 mt-2">
        {campaign.categories?.map((cat, index) => {
          let bgColor = "";
          let textColor = "";

          if (cat === "kemanusiaan") {
            bgColor = "bg-orange-100";
            textColor = "text-orange-600";
          } else if (cat === "kesehatan") {
            bgColor = "bg-cyan-100";
            textColor = "text-cyan-600";
          } else if (cat === "pendidikan") {
            bgColor = "bg-purple-100";
            textColor = "text-purple-600";
          } else if (cat === "tanggap bencana") {
            bgColor = "bg-blue-100";
            textColor = "text-blue-600";
          } else {
            bgColor = "bg-gray-100";
            textColor = "text-gray-600";
          }

          return (
            <span
              key={index}
              className={`px-3 py-2 rounded-full ${bgColor} ${textColor} text-sm font-medium`}
            >
              {cat}
            </span>
          );
        })}
      </div>

      <hr className="border-gray-300 mt-4" />

      <div className="space-y-4">
        <div className="text-lg font-medium">Donation Collected</div>
        <div className="flex items-center text-lg font-semibold">
          <span className="text-primary-1">
            Rp {formatCurrency(campaign.total_collected)}
          </span>
          <span className="text-gray-500 ml-2">from target</span>
          <span className="text-gray-900 ml-2">
            Rp {formatCurrency(campaign.target_donation)}
          </span>
        </div>

        <ProgressBar2
          current_donation={campaign.total_collected}
          target_donation={campaign.target_donation}
          className="h-2"
        />

        <div className="flex justify-between text-sm text-gray-400 mt-2">
          <p>
            <strong className="text-primary-1">
              {safeDonaturData.length || 0}
            </strong> Donators
          </p>
          <p>
            <strong className="text-primary-1">
              {getDaysRemaining(campaign.end_date)}
            </strong>{" "}
            days left
          </p>
        </div>

        <Link
          to={`/donasi/${campaign.slug}/pembayaran`}
          className={`mt-4 justify-center flex ${isCampaignClosed ? "pointer-events-none opacity-50" : ""
            }`}
          aria-label="navigate-payment-donate"
        >
          <Button
            className={`w-1/2 bg-primary-1 text-white py-3 rounded-full text-lg font-semibold hover:bg-primary-2 ${isCampaignClosed ? "bg-gray-300 hover:bg-gray-300 cursor-not-allowed" : ""
              }`}
            ariaLabel="donate-now"
            disabled={isCampaignClosed}
          >
            {isCampaignClosed ? "Campaign Closed" : "Donate Now"}
          </Button>
        </Link>
      </div>

      <hr className="border-gray-300 mt-4" />

      <div className="space-y-6">
        <h2 className="text-xl font-bold">Information</h2>
        <DonationTimeline
          openDate={new Date(campaign.publish_date).toLocaleDateString(
            "en-GB",
            {
              day: "numeric",
              month: "long",
              year: "numeric",
            }
          )}
          closedDate={new Date(campaign.end_date).toLocaleDateString(
            "en-GB",
            {
              day: "numeric",
              month: "long",
              year: "numeric",
            }
          )}
          distributedDate={
            campaign.distributed_date
              ? new Date(campaign.distributed_date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
              : "TBA"
          }
        />
        <div className="p-4 bg-yellow-100 text-orange-600 rounded-lg flex items-center space-x-2">
          <WarningCircle size={24} weight="bold" className="text-orange-600" />
          <p className="text-sm">
            This Campaign is still open for donation until{" "}
            {new Date(campaign.end_date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
            . Please read this Campaign Background Story before deciding to
            donate.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Background Story</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          {campaign.body || ""}
        </p>
      </div>

      <hr className="border-gray-300 mt-4" />

      <div className="space-y-6">
        <h2 className="text-xl font-bold">Donation {donatorsCount > 0 && `(${donatorsCount})`}</h2>
        <div
          className="flex flex-wrap -mx-2 overflow-y-auto"
          style={{ maxHeight: "200px" }}
        >
          {filteredDonors.length === 0 ? (
            <div className="w-full text-center py-8">
              <p className="text-gray-400 text-lg">Belum ada donasi untuk campaign ini</p>
            </div>
          ) : (
            filteredDonors.map((donator, index) => (
              <div key={donator?.donation_id || index} className="w-full sm:w-1/2 px-2 mb-4">                <div className="flex justify-between items-center p-4 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div>
                    <h4 className="text-lg font-semibold">
                      {donator?.name || "Anonymous"}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {donator?.donated_at || donator?.created_at
                        ? getRelativeTime(donator.donated_at || donator.created_at)
                        : "Baru Saja"}
                    </p>
                  </div>
                </div>
                <div className="text-primary-1 font-semibold">
                  Rp {formatCurrency(donator?.donation_amount || 0)}
                </div>
              </div>
              </div>
            ))
          )}
        </div>
      </div>

      <hr className="border-gray-300 mt-4" />

      <div className="space-y-6">
        <h2 className="text-xl font-bold">Good Prayers</h2>
        <div className="space-y-4 overflow-y-auto" style={{ maxHeight: "400px" }}>
          {filteredPrayers.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 text-lg">Belum ada doa untuk campaign ini</p>
            </div>
          ) : (
            filteredPrayers.map((prayer, index) => (
              <div
                key={prayer?.donation_id || index}
                className="flex items-start space-x-4 p-4 rounded-lg"
              >
                <div className="flex-1">
                  <h4 className="text-lg font-semibold">
                    {prayer?.name || "Anonymous"}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {prayer?.donated_at || prayer?.created_at
                      ? getRelativeTime(prayer.donated_at || prayer.created_at)
                      : "Baru Saja"}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    {prayer?.donation_message || ""}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <hr className="border-gray-300 mt-4" />
    </Container>
  );
};


export default SingleDonation;