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
        className="flex items-center gap-2 sm:gap-3 cursor-pointer px-2 py-1 sm:px-4 sm:py-2 border border-gray-600 rounded-full hover:shadow-md transition-all hover:bg-gray-100"
        onClick={toggleDrawer}
      >
        <Iconify
          iconName="et:global"
          className="hidden sm:block size-4 sm:size-5 text-gray-600"
        />
        <Typography variant="p" className="text-sm hidden sm:block">
          {activeLang?.label}
        </Typography>
        <Iconify
          iconName="iconamoon:arrow-down-2"
          className="size-5 -ml-1 hidden sm:block text-gray-600"
        />
        <span className="flex sm:hidden justify-center items-center size-9 border border-black rounded-full">
          <Iconify iconName={activeLang?.icon} className="size-5 text-gray-600" />
        </span>
      </div>

      <CustomPopover
        popoverRef={popoverRef}
        isOpen={isOpen}
        onClose={toggleDrawer}
        arrow={true}
        parentClass=""
        className="flex flex-col w-full overflow-hidden"
      >
        <div className="flex flex-col divide-y divide-gray-200 divide-dashed w-full">
          {allLangs?.map((lng) => (
            <div
              key={lng?.value}
              onClick={() => handleLangaugeChange(lng)}
              className={`flex items-center justify-between gap-3 px-3 py-2 hover:bg-custom-grey-2 text-[15px] w-full cursor-pointer ${
                activeLang?.value === lng?.value
                  ? "bg-tertiary"
                  : "hover:bg-tertiary"
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
