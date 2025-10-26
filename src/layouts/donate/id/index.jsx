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
    return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
  } else if (diffInMonths > 0) {
    return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
  } else if (diffInDays > 0) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  } else if (diffInHours > 0) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  } else {
    return 'just now';
  }
};

const getDaysRemaining = (endDate) => {
  const today = new Date();
  const end = new Date(endDate);
  const differenceInTime = end - today;
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
  return differenceInDays > 0 ? differenceInDays : 0; // Jika selisih negatif, kembalikan 0
};

const SingleDonation = ({ dataCampaign, donators }) => {
  const navigate = useNavigate();

  console.log("campaign data:", dataCampaign);
  console.log("title", dataCampaign.dataCampaign.title);  // Memastikan title tersedia


  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: dataCampaign.dataCampaign.title,
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

  const isCampaignClosed = new Date(dataCampaign.dataCampaign?.end_date) < new Date();

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
        Published at: {new Date(dataCampaign.dataCampaign?.publish_date).toLocaleString()}
      </div>

      <div className="relative w-full">
        <Image
          src={dataCampaign.dataCampaign?.image}
          className="w-full rounded-xl"
          description={dataCampaign.dataCampaign?.title}
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
        {dataCampaign.dataCampaign?.title || "Campaign Title"}
      </h1>

      <div className="flex flex-wrap gap-2 mt-2">
        {dataCampaign.dataCampaign?.categories?.map((cat, index) => {
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
            Rp {formatCurrency(dataCampaign.dataCampaign?.current_donation)}
          </span>
          <span className="text-gray-500 ml-2">from target</span>
          <span className="text-gray-900 ml-2">
            Rp {formatCurrency(dataCampaign.dataCampaign?.target_donation)}
          </span>
        </div>

        <ProgressBar2
          current_donation={dataCampaign.dataCampaign?.current_donation}
          target_donation={dataCampaign.dataCampaign?.target_donation}
          className="h-2"
        />

        <div className="flex justify-between text-sm text-gray-400 mt-2">
        <p>
          <strong className="text-primary-1">
            {dataCampaign.donaturData?.length || 0}
          </strong> Donators
        </p>
          <p>
            <strong className="text-primary-1">
              {getDaysRemaining(dataCampaign.dataCampaign?.end_date)}
            </strong>{" "}
            days left
          </p>
        </div>

        <Link
          to={`/donasi/${dataCampaign.dataCampaign?.slug}/pembayaran`}
          className={`mt-4 justify-center flex ${
            isCampaignClosed ? "pointer-events-none opacity-50" : ""
          }`}
          aria-label="navigate-payment-donate"
        >
          <Button
            className={`w-1/2 bg-primary-1 text-white py-3 rounded-full text-lg font-semibold hover:bg-primary-2 ${
              isCampaignClosed ? "bg-gray-300 hover:bg-gray-300 cursor-not-allowed" : ""
            }`}
            ariaLabel="donate-now"
            disabled={isCampaignClosed} // Disable button when campaign is closed
          >
            {isCampaignClosed ? "Campaign Closed" : "Donate Now"}
          </Button>
        </Link>
      </div>

      <hr className="border-gray-300 mt-4" />

      <div className="space-y-6">
        <h2 className="text-xl font-bold">Information</h2>
        <DonationTimeline
          openDate={new Date(dataCampaign.dataCampaign?.publish_date).toLocaleDateString(
            "en-GB",
            {
              day: "numeric",
              month: "long",
              year: "numeric",
            }
          )}
          closedDate={new Date(dataCampaign.dataCampaign?.end_date).toLocaleDateString(
            "en-GB",
            {
              day: "numeric",
              month: "long",
              year: "numeric",
            }
          )}
          distributedDate={new Date(
            dataCampaign.dataCampaign?.distributed_date
          ).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        />
        <div className="p-4 bg-yellow-100 text-orange-600 rounded-lg flex items-center space-x-2">
          <WarningCircle size={24} weight="bold" className="text-orange-600" />
          <p className="text-sm">
            This Campaign is still open for donation until{" "}
            {new Date(dataCampaign.dataCampaign?.end_date).toLocaleDateString("en-GB", {
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
          {dataCampaign.dataCampaign?.body || ""}
        </p>
      </div>

      <hr className="border-gray-300 mt-4" />

      <div className="space-y-6">
        <h2 className="text-xl font-bold">Donation</h2>
        <div
          className="flex flex-wrap -mx-2 overflow-y-auto"
          style={{ maxHeight: "200px" }}
        >
          {dataCampaign.donaturData?.map((donator, index) => (
            <div key={index} className="w-full md:w-1/2 px-2 mb-4">
              <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full" />
                  <div>
                    <h4 className="text-lg font-semibold">
                      {donator.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {getRelativeTime(donator.updated_at)}
                    </p>
                  </div>
                </div>
                <div className="text-primary-1 font-semibold">
                  Rp {formatCurrency(donator.donation_amount)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-gray-300 mt-4" />

      <div className="space-y-6">
        <h2 className="text-xl font-bold">Good Prayers</h2>
        <div className="space-y-4 overflow-y-auto" style={{ maxHeight: "400px" }}>
          {dataCampaign.donaturData?.map((prayer, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 p-4 rounded-lg"
            >
              <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0" />
              <div>
                <h4 className="text-lg font-semibold">
                  {prayer.name}
                </h4>
                <p className="text-sm text-gray-500">
                      {getRelativeTime(prayer.updated_at)}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  {prayer.donation_message || "No message"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-gray-300 mt-4" />
    </Container>
  );
};


export default SingleDonation;