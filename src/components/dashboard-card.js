"use client";

import React from "react";
import { AnchorTag, Card, Iconify, Typography } from ".";

const DashboardCard = ({ title, value, IconName, btnTitle, path, bgColor }) => {
  console.log("bgColor", bgColor);
  return (
    <div>
      <Card
        className={`md:col-span-3 col-span-12 flex-col flex gap-1 py-5 px-4 !bg-[${bgColor}]`}
        style={{ backgroundColor: bgColor }}
      >
        <div className="flex justify-between gap-3 items-center w-full flex-auto md:flex-initial">
          <div className="flex items-center gap-2">
            <div className="rounded-full border-2 w-min h-min p-1.5 border-black ">
              <Iconify iconName={IconName} className="!text-black size-5" />
            </div>
            <div className=" flex  gap-7 items-center">
              <div>
                <h2 variant="h3" className="!text-[20px] !font-medium">
                  {title}
                </h2>
                <p
                  variant="p"
                  className="!text-[12px] text-black  leading-none !font-medium"
                >
                  {title === "Hotel" ? "Registered" : "Total"}
                </p>
              </div>
              <Typography variant="h5" className="!text-black   !font-semibold">
                {title === "Revenue" && "$"} {value}
              </Typography>
            </div>
          </div>
          {/* View Button */}
          <div className=" text-center py-2 px-3  bg-white rounded-md">
            <AnchorTag href={path} className={"hover:no-underline"}>
              <Typography
                variant="p"
                className="text-slate-900 uppercase !text-sm font-medium !py-0.5 cursor-pointer"
              >
                {btnTitle}
              </Typography>
            </AnchorTag>
          </div>
        </div>

        {/* <div className="w-full text-center py-2 mt-5 bg-gray-100 rounded-md">
          <AnchorTag href={path} className={"hover:no-underline"}>
            <Typography
              variant="p"
              className="text-gray-500 uppercase !text-sm font-medium !py-0.5 cursor-pointer"
            >
              {btnTitle}
            </Typography>
          </AnchorTag>
        </div> */}
      </Card>
    </div>
  );
};

export default DashboardCard;
