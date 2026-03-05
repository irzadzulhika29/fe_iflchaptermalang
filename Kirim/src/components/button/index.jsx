import { cva } from "class-variance-authority";
import { HashLink } from "react-router-hash-link";

const button = cva("button", {
  variants: {
    intent: {
      primary: "bg-light-1 text-primary-1 rounded-3xl hover:bg-light-2",
      secondary:
        "text-light-1 bg-primary-1 rounded-3xl hover:bg-primary-2",
      navigation:
        "text-light-1 scale-100 hover:scale-110 !text-base lg:!text-lg hover:text-light-2",
      outline:
        "bg-primary-1 text-light-1 border-2 border-primary-1 hover:bg-light-1 hover:text-primary-1 rounded-full",
      donate:
        "text-light-1 border-light-1 border-2 hover:bg-light-1 hover:text-primary-1 ",
      logout: "bg-red-600 hover:bg-red-400 text-light-1 !w-full",
      google:
        "bg-dark-1 text-light-1 !text-sm rounded-full hover:bg-gray-900 flex items-center gap-2 mx-auto",
      details:
        "text-primary-1 hover:text-primary-2 underline inline-block !shadow-none",
      load: "bg-primary-2 rounded-3xl text-light-1 animate-pulse",
      sec :
      "text-light-1 bg-primary-1 rounded-3xl hover:bg-primary-2 px-20",
      explore: "text-light-1 bg-primary-1 rounded-3xl hover:bg-primary-2 px-32",
      underline:
        "bg-light-1 text-dark-1 !shadow-none border-none before:absolute before:-bottom-1 before:left-1/2 before:-translate-x-1/2 before:w-0 before:transition-all before:h-1 before:bg-primary-1 hover:before:w-1/2 hover:text-primary-1",
    },
    size: {
      small: "text-sm py-1 px-3",
      medium: "text-sm py-2 md:text-base px-4",
      large: "text-base sm:text-lg py-2 px-6 md:text-xl md:py-4 md:px-8",
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "medium",
  },
});

const link = cva("link", {
  variants: {
    intent: {
      primary: "text-light-1 hover:text-light-2 underline",
      secondary: "text-primary-1 hover:text-primary-2 underline inline-block",
      dropdown:
        "bg-light-1 text-primary-1 w-full hover:bg-light-2 !text-sm py-1 text-center px-2",
      navigation: "text-light-1 scale-100 hover:text-light-2 hover:scale-110",
    },
  },
  defaultVariants: {
    intent: "primary",
  },
});

export const Button = ({
  className,
  intent,
  size,
  type,
  ariaLabel,
  ...props
}) => (
  <button
    aria-label={`button${ariaLabel ? "-" + ariaLabel : ""}`}
    type={type}
    className={`${button({
      intent,
      size,
      className,
    })} button`}
    {...props}
  />
);

export const Links = ({ className, intent, ariaLabel, ...props }) => (
  <HashLink
    aria-label={`navigate${ariaLabel ? "-" + ariaLabel : ""}`}
    smooth
    className={`${link({
      intent,
      className,
    })} link`}
    {...props}
  />
);
