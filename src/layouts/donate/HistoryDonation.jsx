import Container from "../../components/container";
import Image from "../../components/image";

import { formatCurrency } from "../../utils/formatCurrency";
import { formatDateAndTime } from "../../utils/formatDate";
import { makeId } from "../../utils/makeId";

const DonationHistory = ({ dataHistory }) => {
  if (!dataHistory?.length) {
    return <h3 className="py-12 text-2xl font-semibold text-center text-gray-400">There is no history of your donation</h3>;
  }

  return (
    <Container className="max-w-screen-md py-12 space-y-8 border-t-2 border-gray-300">
      <h2 className="text-2xl font-bold text-center uppercase text-primary-1">donation history</h2>
      {dataHistory?.map((item, index) => {
        const status = item?.donation?.status === "paid" ? "bg-green-500" : item?.donation?.status === "pending" ? "bg-yellow-500" : "bg-red-500";
        const shortTitle = item?.campaign?.title
          .toLowerCase()
          .split(/\s/)
          .reduce((response, word) => (response += word.slice(0, 1)), "");
        const uniqueId = makeId(5);
        const id = `${shortTitle}-${item?.donation?.name}-${uniqueId}`;
        return (
          <div key={index} className="donation_card_history">
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <Image
                isLazy
                src={item?.campaign?.image}
                description={item?.campaign?.title}
                className="flex-shrink-0 w-60 sm:w-44 rounded-xl aspect-video"
              />
              <div className="w-full space-y-4 sm:w-max">
                <div className="flex gap-1 text-xs">
                  <p className="text-gray-500 whitespace-nowrap">Donation ID:</p>
                  <p className="font-medium whitespace-nowrap">{id}</p>
                </div>
                <h3 className="text-lg font-semibold md:text-xl">{item?.campaign?.title}</h3>
              </div>
            </div>
            <div className="w-full mt-4 space-y-1 text-center sm:w-max sm:mt-0">
              <div className="flex justify-center w-full gap-1 text-sm sm:w-56">
                <p className="text-gray-500 whitespace-nowrap">Payment Method:</p>
                <p className="font-medium whitespace-nowrap">{item?.donation?.payment_method}</p>
              </div>
              <h4 className="text-2xl font-semibold text-primary-1">Rp. {formatCurrency(item?.donation?.donation_amount)}</h4>
              {item?.donation?.status === "pending" ? (
                <a
                  href={item?.donation?.payment_url}
                  className="text-xs underline duration-300 text-primary-1 hover:text-primary-2 w-max"
                  target="_blank"
                  rel="noreferrer"
                >
                  complete payment
                </a>
              ) : (
                <p className="text-xs font-medium text-gray-500">{formatDateAndTime(item?.donation?.donation_time)}</p>
              )}
            </div>
            <div className={`absolute top-0 right-0 py-1 px-2 text-xs font-medium text-light-1 rounded-es-xl ${status}`}>
              {item?.donation?.status}
            </div>
          </div>
        );
      })}
    </Container>
  );
};

export default DonationHistory;
