import { useRegistration } from "../../features/authentication";

import { useForm } from "react-hook-form";

import { Envelope, User } from "@phosphor-icons/react";

import AuthBackgroundLayout from "../../layouts/authentication";
import HelmetLayout from "../../layouts/helmet";

import { Button, Links } from "../../components/button";
import { InputAuth, InputPasswordAuth } from "../../components/input";

const Link = (
  <Links ariaLabel="login" to="/masuk" intent="secondary" className="!no-underline !text-sm">
    masuk disini!
  </Links>
);

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useRegistration();

  const onSubmit = (data) => {
    const { email_register: email, username_register: username, password_register: password, confirmPassword_register: password_confirmation } = data;
    const body = { email, username, password, password_confirmation };
    mutate(body);
  };

  return (
    <AuthBackgroundLayout>
      <HelmetLayout
        title={`Daftar | Indonesian Future Leaders Chapter Malang`}
        description="Indonesian Future Leaders memberikan akses untuk dapat daftar menggunakan email atau akun google."
        pageLink="/daftar"
        keywords="indonesian future leaders, ifl malang, ifl chapter malang, ifl, masuk, daftar, login, register, verifikasi, verification, kata sandi, password"
      />
      <div className="card_form">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h5 className="text-2xl font-bold text-center text-dark-1">Daftar</h5>
          <menu className="space-y-2 text-sm text-center text-dark-1">
            <li>Jika anda sudah ada akun untuk daftar</li>
            <li>Anda dapat {Link}</li>
          </menu>

          <InputAuth
            register={register}
            type="email"
            title="Email"
            name="email_register"
            placeholder="Masukkan email anda"
            icon={<Envelope size={24} weight="bold" />}
          />
          {errors.email_register && <small className="text-red-600">{errors.email_register?.message}</small>}

          <InputAuth
            register={register}
            type="text"
            title="Username"
            name="username_register"
            placeholder="Masukkan nama anda"
            icon={<User size={24} weight="bold" />}
          />
          {errors.username_register && <small className="text-red-600">{errors.username_register?.message}</small>}

          <InputPasswordAuth register={register} title="Kata Sandi" name="password_register" placeholder="Masukkan kata sandi anda" />
          {errors.password_register && <small className="text-red-600">{errors.password_register?.message}</small>}

          <InputPasswordAuth
            register={register}
            title="Konfirmasi Kata Sandi"
            name="confirmPassword_register"
            placeholder="Konfirmasi kata sandi anda"
          />
          {errors.confirmPassword_register && <small className="text-red-600">{errors.confirmPassword_register?.message}</small>}

          <Button disabled={isPending} ariaLabel="submit-form" type="submit" intent={isPending ? "load" : "secondary"} className="!w-full !mt-8">
            {isPending ? "Sedang membuat akun anda..." : "Daftar"}
          </Button>
        </form>
      </div>
    </AuthBackgroundLayout>
  );
};

export default RegisterPage;
