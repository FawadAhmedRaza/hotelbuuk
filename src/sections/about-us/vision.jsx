import { Pannel, Typography } from "@/src/components";
import Image from "next/image";
import React from "react";

import bedroom from "@/public/assets/images/bedroom-2.png";
import towel from "@/public/assets/images/towel.png";

export const Vision = React.memo(() => {
  return (
    <Pannel className="grid lg:grid-cols-2 gap-5 md:flex-row w-full items-center sm:gap-3 h-full">
      <div className="flex flex-col justify-center gap-5">
        <Typography variant="h4" className="font-bold">
          Vision
        </Typography>

        <Typography variant="h6" className="leading-[35px]">
          the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s,
        </Typography>
      </div>

      <div className="relative flex justify-end">
        <div className="absolute hidden md:flex justify-start items-center w-full h-full left-8 ">
          <div>
            <Image src={towel} className="w-auto" />
          </div>
        </div>
        <Image src={bedroom} />
      </div>
    </Pannel>
  );
});
