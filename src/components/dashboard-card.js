import React from "react";
import { Card, Iconify, Typography } from ".";
import { BgIcon } from "./bg-icon";

const DashboardCard = ({ title, value, IconName, btnTitle }) => {
  return (
    <div>
      <Card className="md:col-span-3 col-span-12 flex-col flex gap-2 p-5 ">
        <div className="flex gap-4 items-center w-full flex-auto md:flex-initial">
          <div className="rounded-full border-2 w-min h-min p-1.5 border-primary ">
            <Iconify iconName={IconName} className="!text-primary size-8" />
          </div>
          <div className="flex flex-col gap-1">
            <Typography variant="h5" className="!text-[18px] !font-medium">
              {title}
            </Typography>
            <Typography variant="h5" className="!text-black   !font-bold">
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
