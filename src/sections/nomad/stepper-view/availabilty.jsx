import React from "react";

// Components and Others...
import {Typography } from "@/src/components";

export const SetAvailability = () => {
  return (
    <div className="flex flex-col justify-between items-start gap-10 w-full h-full">
      <Typography variant="h4" className="font-semibold">
        Availability
      </Typography>
      <div className="flex flex-col gap-3 w-full">
        <Typography variant="h6" className="font-medium">
          B&B Tour Starting and Ending
        </Typography>
      </div>
      <Typography variant="h4" className="font-semibold">
        How Rules
      </Typography>
      <div className="flex flex-col gap-3 w-full">
        <Typography variant="h6" className="font-medium">
          What Rules must your Guest observe?
        </Typography>
      </div>
    </div>
  );
};
