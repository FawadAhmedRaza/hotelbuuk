import React from "react";
import { AnchorTag, Pannel, Typography } from "../components";
import { BgIcon } from "../components/bg-icon";

export const TermsBanner = React.memo(() => {
  return (
    <div className=" flex flex-col w-full h-full">
      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-10 w-full md:h-96 lg:h-[461px] bg-terms bg-cover p-24 ">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent "></div>
        <div className="flex flex-col w-full h-full justify-end gap-10 z-30">
          <Typography variant="h1" className="text-white !text-[75px] ">
            Term & Condition
          </Typography>
          <Typography
            variant="h5"
            className="text-white !text-[26px] font-light"
          >
            Last Updated 7 Oct 2024
          </Typography>
        </div>
      </div>
    </div>
  );
});

<Typography varient="h1" className="text-white">
  Term & Conditions
</Typography>;
