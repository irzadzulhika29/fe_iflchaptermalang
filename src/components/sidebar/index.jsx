import { useState } from "react";

import { Link, NavLink } from "react-router-dom";

import { motion } from "framer-motion";

import { logo_text } from "../../assets/icons";

import { Article,File, CalendarDots, CaretDown, Folders, Gauge, HandCoins, ShoppingBag, User } from "@phosphor-icons/react";

import Icon from "../icon";

export const ListMenu = [
  { title: "Dashboard", links: [{ name: "IFL Malang", icon: <Gauge size={20} />, path: "/admin/dashboards" }] },
  {
    title: "Secretary",
    links: [
      { name: "Proposal", icon: <File size={20} />, path: "/admin/dashboard/proposal" },
    ],
  },
  {
    title: "DPP",
    links: [
      { name: "Event", icon: <CalendarDots size={20} />, path: "/admin/dashboard/event" },
    ],
  },

  {
    title: "Bismar",
    links: [
      { name: "Product", icon: <ShoppingBag size={20} />, path: "/admin/dashboard/product" },
      { name: "Campaign", icon: <HandCoins size={20} />, path: "/admin/dashboard/campaign" },
      { name: "Campaign Category", icon: <Folders size={20} />, path: "/admin/dashboard/category/campaign" },
    ],
  },
  {
    title: "Copy Writer",
    links: [
      { name: "Blog", icon: <Article size={20} />, path: "/admin/dashboard/blog" },
      { name: "Blog Category", icon: <Folders size={20} />, path: "/admin/dashboard/category/blog" },
    ],
  },
  { title: "Admin", links: [{ name: "User", icon: <User size={20} />, path: "/admin/dashboard/user" }] },
];

const SubMenu = ({ title, data }) => {
  const [isDropdown, setDropdown] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between mt-4 cursor-pointer" onClick={() => setDropdown(!isDropdown)}>
        <p className="uppercase text-light-1/70">{title}</p>
        <CaretDown size={20} className={`text-light-1 duration-300 ${isDropdown && "rotate-180"}`} />
      </div>
      <motion.menu animate={isDropdown ? { height: "fit-content" } : { height: 0 }} className="mb-4 space-y-2 overflow-hidden">
        {data.links.map((link) => {
          return (
            <NavLink
              to={link.path}
              key={link.name}
              aria-label={`navigate-${link.name}`}
              className={({ isActive }) => (isActive ? "sidebar-link bg-primary-2" : "sidebar-link bg-primary-1")}
            >
              {link.icon}
              <span className="text-sm capitalize whitespace-nowrap">{link.name}</span>
            </NavLink>
          );
        })}
      </motion.menu>
    </>
  );
};

const Sidebar = ({ openNav, animation }) => {
  return (
    <motion.div
      variants={animation}
      animate={openNav ? "open" : "closed"}
      className="fixed w-64 h-screen py-8 space-y-4 overflow-auto bg-primary-1 z-1000 sidebar"
    >
      <Link aria-label="navigate-dashboard" to="/admin/dashboards" className="flex items-center justify-center mx-2">
        <Icon src={logo_text} description="ifl-malang" size="logo" />
      </Link>
      <ul className="divide-y-2">
        {ListMenu.map((item) => (
          <li className="px-4" key={item.title}>
            <SubMenu title={item?.title} data={item} />
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Sidebar;
