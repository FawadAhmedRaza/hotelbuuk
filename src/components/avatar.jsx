import React from "react";
import { cn } from "../libs/cn";

export const Avatar = React.memo(({ className, src, alt, ...rests }) => {
  return src ? (
    <img
      {...rests}
      src={src}
      alt={alt}
      className={cn(
        " size-12 rounded-full object-cover  cursor-pointer border-2 border-white shadow-custom-shadow-sm",
        className
      )}
    />
  ) : (
    <span
      className={cn(
        " flex justify-center items-center text-lg uppercase size-12 rounded-full object-cover  cursor-pointer border-2 border-white shadow-custom-shadow-sm bg-primary text-white",
        className
      )}
    >
      {alt?.charAt(0)}
    </span>
  );
});
