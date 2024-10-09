"use client";
import React from "react";
import { AnchorTag, Drawer, Typography } from "../components";
import { MenuLinks } from "../_mock/_menu";
import { usePathname } from "next/navigation";

export const Menu = ({ isOpen, setIsOpen }) => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <Drawer isDrawerOpen={isOpen} setIsDrawerOpen={setIsOpen}>
      <Typography
        variant="h3"
        className=" !text-3xl md:!text-4xl font-bold text-primary text-start  "
      >
        Hotelbuuk
      </Typography>
      <div
        className="flex flex-col h-96 justify-center sm:justify-start items-center   sm:items-start
       gap-5 mt-10 "
      >
        {MenuLinks?.map((item) => {
          return (
            <AnchorTag
              key={item?.id}
              href={item?.path}
              className={` !text-lg  ${
                location?.pathname == item?.path
                  ? "!text-primary underline"
                  : "!text-black hover:!text-primary"
              }`}
            >
              {item?.label}
            </AnchorTag>
          );
        })}
      </div>
    </Drawer>
  );
};
