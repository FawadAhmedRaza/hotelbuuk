import { Button, Card, Iconify } from "@/src/components";
import React from "react";
import MobileFilter from "./mob-filter";
import { Menu } from "../../menu";
import { useBoolean } from "@/src/hooks";

const Tabs = ({ TABS, activeTab, setActiveTab, className, setFilters }) => {
  const { isOpen, toggleDrawer, setIsOpen } = useBoolean();

  return (
    <div className=" flex flex-col gap-5 md:gap-0 w-full">
      <div className=" flex justify-between items-center">
        <Card className=" p-2 w-fit bg-[#fcfcfc] shadow-md rounded-lg">
          <div className="relative flex items-center flex-wrap gap-2 ">
            {TABS?.map((tab) => (
              <div
                className={`z-30 flex items-center p-1 justify-center grow px-0 py-2 mb-0  transition-all ease-in-out rounded-lg cursor-pointer !text-primary  ${
                  activeTab === tab.value ? "bg-primary" : "hover:bg-white"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(tab?.value);
                }}
                role="tab"
                aria-controls={tab?.value}
                aria-selected={activeTab === tab?.value}
              >
                <Button
                  className={`!bg-transparent !py-0 px-5 md:px-16 text-sm ${
                    activeTab === tab.value ? "!text-white" : "!text-primary"
                  }  outline-none font-medium${className}`}
                >
                  {tab?.label}
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {isOpen && (
          <MobileFilter
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onClick={toggleDrawer}
            setFilters={setFilters}
          />
        )}
        <div
          onClick={toggleDrawer}
          className=" py-3 px-3 gap-3 cursor-pointer items-center border md:hidden flex shadow-md  bg-[#fcfcfc] rounded-md"
        >
          Filter
          <Iconify className=" text-black" iconName={"mage:filter"} />
        </div>
      </div>

      <div className="w-full mt-10">
        {TABS?.find((tab) => tab?.value === activeTab)?.component ?? (
          <p>No content available for this tab.</p>
        )}
      </div>
    </div>
  );
};

export default Tabs;
