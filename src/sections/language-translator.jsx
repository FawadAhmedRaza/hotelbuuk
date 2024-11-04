"use client";
import React, { useRef, useState } from "react";
import { CustomPopover, Iconify, Typography } from "../components";
import { useBoolean } from "../hooks";

const allLangs = [
  {
    label: "English",
    value: "en",
    icon: "flagpack:gb-nir",
  },
  {
    label: "German",
    value: "de",
    icon: "flagpack:de",
  },
];

export const LangaugeTranslator = React.memo(() => {
  const { isOpen, toggleDrawer } = useBoolean();
  const popoverRef = useRef(null);

  const [activeLang, setActiveLang] = useState(() => allLangs[0]);
  const handleLangaugeChange = (lng) => {
    setActiveLang(lng);
    toggleDrawer();
  };

  return (
    <div className="relative w-fit">
      <div
        ref={popoverRef}
        className={`flex items-center gap-2 sm:gap-3 cursor-pointer  px-2 py-1 sm:px-4 sm:py-2  rounded-lg ${"hover:bg-primary "}`}
        onClick={toggleDrawer}
      >
        <Iconify
          iconName="et:global"
          className=" hidden sm:block size-4 sm:size-8"
        />
        <Typography variant="p" className="text-sm text-white  hidden sm:block">
          {activeLang?.label}
        </Typography>
        <Iconify
          iconName="iconamoon:arrow-down-2"
          className="size-6 -ml-1  hidden sm:block"
        />
        <span className=" flex sm:hidden justify-center items-center size-9 border border-white rounded-full">
          <Iconify iconName={activeLang?.icon} className="size-5  " />
        </span>
      </div>
      
      <CustomPopover
        popoverRef={popoverRef}
        isOpen={isOpen}
        onClose={toggleDrawer}
        arrow={true}
        parentClass=""
        className="flex flex-col w-full overflow-hidden "
      >
        <div className="flex flex-col divide-y divide-gray-200 divide-dashed w-full">
          {allLangs?.map((lng) => (
            <div
              key={lng?.value}
              onClick={() => handleLangaugeChange(lng)}
              className={`flex items-center justify-between gap-3 px-3 py-2 hover:bg-custom-grey-2 text-[15px] w-full cursor-pointer  ${
                activeLang?.value === lng?.value
                  ? "bg-tertiary"
                  : " hover:bg-tertiary "
              }`}
            >
              <Iconify iconName={lng?.icon} />
              {lng?.label}
            </div>
          ))}
        </div>
      </CustomPopover>
    </div>
  );
});
