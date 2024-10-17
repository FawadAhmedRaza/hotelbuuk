import React from "react";

// Components and Others...
import { Button, Iconify, Typography } from "@/src/components";
import { RHFInput, RHFTextArea } from "@/src/components/hook-form";
import { price_includes } from "@/src/_mock/_popolar-amentities";

export const Pricing = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col  items-start gap-10 w-full lg:w-1/2 h-full">
        <Typography variant="h4" className="font-semibold">
          Per Night Business Guest
        </Typography>
        <div className="flex flex-col gap-5 w-full">
          <RHFInput
            name="price"
            label="Pricing"
            type="number"
            placeholder="price "
            startIcon="marketeq:money-euro"
            startIconClass="size-8"
          />
        </div>
      </div>
      <div className="flex flex-col  items-start gap-10 lg:w-1/2 h-full">
        <Typography variant="h4" className="font-semibold">
          Price includes:
        </Typography>
        <div className="w-full">
          <ul className="grid grid-cols-2 gap-5 w-full ">
            {price_includes.map((item) => (
              <div className="flex gap-2 items-center">
                <Iconify
                  iconName="material-symbols:check"
                  className="text-black"
                />
                <li className="">{item}</li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
