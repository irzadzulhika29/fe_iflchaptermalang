import { cva } from "class-variance-authority";

const backdrop = cva("backdrop", {
  variants: {
    intent: {
      primary: "from-filter-2 to-filter-1",
      secondary: "from-primary-1 from-0% via-transparent via-80% to-light-1 to-100%",
      default: "from-dark-fade to-light-fade",
    },
  },
  defaultVariants: {
    intent: "default",
  },
});

const Backdrop = ({ intent, className, ...props }) => {
  return (
    <figcaption
      className={`${backdrop({
        intent,
        className,
      })} absolute left-0 top-0 w-full h-full bg-gradient-to-t`}
      {...props}
    />
  );
};

export default Backdrop;
