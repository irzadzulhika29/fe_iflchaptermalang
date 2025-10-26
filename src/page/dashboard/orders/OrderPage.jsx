import * as React from "react";

import { Funnel } from "@phosphor-icons/react";

import Dashboard from "../../../layouts/dashboard";

import { Links } from "../../../components/button";
import Label from "../../../components/label";
import FilterDropdown from "../../../components/dropdown/Filter";

import { formatDate } from "../../../utils/formatDate";
import { dataOrder } from "../../../static/temp";

const Table = ({ data }) => {
  return (
    <div className="relative mt-4 overflow-x-auto border rounded">
      <table className="w-full text-sm text-left rtl:text-right text-dark-1">
        <thead className="uppercase text-dark-1 bg-light-2">
          <tr className="text-base uppercase">
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              name
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              item name
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              item
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              price
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              notes
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              status
            </th>
            <th scope="col" className="px-6 py-3 sr-only">
              details
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="duration-300 border-b bg-light-1">
              <th scope="row" className="px-6 py-4 font-medium text-dark-2 whitespace-nowrap">
                {item.name}
              </th>
              <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
              <td className="px-6 py-4">{item.total}</td>
              <td className="px-6 py-4">{item.amount}</td>
              <td className="px-6 py-4">{item.notes}</td>
              <td className="px-6 py-4">
                <Label intent={item.status} text={item.status} />
              </td>
              <td className="px-6 py-4">
                <Links intent="secondary" className="text-sm">
                  Details
                </Links>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const OrderPage = () => {
  const [isPopoverOpen, setPopoverOpen] = React.useState(false);
  const [filteredOrder, setFilteredOrder] = React.useState("All");

  const status = ["All", "Completed", "Canceled"];

  const filteredOrders = dataOrder.filter((item) => {
    return item.status === filteredOrder;
  });

  const detail = <p className="text-xs text-gray-500">Last updated at: {formatDate(new Date())}</p>;

  return (
    <Dashboard title="Order Lists" detail={detail}>
      <div className="flex items-center h-full gap-4 mt-4 border border-gray-300 divide-x divide-gray-300 rounded-lg w-max">
        <span className="hidden py-2 pl-4 sm:block">
          <Funnel size={20} />
        </span>
        <span className="hidden py-2 pl-4 font-bold sm:block">Filter By</span>
        <FilterDropdown
          isPopoverOpen={isPopoverOpen}
          setFiltered={setFilteredOrder}
          setPopoverOpen={setPopoverOpen}
          filtered={filteredOrder}
          title="Order Type"
          typeList={status}
          loading={true}
        />
      </div>
      <Table data={filteredOrder === "All" ? dataOrder : filteredOrders} />
    </Dashboard>
  );
};

export default OrderPage;
