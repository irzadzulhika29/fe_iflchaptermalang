import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useForgotPassword } from "../../features/authentication";

import { useForm } from "react-hook-form";

import { ArrowCircleLeft, Envelope } from "@phosphor-icons/react";

import AuthBackgroundLayout from "../../layouts/authentication";
import HelmetLayout from "../../layouts/helmet";

import { Button } from "../../components/button";
import { InputAuth } from "../../components/input";
import Loading from "../../components/loader";

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const navigate = useNavigate();

  const { mutate, isPending } = useForgotPassword();

  const onSubmit = (data) => {
    const { email_forgot_password: email } = data;
    const body = { email };
    mutate(body);
  };

  useEffect(() => {
    if (isSubmitSuccessful) reset({ email_forgot_password: "" });
  }, [isSubmitSuccessful, reset]);

  return (
    <AuthBackgroundLayout>
      <HelmetLayout
        title={`Lupa Kata Sandi | Indonesian Future Leaders Chapter Malang`}
        description="Indonesian Future Leaders memberikan akses untuk dapat mengganti kata sandi pengguna."
        pageLink="/lupa-kata-sandi"
        keywords="indonesian future leaders, ifl malang, ifl chapter malang, ifl, masuk, daftar, login, register, verifikasi, verification, kata sandi, password"
      />
      <div className="card_form">
        {isPending ? (
          <Loading height={100} width={100} />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="relative flex justify-center">
              <Button ariaLabel="back-login" onClick={() => navigate(-1)} className="font-bold !p-1 absolute left-0">
                <ArrowCircleLeft size={24} weight="bold" />
              </Button>
              <h5 className="text-2xl font-bold text-dark-1">Lupa Password</h5>
            </div>

            <InputAuth
              register={register}
              type="email"
              title="Email"
              name="email_forgot_password"
              placeholder="Masukkan email anda"
              icon={<Envelope size={24} weight="bold" />}
            />
            {errors.email_forgot_password && <small className="text-red-600">{errors.email_forgot_password?.message}</small>}

            <Button ariaLabel="submit-form" type="submit" intent="secondary" className="!w-full !mt-8">
              Kirim
            </Button>
          </form>
        )}
      </div>
    </AuthBackgroundLayout>
  );
};

export default ForgotPasswordPage;
