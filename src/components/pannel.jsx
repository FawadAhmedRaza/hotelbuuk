import React from "react";
import { cn } from "../libs/cn";

export const Pannel = React.memo(({ className, children }) => {
  return (
    <div
      className={cn(" w-full h-full p-6  sm:p-8 md:p-14  lg:p-20 ", className)}
    >
      {children}
    </div>
  );
});
