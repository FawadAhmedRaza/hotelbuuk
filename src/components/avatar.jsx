import React from "react";
import { cn } from "../libs/cn";

export const Avatar = React.memo(({ className, src, ...rests }) => {
  return (
    <img
      {...rests}
      src={src}
      alt="avatar"
      className={cn(
        " size-12 rounded-full object-cover  cursor-pointer border-2 border-white shadow-custom-shadow-sm",
        className
      )}
    />
  );
});
