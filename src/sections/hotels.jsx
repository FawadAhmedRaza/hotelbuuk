import React from "react";
import { Pannel, Typography } from "../components";
import { PreviewHotels } from "./preview-hotels";

export const Hotels = React.memo(() => {
  return (
    <Pannel className="flex flex-col gap-10 justify-center items-center bg-section-bg">
      <Typography variant="h3" className="font-semibold text-center">
        Stay For Business Mettings
      </Typography>
      
      <PreviewHotels />
    </Pannel>
  );
});
