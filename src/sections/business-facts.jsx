"use client";

import React, { useState } from "react";
import { Card, Pannel, Typography } from "../components";
import { BookingStepsData } from "../_mock/_booking-steps";

export const BusinessFacts = () => {
  const [count, setCount] = useState(
    Array.from({ length: 16 }, (value, index) => index)
  );

  return (
    <Pannel className="flex flex-col gap-10 justify-center items-center bg-white">
      <Typography variant="h3" className="font-semibold">
        Business Facts
      </Typography>
      <div className="grid grid-cols-4 gap-5 w-full">
        {count?.map((item, index) => (
          <Card
            className="flex flex-col sm:flex-row lg:flex-col justify-start  gap-3 w-full "
            key={item?.id}
          >
            <Typography>{index}</Typography>
          </Card>
        ))}
      </div>
    </Pannel>
  );
};
