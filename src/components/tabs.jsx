import React from "react";
import { Button, Card } from ".";

const Tabs = ({ TABS, activeTab, setActiveTab, clearErrors }) => {
  return (
    <div className="!w-full">
      <Card className="!p-1 w-full">
        <div className="relative right-0">
          <ul
            className="relative flex flex-wrap bg-custom-grey-2 list-none rounded-lg"
            data-tabs="tabs"
            role="tablist"
          >
            {TABS?.map((tab) => (
              <li key={tab?.label} className="p-1 flex-auto text-center">
                <div
                  className={`z-30 flex items-center p-1 justify-center w-full px-0 py-2 mb-0 transition-all ease-in-out rounded-lg cursor-pointer !text-primary ${
                    activeTab === tab.value ? "bg-custom-white border" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(tab?.value);
                  }}
                  role="tab"
                  aria-controls={tab?.value}
                  aria-selected={activeTab === tab?.value}
                >
                  <Button className="!bg-transparent !py-0 text-sm !text-primary">
                    {tab?.label}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Card>

      <div className="">
        {TABS?.find((tab) => tab?.value === activeTab)?.component ?? (
          <p>No content available for this tab.</p>
        )}
      </div>
    </div>
  );
};

export default Tabs;
