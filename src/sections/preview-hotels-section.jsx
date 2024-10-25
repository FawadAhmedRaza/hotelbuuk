import React from "react";
import { Button, Pannel, Typography } from "../components";
import { PreviewHotels } from "./preview-hotels";
import { paths } from "../contants";
import Link from "next/link";

export const PreviewHotelsSection = React.memo(() => {
  return (
    <Pannel className="flex flex-col gap-10 justify-center items-center bg-section-bg !-mt-10 ">
      <div>
        <Typography
          variant="h1"
          className="font-semibold text-center mt-24 md:mt-5 lg:mt-10 !text-black"
        >
          Stay For Business Meetings
        </Typography>
        <Typography variant="h4" className="font-semibold text-center mt-2">
          Find Business Hotels with Local Market Insights.{" "}
        </Typography>
      </div>

      <PreviewHotels />

      <div className="flex flex-col justify-center items-center gap-5">
        <Typography variant="h4" className="font-semibold text-center mt-2">
          Find More Business Hotels
        </Typography>
        <Link href={paths.hotels.root}>
          <Button className=" w-full sm:w-fit">
            Show More
          </Button>
        </Link>
      </div>
    </Pannel>
  );
});
