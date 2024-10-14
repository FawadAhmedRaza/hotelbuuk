import React from "react";
import { Button, Pannel, Typography } from "../components";
import { PreviewHotels } from "./preview-hotels";

export const Hotels = React.memo(() => {
  return (
    <Pannel className="flex flex-col gap-10 justify-center items-center bg-section-bg !-mt-10 ">
      <Typography
        variant="h3"
        className="font-semibold text-center mt-24 md:mt-16 lg:mt-10"
      >
        Stay For Business Meetings
      </Typography>

      <PreviewHotels />

      <Button className=" w-full sm:w-fit">Show More</Button>
    </Pannel>
  );
});
