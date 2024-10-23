import React from "react";
import { cn } from "../libs/cn";

export const Card = React.memo(({ className, children, ...rest }) => {
  return (
    <div
      className={cn(
        " flex items-center bg-white shadow-custom-shadow-sm px-6 py-8 rounded-2xl w-full ",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
});
