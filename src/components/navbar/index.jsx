import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { useGetProfile } from "../../features/profile";
import { useLogout } from "../../features/authentication";
import { CloseMenu } from "../../utils/closeMenu";
import { CaretDown, List, X } from "@phosphor-icons/react";
import { logo_text } from "../../assets/icons";
import { Button, Links } from "../button";
import Icon from "../icon";
import ProfileDropdown from "../dropdown/Profile";

const aboutUsList = [
  { title: "FOUNDER", path: "/tentang-kami" },
  { title: "NONDEPT", path: "/nondept" },
  { title: "HRD", path: "/hrd" },
  { title: "DPP", path: "/dpp" },
  { title: "COMPER", path: "/comper" },
  { title: "CDSI", path: "/cdsi" },
  { title: "BISMAR", path: "/bismar" },
];

const navList = [
  { title: "Event", path: "/event" },
  { title: "Article", path: "/artikel" },
  { title: "Catalog", path: "/#shop" },
  { title: "Donate", path: "/donasi" },
  { title: "Proposal", path: "/proposal" },
  // { title: "Program", path: "/program" },
];

const AboutUsDropdown = () => {
  const location = useLocation();
  const isActive = aboutUsList.some((item) => location.pathname === item.path);

  return (
    <li className="relative group">
      <Button intent="navigation" className="!p-0 !shadow-none gap-1 relative">
        About Us
        <CaretDown
          size={16}
          className="mt-1 transition-all group-hover:rotate-180"
        />
        <span
          className={`absolute bottom-0 left-0 h-[2px] bg-white transition-all duration-300 ${
            isActive ? "w-full" : "w-0 group-hover:w-full"
          }`}
        ></span>
      </Button>
      <div className="dropdown_content rounded-xl overflow-hidden shadow-lg">
        <i className="absolute w-4 h-4 rotate-45 -translate-x-1/2 -top-1 left-1/2 bg-light-1"></i>
        {aboutUsList.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            aria-label={`navigate-${item.title
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
          >
            <Button
              intent="outline"
              size="small"
              className={`!w-full !rounded-xl !px-6 ${
                index === 0 ? "rounded-t-lg" : ""
              } ${index === aboutUsList.length - 1 ? "rounded-b-lg" : ""}`}
            >
              {item.title}
            </Button>
          </Link>
        ))}
      </div>
    </li>
  );
};

const EventsClickDropdown = ({
  data,
  isPopoverOpen,
  handleLogout,
  setPopoverOpen,
  isPending,
}) => {
  const dropdownRef = React.useRef(null);

  CloseMenu({ setPopoverOpen, dropdownRef });

  return (
    <li ref={dropdownRef} className="relative">
      <Button onClick={() => setPopoverOpen(!isPopoverOpen)} size="medium">
        {data?.username}
        <CaretDown
          size={16}
          className={`ml-1 transition-all ${isPopoverOpen && "rotate-180"}`}
        />
      </Button>
      {isPopoverOpen && (
        <ProfileDropdown
          handleLogout={handleLogout}
          isPending={isPending}
          data={data}
          type="home"
        />
      )}
    </li>
  );
};

const Navbar = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const [isPopoverOpen, setPopoverOpen] = React.useState(false);

  const navbarRef = React.useRef(null);
  const location = useLocation();

  const { data, isLoading } = useGetProfile();
  const { mutate, isPending } = useLogout();

  const handleLogout = (e) => {
    e.preventDefault();
    mutate();
  };

  React.useEffect(() => {
    if (navbarRef.current == null) return;

    const observer = new ResizeObserver((entries) => {
      const container = entries[0]?.target;
      if (container == null) return;

      setOpenNav(container.clientWidth > 853);
      setPopoverOpen(container.clientWidth > 100000);
    });
    observer.observe(navbarRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <nav
      className="navbar"
      ref={navbarRef}
      style={{ backgroundColor: "#00B4D8" }}
    >
      <menu className="navbar_child">
        <Link
          to="/"
          className="z-30 block cursor-pointer"
          aria-label="navigate-home"
        >
          <Icon src={logo_text} size="logo" description="logo-ifl" />
        </Link>

        <Button
          size="small"
          className="z-20 md:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? <X size={36} /> : <List size={36} />}
        </Button>

        <ul
          className={`navbar_field ${openNav ? "left-0" : "left-[-200%]"}`}
          style={{ backgroundColor: "#00B4D8" }}
        >
          <AboutUsDropdown />
          {navList.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={index} className="relative group">
                <Links
                  to={item.path}
                  onClick={() => setOpenNav(false)}
                  intent="navigation"
                  ariaLabel={item.title}
                  className="relative inline-block"
                >
                  {item.title}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-white transition-all duration-300 ease-out ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Links>
              </li>
            );
          })}

          {data?.data ? (
            <EventsClickDropdown
              data={data?.data}
              isPopoverOpen={isPopoverOpen}
              handleLogout={handleLogout}
              setPopoverOpen={setPopoverOpen}
              isPending={isPending}
            />
          ) : (
            <Link to={isLoading ? "#" : "/masuk"} aria-label="navigate-sign-in">
              <Button size="medium">{isLoading ? "proses..." : "MASUK"}</Button>
            </Link>
          )}
        </ul>
      </menu>
    </nav>
  );
};

export default Navbar;
