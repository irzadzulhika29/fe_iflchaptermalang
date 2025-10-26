import * as React from "react";

import { CaretCircleRight, CaretCircleLeft } from "@phosphor-icons/react";

import { Button } from "../button";

const Slider = ({ totalTabs, children, className }) => {
  const [translate, setTranslate] = React.useState(0);
  const [isLeftVisible, setIsLeftVisible] = React.useState(false);
  const [isRightVisible, setIsRightVisible] = React.useState(false);
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    if (containerRef.current == null) return;

    const observer = new ResizeObserver((entries) => {
      const container = entries[0]?.target;
      if (container == null) return;

      setIsLeftVisible(translate > 0);
      setIsRightVisible(translate + container.clientWidth < container.scrollWidth);
      setTranslate(container.clientWidth === container.scrollWidth ? 0 : translate);
    });
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [totalTabs, translate]);

  return (
    <section ref={containerRef} className="relative overflow-x-hidden">
      <div
        className={`flex gap-4 items-center whitespace-nowrap h-12 transition-transform duration-300 w-max ${className ?? ""}`}
        style={{ transform: `translateX(-${translate}px)` }}
      >
        {children}
      </div>
      {isLeftVisible && (
        <div className="left_arrow_slider">
          <Button
            className="!h-max !rounded-full !shadow-none !px-1"
            size="small"
            onClick={() => {
              setTranslate((translate) => {
                const newTranslate = translate - 200;
                if (newTranslate <= 0) return 0;
                return newTranslate;
              });
            }}
          >
            <CaretCircleLeft size={24} />
          </Button>
        </div>
      )}
      {isRightVisible && (
        <div className="right_arrow_slider">
          <Button
            className="!h-max !rounded-full !shadow-none !px-1"
            size="small"
            onClick={() => {
              setTranslate((translate) => {
                if (containerRef.current == null) {
                  return translate;
                }
                const newTranslate = translate + 200;
                const edge = containerRef.current.scrollWidth;
                const width = containerRef.current.clientWidth;
                if (newTranslate + width >= edge) {
                  return edge - width;
                }
                return newTranslate;
              });
            }}
          >
            <CaretCircleRight size={24} />
          </Button>
        </div>
      )}
    </section>
  );
};

export default Slider;
