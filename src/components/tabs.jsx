import React from "react";
import { Button, Card } from ".";

const Tabs = ({ TABS, activeTab, setActiveTab }) => {
  return (
    <div className=" flex flex-col gap-5 md:gap-0 w-full">
      <Card className=" p-2 w-full bg-tertiary shadow-md rounded-lg">
        <div className="relative flex items-center flex-wrap gap-2 w-full">
          {TABS?.map((tab) => (
            <div
              className={`z-30 flex items-center p-1 justify-center grow px-0 py-2 mb-0 transition-all ease-in-out rounded-lg cursor-pointer !text-primary  ${
                activeTab === tab.value ? "bg-white border " : "hover:bg-white"
              }`}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(tab?.value);
              }}
              role="tab"
              aria-controls={tab?.value}
              aria-selected={activeTab === tab?.value}
            >
              <Button className="!bg-transparent !py-0 text-sm !text-primary font-medium ">
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
