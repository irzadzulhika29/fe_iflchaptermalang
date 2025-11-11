import { useState } from "react";

import { useParams } from "react-router-dom";

import { useGetDonationByCampaignSlug } from "../../../features/donation";

import { Funnel } from "@phosphor-icons/react";

import Dashboard from "../../../layouts/dashboard";

import Label from "../../../components/label";
import FilterDropdown from "../../../components/dropdown/Filter";
import Loading from "../../../components/loader";

import { formatCurrency } from "../../../utils/formatCurrency";

const Table = ({ data }) => {
  return (
    <div className="relative mt-4 overflow-x-auto border rounded">
      {!data?.length ? (
        <h1 className="m-4 text-xl font-semibold text-center text-gray-400">No history has been found in this campaign</h1>
      ) : (
        <table className="w-full text-sm text-left rtl:text-right text-dark-1">
          <thead className="uppercase text-dark-1 bg-light-2">
            <tr className="text-base uppercase">
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                ID
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                name
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                email
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Donation Amount
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                payment method
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                status
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={index} className="duration-300 border-b cursor-pointer bg-light-1 hover:bg-gray-100">
                <th scope="row" className="px-6 py-4 font-medium text-dark-2 whitespace-nowrap">
                  {item?.donation_id}
                </th>
                <td className="px-6 py-4 whitespace-nowrap">{item?.name}</td>
                <td className="px-6 py-4">{item?.email}</td>
                <td className="px-6 py-4">{item?.donation_amount}</td>
                <td className="px-6 py-4">{item?.payment_method}</td>
                <td className="px-6 py-4">
                  <Label intent={item?.status} text={item?.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const DonationHistoryPage = () => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [filteredStatus, setFilteredStatus] = useState("All");

  const { slug } = useParams();

  const status = [{ name: "unpaid" }, { name: "pending" }, { name: "paid" }, { name: "denied" }, { name: "expired" }, { name: "canceled" }];

  const { data: dataDonation, isLoading } = useGetDonationByCampaignSlug(slug);
  console.log('dataDonation', dataDonation);
  const filteredDonations = dataDonation?.donations?.filter((item) => {
    return item.status === filteredStatus;
  });

  const detail = (
    <p className="text-sm text-gray-500">
      Total Donation Amount:{" "}
      <strong className="text-lg sm:text-xl text-primary-1">Rp. {formatCurrency(dataDonation?.campaign?.current_donation)}</strong>
    </p>
  );

  const titleLoad = <div className="w-40 h-8 bg-gray-200 animate-pulse"></div>;

  return (
    <Dashboard title={dataDonation?.campaign?.title || titleLoad} detail={detail}>
      <div className="flex items-center h-full gap-4 mt-4 border border-gray-300 divide-x divide-gray-300 rounded-lg w-max">
        <span className="hidden py-2 pl-4 sm:block">
          <Funnel size={20} />
        </span>
        <span className="hidden py-2 pl-4 font-bold sm:block">Filter By</span>
        <FilterDropdown
          className="!w-40"
          isPopoverOpen={isPopoverOpen}
          setFiltered={setFilteredStatus}
          setPopoverOpen={setPopoverOpen}
          filtered={filteredStatus}
          title="Status Type"
          typeList={status}
        />
      </div>
      {isLoading ? (
        <Loading height={100} width={100} className="m-10" />
      ) : (
        <Table data={filteredStatus === "All" ? dataDonation?.donations : filteredDonations} />
      )}
    </Dashboard>
  );
};

export default DonationHistoryPage;
