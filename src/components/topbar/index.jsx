import * as React from "react";

import { CloseMenu } from "../../utils/closeMenu";

import { CaretDown, List } from "@phosphor-icons/react";

import { Button } from "../button";
import Icon from "../icon";

import { default_user_profile } from "../../assets";
import ProfileSkeleton from "../skeleton/ProfileSkeleton";
import ProfileDropdown from "../dropdown/Profile";

const ProfilePicture = ({ data, isPopoverOpen, setPopoverOpen, isLoading }) => {
  if (isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="flex items-center gap-2 cursor-pointer" onClick={() => setPopoverOpen(!isPopoverOpen)}>
      <Icon src={data?.profile_picture || default_user_profile} className="rounded-full" size="medium" description="user-profile" />
      <div>
        <p className="text-sm font-bold sm:text-base">{data?.username || ""}</p>
        <p className="text-xs tracking-tight sm:text-sm">{data?.role || ""}</p>
      </div>
      <button className={`p-0.5 border rounded-full duration-300 ${isPopoverOpen && "rotate-180"}`}>
        <CaretDown size={16} />
      </button>
    </div>
  );
};

const EventsClickDropdown = ({ isPopoverOpen, handleLogout, setPopoverOpen, isPending, data, isLoading }) => {
  const dropdownRef = React.useRef(null);

  CloseMenu({ setPopoverOpen, dropdownRef });

  return (
    <div ref={dropdownRef} className="relative flex">
      <ProfilePicture data={data} isPopoverOpen={isPopoverOpen} setPopoverOpen={setPopoverOpen} isLoading={isLoading} />
      {isPopoverOpen && <ProfileDropdown handleLogout={handleLogout} isPending={isPending} data={data} type="dashboard" />}
    </div>
  );
};

const TopBar = ({ openNav, setOpenNav, data, isLoading, mutate, isPending }) => {
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="sticky top-0 z-50 block w-full duration-300 shadow bg-light-1 text-dark-1">
      <div className="flex justify-between p-2 mx-6">
        <div className="flex gap-4">
          <Button size="small" className="z-20 lg:hidden" onClick={() => setOpenNav(!openNav)} ariaLabel="list">
            <List size={28} />
          </Button>
        </div>
        <div className="flex gap-4">
          <EventsClickDropdown
            isPopoverOpen={isPopoverOpen}
            setPopoverOpen={setIsPopoverOpen}
            data={data}
            isLoading={isLoading}
            handleLogout={handleLogout}
            isPending={isPending}
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
