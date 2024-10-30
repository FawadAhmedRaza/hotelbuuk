import { Button, Card } from "@/src/components";
import React from "react";

const Tabs = ({ TABS, activeTab, setActiveTab, className }) => {
  return (
    <div className=" flex flex-col gap-5 md:gap-0 w-full">
      <Card className=" p-2 w-fit bg-[#fcfcfc] shadow-md rounded-lg">
        <div className="relative flex items-center flex-wrap gap-2 ">
          {TABS?.map((tab) => (
            <div
              className={`z-30 flex items-center p-1 justify-center grow px-0 py-2 mb-0  transition-all ease-in-out rounded-lg cursor-pointer !text-primary  ${
                activeTab === tab.value
                  ? "bg-white border border-gray-300 "
                  : "hover:bg-white"
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
                className={`!bg-transparent !py-0 px-16 text-sm !text-primary outline-none font-medium${className}`}
              >
                {tab?.label}
              </Button>
            </div>
          ))}
        </div>
      </Card>

      <div className="w-full mt-10">
        {TABS?.find((tab) => tab?.value === activeTab)?.component ?? (
          <p>No content available for this tab.</p>
        )}
      </div>
    </div>
  );
};

export default Tabs;
