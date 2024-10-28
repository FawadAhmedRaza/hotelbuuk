"use client";

import React, { useState } from "react";
import { Button, Pannel, Typography } from "../components";
import { BusinessFactsData } from "../_mock/_business-facts";
import { cn } from "@/lib/utils";
import { Collapsible } from "../components/ui/collapsible";
import { CustomCollapsible } from "../components/custom-collapsible";

export const BusinessFacts = React.memo(({ className }) => {
  const [visibleFacts, setVisibleFacts] = React.useState(4);
  const [isOpen, setIsOpen] = useState(true);

  const handleVisibleFacts = () => {
    setIsOpen(true);
    if (visibleFacts < BusinessFactsData?.length) {
      setVisibleFacts((prevNum) => prevNum + 2);
    } else {
      setVisibleFacts(4);
    }
  };
  return (
    <Pannel
      className={cn(
        "w-full flex flex-col gap-10 bg-section-bg  px-0 sm:px-3 lg:px-9 xl:px-5",
        className
      )}
    >
      <div className="flex flex-col gap-2">
        <Typography
          variant="h2"
          className="font-semibold text-center !text-black"
        >
          Business Facts
        </Typography>
        <Typography
          variant="h6"
          className="font-normal text-center  text-neutral-400"
        >
          Our journey in numbers and highlights.
        </Typography>
      </div>
      <CustomCollapsible isOpen={isOpen}>
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5">
          {BusinessFactsData?.slice(0, visibleFacts)?.map((item, index) => (
            <div
              key={index + 1}
              className={cn(
                " flex flex-col gap-4 w-full p-5 rounded-2xl !shadow-custom-shadow-sm x bg-white ",
                [1, 2, 5].includes(index) &&
                  "!bg-white  !shadow-custom-shadow-sm"
              )}
            >
              <div className="flex flex-col min-500:flex-row gap-3 min-500:gap-5 items-start">
                <img
                  src={item?.image}
                  alt="img"
                  className="w-full min-500:w-36 h-full rounded"
                />
                <span className="flex flex-col gap-1">
                  <Typography variant="h4" className="font-semibold">
                    {item?.title}
                  </Typography>
                  <Typography variant="p" className="font-medium  !text-sm ">
                    {item?.description}
                  </Typography>
                </span>
              </div>
              <ul className="list-disc list-inside flex flex-col  ">
                {item?.points?.map((point, index) => (
                  <li key={index} className="text-sm">
                    {point}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Typography variant="p" className="font-medium text-start">
                  {item?.price}
                </Typography>
                <Button className="py-1.5 px-4 mx-auto min-450:mx-0">
                  Ask John
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CustomCollapsible>
      <div className="flex flex-col justify-center items-center gap-5">
        <Typography variant="h4" className="font-semibold text-center mt-2">
          Explore More Business Facts
        </Typography>
        <Button onClick={handleVisibleFacts}>
          {visibleFacts === BusinessFactsData?.length
            ? "Show less "
            : "Show More"}
        </Button>
      </div>
    </Pannel>
  );
});

export default BusinessFacts;
