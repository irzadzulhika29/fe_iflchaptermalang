import { cva } from "class-variance-authority";

const label = cva("label", {
  variants: {
    intent: {
      user: "text-orange-600 bg-orange-200",
      admin: "text-cyan-600 bg-cyan-200",
      bismar: "text-purple-600 bg-purple-200",
      copywriter: "text-blue-600 bg-blue-200",
      kemanusiaan: "text-orange-600 bg-orange-200",
      kesehatan: "text-cyan-600 bg-cyan-200",
      pendidikan: "text-purple-600 bg-purple-200",
      tanggap_bencana: "text-blue-600 bg-blue-200",
      denied: "text-red-600 bg-red-200",
      paid: "text-green-600 bg-green-200",
      unpaid: "text-orange-600 bg-orange-200",
      pending: "text-blue-600 bg-blue-200",
      canceled: "text-red-600 bg-red-200",
      expired: "text-gray-700 bg-gray-400",
    },
  },
});

const Label = ({ className, intent, text, ...props }) => (
  <label
    aria-label={`label${text ? "-" + text : ""}`}
    className={`${label({
      intent,
      className,
    })} uppercase text-xs md:text-sm px-4 py-1 rounded-lg w-full h-full font-bold`}
    {...props}
  >
    {text}
  </label>
);

export default Label;
