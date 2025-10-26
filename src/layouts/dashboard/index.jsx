import * as React from "react";

import { useGetProfile } from "../../features/profile";

import { useLocation } from "react-router-dom";

import { useMediaQuery } from "react-responsive";

import Sidebar from "../../components/sidebar";
import TopBar from "../../components/topbar";
import { useLogout } from "../../features/authentication";
import HelmetLayout from "../helmet";

const Dashboard = ({ children, className, title, detail }) => {
  const isTabletMid = useMediaQuery({ query: "(max-width: 1024px)" });

  const [openNav, setOpenNav] = React.useState(isTabletMid ? false : true);

  const { pathname } = useLocation();

  const { data, isLoading } = useGetProfile();

  const { mutate, isPending } = useLogout();

  React.useEffect(() => {
    if (isTabletMid) setOpenNav(false);
    else setOpenNav(true);
  }, [isTabletMid, pathname]);

  const animation = isTabletMid && {
    open: { x: 0, width: "16rem", transition: { damping: 40 } },
    closed: { x: -256, width: 0, transition: { damping: 40, delay: 0.15 } },
  };

  return (
    <div className="relative flex bg-light-1">
      <HelmetLayout
        title="Dashboard | Indonesian Future Leaders Chapter Malang"
        description="Indonesian Future Leaders Dashboard"
        pageLink="/"
        keywords=""
      />
      <Sidebar openNav={openNav} animation={animation} />
      <div onClick={() => setOpenNav(false)} className={`lg:hidden fixed inset-0 h-screen z-100 bg-dark-1/50 ${openNav ? "block" : "hidden"}`} />
      <div className="flex-1 w-full duration-300 lg:pl-64">
        <TopBar openNav={openNav} setOpenNav={setOpenNav} data={data?.data} isLoading={isLoading} mutate={mutate} isPending={isPending} />
        <div className="w-full pt-20 duration-300 sm:pt-14 md:pt-0 text-dark-1">
          <div className="w-full p-4 bg-gray-200">
            <div className={`bg-light-1 p-4 rounded-lg ${className ?? ""}`}>
              <div className="flex flex-col items-center justify-between gap-4 px-2 pb-2 border-b-2 sm:items-end sm:flex-row">
                <h1 className="text-xl font-semibold sm:text-2xl">{title}</h1>
                <>{detail}</>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
