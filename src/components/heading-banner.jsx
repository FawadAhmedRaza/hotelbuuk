import React from "react";
import { AnchorTag, Pannel, Typography } from "../components";
import { BgIcon } from "../components/bg-icon";
import { cn } from "../libs/cn";

export const HeadingBanner = React.memo(({ heading, text, className }) => {
  return (
    <div className=" flex flex-col w-full h-full">
      <div
        className={cn(
          "relative flex flex-col justify-center md:flex-row items-start md:items-center gap-10 w-full h-80 md:h-96 lg:h-[461px]  bg-cover  px-5 sm:px-8 lg:px-14 xl:px-20",
          className
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black to-black  opacity-55" />
        <div className="flex flex-col w-full h-full justify-center gap-2 lg:gap-10 z-10">
          <Typography
            variant="h1"
            className="text-white  !text-4xl  md:!text-5xl lg:!text-[75px] "
          >
            {heading}
          </Typography>
          <Typography variant="h4" className="text-white font-light">
            {text ? text : ""}
          </Typography>
        </div>
      </div>
    </div>
  );
});

<Typography varient="h1" className="text-white">
  Term & Conditions
</Typography>;
