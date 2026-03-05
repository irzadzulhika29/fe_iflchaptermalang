import { useRef } from "react";

import { CaretDown } from "@phosphor-icons/react";

import { Button } from "../button";

import { CloseMenu } from "../../utils/closeMenu";
import Loading from "../loader";

const FilterDropdown = ({ isPopoverOpen, setFiltered, setPopoverOpen, filtered, typeList, title, className, loading }) => {
  const dropdownRef = useRef(null);

  const data = ["All", ...new Set(typeList?.map((item) => item?.name))];

  CloseMenu({ setPopoverOpen, dropdownRef });

  return (
    <span
      ref={dropdownRef}
      className={`events_dropdown ${className ?? ""} ${filtered === "All" ? "text-gray-400" : "text-dark-1"}`}
      onClick={() => setPopoverOpen(!isPopoverOpen)}
    >
      {filtered === "All" ? title : filtered}
      <CaretDown size={16} className={`duration-300 absolute right-2 ${isPopoverOpen && "rotate-180"}`} />
      {isPopoverOpen && (
        <div className="popover !w-full">
          {loading ? (
            <Loading height={100} width={100} className="m-10" />
          ) : (
            <>
              {data?.map((item, index) => (
                <Button
                  onClick={() => setFiltered(item)}
                  key={index}
                  intent={filtered === item ? "secondary" : "primary"}
                  size="small"
                  className="!w-full whitespace-nowrap uppercase"
                  ariaLabel={title}
                >
                  {item}
                </Button>
              ))}
            </>
          )}
        </div>
      )}
    </span>
  );
};

export default FilterDropdown;
