import { Button } from "../../../components/button";
import InputField from "./shared/InputField";

export default function PersonalInfoForm({
  input,
  dataProfile,
  isAnonymous,
  errors,
  displayDonationAmount,
  refs,
  onInputChange,
  onDonationAmountChange,
  onAnonymousChange,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <InputField
        name="name"
        title="Name"
        placeholder="Enter your name"
        handleChange={onInputChange}
        type="text"
        value={input.name || dataProfile?.username}
        required={!isAnonymous}
        ref={refs.nameRef}
        readOnly={isAnonymous}
        error={errors.name && "Please enter your name"}
      />

      <InputField
        name="email"
        title="Email"
        placeholder="Enter your email"
        handleChange={onInputChange}
        type="email"
        value={input.email || dataProfile?.email}
        required={!isAnonymous}
        ref={refs.emailRef}
        readOnly={false}
        error={errors.email && "Please enter your email"}
      />

      <InputField
        name="phone"
        title="Phone"
        placeholder="Enter your phone"
        handleChange={onInputChange}
        type="number"
        value={input.phone || dataProfile?.phone}
        required={!isAnonymous}
        ref={refs.phoneRef}
        error={errors.phone && "Please enter your phone"}
      />

      <div className="space-y-1" ref={refs.donationAmountRef}>
        <label className="text-black text-sm font-semibold">
          Jumlah Donasi <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="donation_amount"
          value={displayDonationAmount}
          onChange={onDonationAmountChange}
          placeholder="Rp. 0"
          className="w-full py-2 px-4 border border-gray-300 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-primary-1"
        />
      </div>

      <InputField
        name="donation_message"
        title="Good Prayers"
        placeholder="Enter your prayer"
        handleChange={onInputChange}
        type="text"
        value={input.donation_message}
      />

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isAnonymous}
          onChange={onAnonymousChange}
          className="w-4 h-4 text-primary-1 rounded border-gray-300 focus:ring-primary-1"
        />
        <label className="text-sm text-black font-semibold">
          Donate as anonymous
        </label>
      </div>

      <div className="mt-8">
        <Button
          variant="primary"
          type="submit"
          className="w-full py-3 bg-primary-1 text-white border-2 border-transparent hover:bg-white hover:border-primary-1 hover:text-primary-1"
        >
          Next
        </Button>
      </div>
    </form>
  );
}