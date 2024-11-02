"use client";
import React, { useRef, useState } from "react";
import { CustomPopover, Iconify } from "../components";
import { useBoolean } from "../hooks";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation"; // Import usePathname
import { paths } from "../contants";

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

export const LangaugeTranslator = React.memo(({isWhite}) => {
  const { isOpen, toggleDrawer } = useBoolean();
  const popoverRef = useRef(null);
  const pathname = usePathname(); // Use usePathname instead of useRouter
  const [activeLang, setActiveLang] = useState(allLangs[0]);

  const handleLangaugeChange = (lng) => {
    setActiveLang(lng);
    toggleDrawer();
  };

  const isDashboardPage =
    pathname === paths.hotelDashboard.root ||
    pathname === paths.guestDashboard.root ||
    pathname === paths.nomadDashboard.root;

  return (
    <div className="relative w-fit">
      <div
        ref={popoverRef}
        className={cn(
          "flex items-center gap-2 sm:gap-3 cursor-pointer px-1 py-1 sm:px-4 sm:py-2.5 border rounded-full hover:shadow-md transition-all",
          isDashboardPage
            ? "bg-transparent border-white border-[1.5px] text-white hover:bg-black hover:bg-opacity-20"
            : " border-gray-600 text-black "
        )}
        onClick={toggleDrawer}
      >
        <Iconify
          iconName="et:global"
          className={cn(
            "hidden sm:block size-4 sm:size-5",
            isWhite ? "text-white" : "text-gray-600"
          )}
        />
        <h2 className="text-sm hidden sm:block">{activeLang?.label}</h2>
        <Iconify
          iconName="iconamoon:arrow-down-2"
          className={cn(
            "size-5 -ml-1 hidden sm:block",
            isWhite ? "text-white" : "text-gray-600"
          )}
        />
        <span className="flex sm:hidden justify-center items-center size-9  rounded-full">
          <Iconify
            iconName={activeLang?.icon}
            className="size-5 text-gray-600"
          />
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
          {allLangs.map((lng) => (
            <div
              key={lng.value}
              onClick={() => handleLangaugeChange(lng)}
              className={`flex items-center justify-between gap-3 px-3 py-2 hover:bg-custom-grey-2 text-[15px] w-full cursor-pointer ${
                activeLang.value === lng.value
                  ? "bg-tertiary"
                  : "hover:bg-tertiary"
              }`}
            >
              <Iconify iconName={lng.icon} />
              {lng.label}
            </div>
          ))}
        </div>
      </CustomPopover>
    </div>
  );
});
