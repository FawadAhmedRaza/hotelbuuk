import React from "react";
import {  Pannel, Typography } from "../../components";
import { PreviewHotels } from "../preview-hotels";

export const Destinations = React.memo(() => {
  return (
    <Pannel className="flex flex-col gap-10 justify-center items-center ">
      <div className="flex justify-center sm:justify-between items-center w-full md:px-8">
        <Typography
          variant="h2"
          className="font-semibold text-center w-full mb-5"
        >
          Popular Destinations
        </Typography>
      </div>
      <PreviewHotels />
    </Pannel>
  );
});
