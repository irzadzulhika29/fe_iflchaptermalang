import { useEffect } from "react";

export const CloseMenu = ({ setPopoverOpen, dropdownRef }) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setPopoverOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setPopoverOpen, dropdownRef]);
};
