import { Button } from "../button";
import Slider from "../slider";

const Tab = ({ currentTab, totalTabs, onTabChange, type }) => {
  return (
    <Slider totalTabs={totalTabs} className="mx-auto">
      {totalTabs.map((item, index) => (
        <div key={index}>
          {type === "underline" ? (
            <Button
              onClick={() => onTabChange(type === "underline" ? index : item)}
              className={`${index === currentTab ? "before:w-1/2 text-primary-1" : "before:w-0 text-gray-500"}`}
              intent="underline"
            >
              {type === "underline" ? item.title : item}
            </Button>
          ) : (
            <Button
              onClick={() => onTabChange(type === "underline" ? index : item)}
              className={`${item === currentTab ? "bg-primary-2" : "bg-primary-1"} rounded-sm`}
              intent="secondary"
            >
              {type === "underline" ? item.title : item}
            </Button>
          )}
        </div>
      ))}
    </Slider>
  );
};

export default Tab;
