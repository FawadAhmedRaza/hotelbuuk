"use client";

import { useRef } from "react";

import Link from "next/link";

import { useBoolean } from "@/src/hooks";
import CustomPopover from "../custom-popover";

const ActionPopover = ({ allActions = [] }) => {
  const popoverRef = useRef(null);
  const { isOpen, toggleDrawer } = useBoolean();

  const handleActionClick = (action) => {
    toggleDrawer();
    action.onClick();
  };

  return (
    <div
      className="flex items-center justify-center relative w-12"
      ref={popoverRef}
    >
      <span
        className="flex items-center justify-center size-8 hover:bg-custom-grey-2 rounded-full cursor-pointer"
        onClick={toggleDrawer}
      >
        <Iconify iconName="mdi:dots-vertical" />
      </span>

      <CustomPopover
        popoverRef={popoverRef}
        isOpen={isOpen}
        onClose={toggleDrawer}
        arrow={true}
        className="flex flex-col w-full overflow-hidden"
        parentClass="!top-[-1.5rem] !right-[2rem] mr-1 !duration-100 !z-30 !flex-row-reverse !items-center"
        arrowClass="!rotate-90 -ml-1"
      >
        <div className="flex flex-col divide-y divide-gray-200 divide-dashed">
          {allActions?.map((action) => (
            <Link
              key={action.label}
              onClick={() => handleActionClick(action)}
              className="flex items-center gap-3 px-3 py-2 hover:bg-custom-grey-2 text-sm cursor-pointer"
              href={action?.path}
            >
              <Iconify iconName={action.icon} className="!w-4 !h-4" />
              {action.label}
            </Link>
          ))}
        </div>
      </CustomPopover>
    </div>
  );
};

export default ActionPopover;
