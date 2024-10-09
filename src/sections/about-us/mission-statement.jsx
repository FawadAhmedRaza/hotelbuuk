import { Pannel, Typography } from "@/src/components";
import Image from "next/image";
import React from "react";

import bedroom from "@/public/assets/images/bedroom.png";
import candles from "@/public/assets/images/candle.png";

export const MissionStatement = React.memo(() => {
  return (
    <Pannel className="grid lg:grid-cols-2 gap-5 md:flex-row w-full items-center sm:gap-3 h-full">
      <div className="relative flex">
        <Image src={bedroom} />
        <div className="absolute flex justify-end items-center w-full h-full  -ml-12 ">
          <div>
            <Image src={candles} className="w-auto" />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-5">
        <Typography variant="h5" className="font-bold">
          Mission Statement
        </Typography>

        <Typography variant="h6" className="leading-[35px]">
          the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s, when an unknown
          printer took a galley of type and scrambled it to make a type specimen
          bookthe printing and typesetting industry.{" "}
        </Typography>
      </div>
    </Pannel>
  );
});
