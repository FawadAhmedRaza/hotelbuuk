import React from "react";
import { cn } from "../libs/cn";

export const Line = React.memo(({ className, children }) => {
  return (
    <div className={cn("flex items-center ", className)}>
      <div className="flex-grow border-t border-neutral-200"></div>

      <span className="md:mx-4 text-sm mx-2 text-secondary">
        {children}
      </span>

      <div className="flex-grow border-t border-neutral-200"></div>
    </div>
  );
});
