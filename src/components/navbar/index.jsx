import * as React from "react";
import { Link } from "react-router-dom";
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
  { title: "Article", path: "/artikel" },
  { title: "Catalog", path: "/#shop" },
  { title: "Donate", path: "/donasi" },
];

const AboutUsDropdown = () => (
  <li className="relative group">
    <Button intent="navigation" className="!p-0 !shadow-none gap-1">
      About Us
      <CaretDown
        size={16}
        className="mt-1 transition-all group-hover:rotate-180"
      />
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

const EventsDropdown = (
  <li className="relative group">
    <Button intent="navigation" className="!p-0 !shadow-none gap-1">
      Events
      <CaretDown
        size={16}
        className="mt-1 transition-all group-hover:rotate-180"
      />
    </Button>
    <div className="dropdown_content rounded-xl overflow-hidden shadow-lg">
      <i className="absolute w-4 h-4 rotate-45 -translate-x-1/2 -top-1 left-1/2 bg-light-1"></i>
      <Link to="/program" aria-label="navigate-program">
        <Button
          intent="outline"
          size="small"
          className="!w-full !rounded-full !px-6 rounded-t-lg"
        >
          Program
        </Button>
      </Link>
      <Link to="/project" aria-label="navigate-project">
        <Button
          intent="outline"
          size="small"
          className="!w-full !rounded-full !px-6 rounded-b-lg"
        >
          Project
        </Button>
      </Link>
    </div>
  </li>
);

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
    <nav className="navbar" ref={navbarRef} style={{ backgroundColor: "#00B4D8" }}>
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

        <ul className={`navbar_field ${openNav ? "left-0" : "left-[-200%]"}`} style={{ backgroundColor: "#00B4D8" }}>
          <AboutUsDropdown />
          {EventsDropdown}
          {navList.map((item, index) => (
            <li
              key={index}
              className="transition-all duration-300 scale-100 hover:scale-110"
            >
              <Links
                to={item.path}
                onClick={() => setOpenNav(false)}
                intent="navigation"
                ariaLabel={item.title}
              >
                {item.title}
              </Links>
            </li>
          ))}

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