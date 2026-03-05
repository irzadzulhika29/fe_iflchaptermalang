import { useGetAllUsers } from "../../features/profile";
import { useGetTotalDonation } from "../../features/donation";
import { useGetAllBlogs } from "../../features/blog";

import { TrendUp } from "@phosphor-icons/react";

import { canceled, donations, orders, users } from "../../assets/icons";

import Dashboard from "../../layouts/dashboard";

import Icon from "../../components/icon";
import Label from "../../components/label";
import Loading from "../../components/loader";

import { formatCurrency } from "../../utils/formatCurrency";
import { formatDateAndTime } from "../../utils/formatDate";

const Menu = ({ dataUsers, sumDonation, sumBlogs }) => {
  const listMenu = [
    { title: "Total Users", icon: users, value: dataUsers?.length || 0, gap: `${19}%` },
    { title: "Total Orders", icon: orders, value: 0, gap: `${8}%` },
    { title: "Donations Collected", icon: donations, value: `Rp. ${formatCurrency(sumDonation || 0)}`, gap: `${50}%` },
    { title: "Total Article", icon: canceled, value: sumBlogs?.length || 0, gap: `${15}%` },
  ];

  return (
    <ul className="flex flex-wrap items-center justify-between gap-4 mt-4">
      {listMenu.map((item, index) => {
        return (
          <li key={index} className="flex-1 p-4 space-y-2 border rounded-2xl w-52 bg-light-1">
            <span className="flex justify-between gap-2">
              <div className="space-y-2">
                <p className="text-xs font-semibold whitespace-nowrap">{item.title}</p>
                <p className="font-bold whitespace-nowrap">{item.value}</p>
              </div>
              <div className="flex items-center min-w-max">
                <Icon src={item.icon} description={item.title} size="medium" />
              </div>
            </span>
            {item.title !== "Total Orders" ? (
              <span className="flex gap-1 text-xs">
                <TrendUp size={20} className="text-green-400" />
                <p className="text-green-400">{item.gap}</p>
                <p className="whitespace-nowrap">Up from yesterday</p>
              </span>
            ) : (
              <span className="text-xs">Upcoming Todo</span>
            )}
          </li>
        );
      })}
    </ul>
  );
};

const Table = ({ dataUsers }) => {
  return (
    <div className="relative mt-4 overflow-x-auto border rounded">
      {!dataUsers?.length ? (
        <h1 className="m-8 text-3xl font-semibold text-center text-gray-400">Not found users in the database</h1>
      ) : (
        <table className="w-full text-sm text-left rtl:text-right text-dark-1">
          <thead className="uppercase text-dark-1 bg-light-2">
            <tr className="text-base uppercase">
              <th scope="col" className="px-6 py-3">
                email
              </th>
              <th scope="col" className="px-6 py-3">
                username
              </th>
              <th scope="col" className="px-6 py-3">
                role
              </th>
            </tr>
          </thead>
          <tbody>
            {dataUsers?.map((item, index) => (
              <tr key={index} className="border-b bg-light-1">
                <th scope="row" className="px-6 py-4 font-medium text-dark-2 whitespace-nowrap">
                  {item.email}
                </th>
                <td className="px-6 py-4 whitespace-nowrap">{item.username}</td>
                <td className="px-6 py-4">
                  <Label intent={item.role} text={item.role} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const DashboardPage = () => {
  const { data: dataUsers, isLoading } = useGetAllUsers();

  const { data: sumDonation } = useGetTotalDonation();

  const { data: sumBlogs } = useGetAllBlogs();

  const latest = [
    new Date(dataUsers?.latest_update || new Date()),
    new Date(sumBlogs?.latest_update || new Date()),
    new Date(sumDonation?.latest_update || new Date()),
  ];

  const findLatest = latest.sort((a, b) => b.getTime() - a.getTime());

  const detail = <p className="text-sm text-gray-500">Last updated at: {formatDateAndTime(findLatest[0])}</p>;
  return (
    <Dashboard title="Dashboard" detail={detail}>
      <Menu dataUsers={dataUsers?.users} sumDonation={sumDonation?.total_donation} sumBlogs={sumBlogs?.blogs} />
      <h1 className="mt-4 text-xl font-semibold">Users Lists</h1>
      {isLoading ? <Loading height={100} width={100} className="m-10" /> : <Table dataUsers={dataUsers?.users} />}
    </Dashboard>
  );
};

export default DashboardPage;
