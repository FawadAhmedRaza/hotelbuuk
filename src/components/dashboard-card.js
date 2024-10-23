"use client";

import React from "react";
import { Card, Iconify, Typography } from ".";
import { BgIcon } from "./bg-icon";

const DashboardCard = ({ title, value, IconName, btnTitle }) => {
  return (
    <div>
      <Card className="md:col-span-3 col-span-12 flex-col flex gap-1 py-5 px-4 ">
        <div className="flex gap-4 items-center w-full flex-auto md:flex-initial ">
          <div className="rounded-full border-2 w-min h-min p-1.5 border-primary ">
            <Iconify iconName={IconName} className="!text-primary size-5" />
          </div>
          <div className=" flex  gap-7 items-center">
            <div>
              <h2 variant="h3" className="!text-[20px] !font-medium">
                {title}
              </h2>
              <p
                variant="p"
                className="!text-[12px]  leading-none !font-medium"
              >
                {title === "Hotel" ? "Registered" : "Total"}
              </p>
            </div>
            <Typography variant="h4" className="!text-black   !font-semibold">
              {value}
            </Typography>
          </div>
        </div>

        <div className="w-full text-center py-2 mt-5 bg-[#fef5fc] rounded-md">
          <Typography
            variant="p"
            className="text-primary uppercase !text-sm font-medium !py-0.5 cursor-pointer"
          >
            {btnTitle}
          </Typography>
        </div>
      </Card>
    </div>
  );
};

export default DashboardCard;
