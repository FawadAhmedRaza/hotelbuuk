import React from "react";
import { Button, Pannel, Typography } from "../../components";
import { PreviewHotels } from "../preview-hotels";

export const NearByHotels = React.memo(() => {
  return (
    <Pannel className="flex flex-col gap-10 justify-center items-center bg-section-bg">
      <div className="flex justify-center sm:justify-between items-center w-full ">
        <Typography variant="h3" className="font-semibold text-center">
          Hotels nearby
        </Typography>
        <Button className=" hidden sm:block">show more</Button>
      </div>

      <PreviewHotels />
    </Pannel>
  );
});
