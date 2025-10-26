import { formatCurrency } from "../../../utils/formatCurrency";

const Donation = ({ donations }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Donation</h2>
      <div className="space-y-4">
        {donations.map((donator, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 bg-gray-100 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full" />
              <div>
                <h4 className="text-lg font-semibold">{donator.name}</h4>
                <p className="text-sm text-gray-500">
                  {donator.time} minutes ago
                </p>
              </div>
            </div>
            <div className="text-primary-1 font-semibold">
              {formatCurrency(donator.amount)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Donation;
