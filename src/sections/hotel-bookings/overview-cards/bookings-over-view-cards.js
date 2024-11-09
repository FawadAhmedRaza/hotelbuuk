"use client";

import { Card, Iconify, Typography } from "@/src/components";
import React from "react";

const BookingsOverViewCards = ({
  title,
  value,
  IconName,
  subTitle,
  bgColor,
}) => {
  return (
    <div>
      <Card
        className={`md:col-span-3 col-span-12 flex-col flex gap-1 py-5 px-4 ${bgColor}`}
      >
        <div className="flex gap-4 items-center w-full flex-auto md:flex-initial ">
          <div className="rounded-full border-2 w-min h-min p-1.5 border-primary ">
            <Iconify iconName={IconName} className="!text-primary size-5" />
          </div>
          <div className="flex gap-7 items-center w-full">
            <div>
              <h2 variant="h3" className="!text-[20px] !font-medium">
                {title}
              </h2>
              <p
                variant="p"
                className="!text-[14px] text-primary  leading-none !font-medium"
              >
                Total {subTitle} Bookings
              </p>
            </div>
            <Typography
              variant="h4"
              className="!text-black !font-semibold !text-end"
            >
              {value}
            </Typography>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BookingsOverViewCards;
