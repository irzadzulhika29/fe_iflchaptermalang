import { useEffect } from "react";

import { useResendEmail } from "../../features/authentication";

import { useNavigate, useSearchParams } from "react-router-dom";

import { message } from "../../assets/icons";

import { ArrowLeft } from "@phosphor-icons/react";

import AuthBackgroundLayout from "../../layouts/authentication";
import HelmetLayout from "../../layouts/helmet";

import { Button } from "../../components/button";
import Icon from "../../components/icon";

const VerifyPage = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("mail");

  const navigate = useNavigate();

  const { mutate } = useResendEmail();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ email: query });
  };

  useEffect(() => {
    if (!query) {
      navigate("/404");
    }
  }, [navigate, query]);

  return (
    <AuthBackgroundLayout>
      <HelmetLayout
        title={`Verifikasi | Indonesian Future Leaders Chapter Malang`}
        description="Indonesian Future Leaders memberikan konfirmasi untuk memverifikasi email yang digunakan."
        pageLink="/verifikasi"
        keywords="indonesian future leaders, ifl malang, ifl chapter malang, ifl, masuk, daftar, login, register, verifikasi, verification, kata sandi, password"
      />
      <div className="w-full max-w-2xl p-8 space-y-6 text-center bg-light-1 rounded-2xl z-1">
        <Icon src={message} size="logo" className="mx-auto" description="verification-message" />
        <h1 className="mb-2 text-2xl font-bold uppercase">Konfirmasi Akun</h1>
        <p className="text-sm">
          Email konfirmasi akun telah dikirim ke alamat email Anda:<strong>{query}</strong>
        </p>
        <p className="text-sm !mt-0">
          Jika Anda tidak menerima email{" "}
          <button onClick={handleSubmit} className="underline duration-300 text-primary-1 hover:text-primary-2">
            klik disini untuk mengirim ulang
          </button>
        </p>
        <Button onClick={() => navigate("/masuk")} intent="secondary" className="mx-auto">
          <ArrowLeft className="me-1" size={16} /> Masuk
        </Button>
      </div>
    </AuthBackgroundLayout>
  );
};

export default VerifyPage;
