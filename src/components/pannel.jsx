import React from "react";
import { cn } from "../libs/cn";

export const Pannel = React.memo(({ className, children }) => {
  return (
    <div
      className={cn(
        " w-full h-full py-10 md:py-16  px-5 sm:px-8 lg:px-14 xl:px-10 !hide-scrollbar  ",
        className
      )}
    >
      {children}
    </div>
  );
});
