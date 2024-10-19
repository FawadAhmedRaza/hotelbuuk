"use client";
import React from "react";
import { Iconify, Typography } from ".";

const Built = ({ children }) => {
  return (
    <div className="flex gap-2 items-center mt-1">
      <Iconify
        className="text-black size-4"
        iconName="radix-icons:dot-filled"
      />
      <Typography className="!font-medium !text-[14px]" variant="p">
        {children}
      </Typography>
    </div>
  );
};

export default Built;
