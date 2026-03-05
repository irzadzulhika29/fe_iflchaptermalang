const Image = ({ className, src, description, isLazy, ...props }) => (
  <img
    loading={isLazy ? "lazy" : "eager"}
    srcSet={`${src} 640w, ${src} 750w, ${src} 828w, ${src} 1080w, ${src} 1200w, ${src} 1920w, ${src} 2048w, ${src} 3840w`}
    sizes="100vw"
    src={src}
    alt={`image ${description}`}
    className={`${className ?? ""} transition-all duration-300`}
    {...props}
  />
);

export default Image;
