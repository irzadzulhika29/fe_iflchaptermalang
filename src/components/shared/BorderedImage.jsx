export default function BorderedImage({ src, alt }) {
    return (
      <div className="relative w-60 h-40 sm:w-72 sm:h-48 md:w-full md:h-48 rounded-lg overflow-hidden mx-auto">
        <img src={src} alt={alt} className="w-full h-full object-cover" />
        <div className="absolute top-0 right-0 w-20 h-20 border-t-8 border-r-8 border-primary-1 md:w-24 md:h-24"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 border-b-8 border-l-8 border-primary-1 md:w-24 md:h-24"></div>
      </div>
    );
  }