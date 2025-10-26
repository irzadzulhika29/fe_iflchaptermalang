import { useState } from "react";

import { Eye, EyeSlash, Lock } from "@phosphor-icons/react";

const InputAuth = ({ type, title, name, placeholder, register, icon }) => {
  return (
    <div className="relative">
      <label htmlFor={name} className="text-sm font-medium text-dark-1">
        {title}
      </label>
      <i className="absolute left-0 bottom-2">{icon}</i>
      <input
        {...register(name, {
          required: true,
          maxLength: {
            value: 50,
            message: "Username or email too long",
          },
          pattern: { value: /^[a-zA-Z.!@#$%^&*-=_+ ]+$/i, message: "Please input true username or email." },
        })}
        type={type}
        id={name}
        autoComplete="off"
        className="input_form"
        placeholder={placeholder}
        required
      />
    </div>
  );
};

const InputPasswordAuth = ({ title, name, placeholder, register }) => {
  const [isVisible, setVisible] = useState(false);

  return (
    <div className="relative">
      <label htmlFor={name} className="text-sm font-medium text-dark-1">
        {title}
      </label>
      <i className="absolute left-0 bottom-2">
        <Lock size={24} weight="bold" />
      </i>
      <input
        {...register(name, {
          required: true,
          minLength: {
            value: 8,
            message: "Password Too Short",
          },
          maxLength: {
            value: 25,
            message: "Password Too Long",
          },
        })}
        type={isVisible ? "text" : "password"}
        id={name}
        name={name}
        placeholder={placeholder}
        className="input_form"
        required
      />
      <button type="button" className="absolute right-0 p-1 bottom-1 bg-light-1" onClick={() => setVisible(!isVisible)}>
        {isVisible ? <Eye size={24} weight="bold" /> : <EyeSlash size={24} weight="bold" />}
      </button>
    </div>
  );
};

const InputProfile = ({ title, icon, type, value, handleChangeInput, editIcon, name }) => {
  return (
    <div className="relative">
      <label htmlFor={title} className="text-lg font-medium text-dark-1">
        {title}
      </label>
      <i className="absolute left-0 bottom-2">{icon}</i>
      {title === "Email" && <input type={type} id={title} className="font-medium input_form" value={value} readOnly />}
      {title !== "Email" && (
        <input
          onChange={handleChangeInput}
          type={type}
          id={title}
          name={name}
          placeholder={title}
          className="font-medium input_form"
          defaultValue={value}
          autoComplete="off"
        />
      )}
      {title !== "Email" && <span className="absolute right-0 px-1 py-2 bottom-1 bg-light-1">{editIcon}</span>}
    </div>
  );
};

const Input = ({ type, placeholder, className, value, register, name }) => {
  return (
    <div className={`relative ${className ?? ""}`}>
      <input autoComplete="off" {...register(name)} type={type} className="input_form !px-0" placeholder={placeholder} defaultValue={value} />
    </div>
  );
};

const InputPaymentDonation = ({ title, name, type, value, placeholder, handleChange, isAnonymous }) => {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-semibold text-primary-1">
        <span>
          {title}
          {title !== "Pesan" && !isAnonymous && <strong className="text-red-600">*</strong>}
        </span>
      </label>
      <input
        type={type}
        name={name}
        onChange={handleChange}
        className="bg-gray-200 border border-gray-300 text-dark-1 text-sm rounded-lg focus:ring-primary-1 focus:border-primary-1 block w-full p-2.5 outline-none"
        placeholder={placeholder}
        autoComplete="off"
        defaultValue={value}
      />
    </div>
  );
};

export { InputAuth, InputPasswordAuth, InputProfile, Input, InputPaymentDonation };
