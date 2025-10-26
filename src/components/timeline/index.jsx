const DonationTimeline = ({ openDate, closedDate, distributedDate }) => {
  return (
    <div className="relative w-full">
      <div className="w-full h-2 bg-gray-300 rounded-full mb-24"></div>

      <div className="absolute flex justify-between items-center w-full top-0">
        <div
          className="flex flex-col items-center"
          style={{ transform: "translateY(-8%)" }}
        >
          <div className="w-5 h-5 bg-primary-1 rounded-full"></div>{" "}
          <p className="text-primary-1 mt-4 text-sm font-semibold">
            {openDate}
          </p>
          <p className="text-gray-500 text-sm">Open Donation</p>
        </div>

        <div
          className="flex flex-col items-center"
          style={{ transform: "translateY(-8%)" }}
        >
          <div className="w-5 h-5 bg-primary-1 rounded-full"></div>{" "}
          <p className="text-primary-1 mt-4 text-sm font-semibold">
            {closedDate}
          </p>
          <p className="text-gray-500 text-sm">Closed Donation</p>
        </div>

        <div
          className="flex flex-col items-center"
          style={{ transform: "translateY(-8%)" }}
        >
          <div className="w-5 h-5 bg-primary-1 rounded-full"></div>{" "}
          <p className="text-primary-1 mt-4 text-sm font-semibold">
            {distributedDate}
          </p>
          <p className="text-gray-500 text-sm">Distributed</p>
        </div>
      </div>
    </div>
  );
};

export default DonationTimeline;
