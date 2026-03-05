const Container = ({ className, children }) => {
  return <div className={`max-w-container-1 w-full mx-auto my-32 px-4 sm:px-8 ${className ?? ""}`}>{children}</div>;
};

export default Container;
