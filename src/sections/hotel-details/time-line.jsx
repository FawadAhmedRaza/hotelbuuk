import React from "react";
import { Iconify, Typography } from "@/src/components";
import Link from "next/link";

import { timeLine } from "@/src/_mock/_time_line";
import { useSelector } from "react-redux";

const TimeLine = () => {
  const { event } = useSelector((state) => state.allEvents.getById);

  const itineraries = event?.itinerary;

  return (
    <div>
      <main className="relative flex flex-col  overflow-hidden  justify-center items-center  ps-10 sm:ps-0">
        <div className="w-full ">
          <div className="flex flex-col  divide-y divide-primary ">
            <div className="w-full  ">
              <div className="">
                {itineraries.map((item, index) => (
                  <div
                    key={item.id}
                    className="relative pl-10 sm:pl-28 py-6 group"
                  >
                    <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:w-px before:bg-primary sm:before:ml-[4rem] before:self-start before:-translate-x-1/2 before:translate-y-3">
                      <div className="absolute left-2 sm:left-0 transform -translate-x-1/2 translate-y-1.5 sm:ml-[4rem]">
                        <div className="bg-primary flex justify-center items-center p-2 h-11 w-11 text-white rounded-full shadow-lg">
                          <Typography
                            variant="h6"
                            className="!text-white !leading-none !text-sm"
                          >
                            {index + 1}
                          </Typography>
                        </div>
                      </div>

                      <Typography
                        variant="h6"
                        className="text-xl !text-nowrap whitespace-nowrap font-bold !leading-none text-slate-900"
                      >
                        {item?.title}
                      </Typography>
                    </div>

                    <Typography className="text-zinc-500 !text-sm !my-0.5">
                      Stop: {item?.stop}
                    </Typography>

                    <Typography className="text-zinc-500 !text-sm !my-0.5">
                      {item?.location}
                    </Typography>
                    {/* <Link
                      href={item.detailLink}
                      className="text-zinc-500 !text-sm underline"
                    >
                      See details & photo
                    </Link> */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TimeLine;
