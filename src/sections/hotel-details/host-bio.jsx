import React from "react";
import { Typography } from "@/src/components";

export const HostBio = React.memo(() => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <Typography variant="h4" className="font-medium text-xl md:text-3xl">
        Meet Your Host
      </Typography>
      <Typography variant="h6">in-house</Typography>
      <div className="flex ">

      </div>
    </div>
  );
});
