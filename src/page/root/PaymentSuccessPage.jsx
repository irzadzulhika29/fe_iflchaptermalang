import { useEffect } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

import { useGetDonationPaymentSuccess } from "../../features/donation/services";

import { success, failed, pending } from "../../assets/icons";

import Background from "../../components/background";
import Footer from "../../components/footer";
import Icon from "../../components/icon";
import Navbar from "../../components/navbar";
import { Button } from "../../components/button";
import HelmetLayout from "../../layouts/helmet";

const detailInfo = (key, value) => {
  return (
    <div className="flex justify-between w-full text-sm text-dark-1">
      <p className="flex-shrink-0 text-gray-400">{key}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
};

const Card = ({ data, status }) => {
  return (
    <div className="items-center card !max-w-md">
      <div className="flex flex-col items-center w-full gap-2 py-4 border-b-2 border-dashed border-dark-1">
        <Icon src={status === "settlement" ? success : status === "pending" ? pending : failed} description="information-payment" size="large" />
        <h1 className="text-xl font-semibold">Payment {data?.donation_status}</h1>
      </div>
      <menu className="w-full my-4 space-y-2">
        {detailInfo("Name", data?.name)}
        {detailInfo("Payment Status", data?.donation_status)}
        {detailInfo("Date", data?.date)}
        {detailInfo("Time", data?.time)}
        {data?.payment_method && detailInfo("Payment Method", data?.payment_method)}
        {detailInfo("Amount", data?.donation_amount)}
      </menu>
      <div className="flex w-full gap-4">
        <a href="/" aria-label="navigate-home" className="w-full">
          <Button intent="secondary" className="!w-full">
            Back to home
          </Button>
        </a>
        {status !== "settlement" && (
          <a href={data?.payment_url} className="w-full" target="_blank" rel="noreferrer">
            <Button>Complete payment</Button>
          </a>
        )}
      </div>
    </div>
  );
};

const PaymentSuccessPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const id = params.get("order_id");
  const status = params.get("transaction_status");

  const { data } = useGetDonationPaymentSuccess(id);

  useEffect(() => {
    if (id !== data?.id && !status) navigate("/404");
  }, [navigate, id, status, data]);

  return (
    <div className="inner_body">
      <HelmetLayout
        title={`Donasi ${status || null} | Indonesian Future Leaders Chapter Malang`}
        description="Halaman ini digunakan hanya untuk melihat invois pembayaran pada donasi yang diadakan indonesian future leaders"
        pageLink="/donasi/pembayaran/sukses"
        keywords="indonesian future leaders, ifl malang, ifl chapter malang, ifl, pembayaran sukses, pembayaran berhasil"
      />
      <Navbar />
      <Background
        src="https://ik.imagekit.io/iflmalang/constant-image/backdrop-main.webp"
        className="!justify-center min-h-screen"
        description="Backdrop"
      >
        <Card data={data} status={status} />
      </Background>
      <Footer />
    </div>
  );
};

export default PaymentSuccessPage;
