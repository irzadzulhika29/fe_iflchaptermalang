import { useLogin, useLoginGoogle } from "../../features/authentication";

import { useForm } from "react-hook-form";

import { google } from "../../assets/icons";

import { Envelope } from "@phosphor-icons/react";

import AuthBackgroundLayout from "../../layouts/authentication";
import HelmetLayout from "../../layouts/helmet";

import { Button, Links } from "../../components/button";
import { InputAuth, InputPasswordAuth } from "../../components/input";
import Icon from "../../components/icon";

const Link = (
  <Links ariaLabel="register" to="/daftar" intent="secondary" className="!no-underline !text-sm">
    daftar disini!
  </Links>
);

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useLogin();

  const { data } = useLoginGoogle();

  const onSubmit = (data) => {
    const { email_login: email, password_login: password } = data;
    const body = { email, password };
    mutate(body);
  };

  const handleButtonLoginGoogle = (e) => {
    e.preventDefault();
    window.location.href = data;
  };

  return (
    <AuthBackgroundLayout>
      <HelmetLayout
        title={`Masuk | Indonesian Future Leaders Chapter Malang`}
        description="Indonesian Future Leaders memberikan akses untuk dapat masuk menggunakan email atau akun google."
        pageLink="/masuk"
        keywords="indonesian future leaders, ifl malang, ifl chapter malang, ifl, masuk, daftar, login, register, verifikasi, verification, kata sandi, password"
      />
      <div className="card_form">
        <form onSubmit={handleSubmit(onSubmit)} className="mb-4 space-y-4">
          <h5 className="text-2xl font-bold text-center text-dark-1">Masuk</h5>
          <menu className="space-y-2 text-sm text-center text-dark-1">
            <li>Jika anda belum ada akun untuk login</li>
            <li>Anda dapat {Link}</li>
          </menu>

          <InputAuth
            register={register}
            type="email"
            title="Email"
            name="email_login"
            placeholder="Masukkan email anda"
            icon={<Envelope size={24} weight="bold" />}
          />
          {errors.email_login && <small className="text-red-600">{errors.email_login?.message}</small>}

          <InputPasswordAuth register={register} title="Kata Sandi" name="password_login" placeholder="Masukkan kata sandi anda" />
          {errors.password_login && <small className="text-red-600">{errors.password_login?.message}</small>}

          <div className="flex justify-end">
            <Links to="/lupa-kata-sandi" ariaLabel="forgot-password" intent="underline" className="!text-xs hover:text-primary-1">
              Lupa Kata Sandi?
            </Links>
          </div>

          <Button disabled={isPending} ariaLabel="submit-form" type="submit" intent={isPending ? "load" : "secondary"} className="!w-full !mt-8">
            {isPending ? "Tunggu sebentar..." : "Masuk"}
          </Button>
          <p className="font-semibold text-center">ATAU</p>
        </form>
        <Button ariaLabel="sign-in-google" onClick={handleButtonLoginGoogle} intent="google">
          <Icon src={google} description="google" size="very_small" />
          Masuk dengan akun Google
        </Button>
      </div>
    </AuthBackgroundLayout>
  );
};

export default LoginPage;

{
  /* <div className="flex items-center">
  <input id="remember" type="checkbox" className="w-4 h-4 accent-primary-1" />
  <label htmlFor="remember" className="ml-2 text-xs font-medium text-dark-1">
    Remember me
  </label>
</div>; */
}
