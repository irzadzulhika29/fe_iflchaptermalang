import { useState } from "react";

const Background = ({ className, src, children, description, isImgFront, isLazy }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <picture className={`relative text-light-1 ${loaded ? "" : "blur-xl"}`}>
      <img
        loading={isLazy ? "lazy" : "eager"}
        srcSet={`${src} 640w, ${src} 750w, ${src} 828w, ${src} 1080w, ${src} 1200w, ${src} 1920w, ${src} 2048w, ${src} 3840w`}
        sizes="100vw"
        src={src}
        alt={description}
        onLoad={() => setLoaded(true)}
        className={`absolute top-0 left-0 object-cover object-center w-full h-full ${isImgFront ? "z-0" : "-z-1"}`}
      />
      <div className={`${className ?? ""} w-full flex flex-col items-center justify-end overflow-hidden z-1`}>{children}</div>
    </picture>
  );
};

export default Background;
