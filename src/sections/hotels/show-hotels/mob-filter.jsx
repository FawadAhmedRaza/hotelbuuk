"use client";

import { Button, Drawer, Typography } from "@/src/components";
import SideFilterSection from "./side-filter-section";

export const MobileFilter = ({ isOpen, setIsOpen, onClick, setFilters }) => {
  return (
    <Drawer
      DrawerClass={"min-450:w-80  overflow-y-scroll"}
      isDrawerOpen={isOpen}
      setIsDrawerOpen={setIsOpen}
    >
      <div className="flex justify-between items-center ">
        <SideFilterSection setFilters={setFilters} onClick={onClick} />
      </div>

      <div className="  -bottom-8 pt-4  bg-white  sticky left-0">
        <Button onClick={onClick} className={" w-full"}>
          Filter
        </Button>
      </div>
    </Drawer>
  );
};
