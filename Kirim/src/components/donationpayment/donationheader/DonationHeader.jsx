import BorderedImage from "./shared/BorderedImage";

export default function DonationHeader({ campaign }) {
  return (
    <div className="flex flex-col items-start gap-4 md:flex-row md:gap-8">
      <BorderedImage 
        src={campaign?.image} 
        alt={campaign?.title} 
      />
      <div className="flex-grow">
        <h1 className="text-lg font-bold text-gray-800 sm:text-xl md:text-2xl">
          Our hands extended in kindness could reach millions of hearts!
        </h1>
        
        <div className="flex gap-2 my-2">
          {campaign?.categories?.map((category, index) => (
            <span
              key={index}
              className={`${
                {
                  kemanusiaan: "bg-orange-200 text-orange-600",
                  kesehatan: "bg-green-200 text-green-600",
                  pendidikan: "bg-purple-200 text-purple-600",
                  "tanggap bencana": "bg-blue-200 text-blue-600",
                }[category] || "bg-gray-200 text-gray-600"
              } px-3 py-2 rounded-full text-sm font-medium`}
            >
              {category}
            </span>
          ))}
        </div>
        
        <p className="text-sm text-gray-600 sm:text-base">
          You're donating to <strong>{campaign?.title}</strong>. The
          fund will benefit <strong>{campaign?.receiver}</strong>.
        </p>
      </div>
    </div>
  );
}