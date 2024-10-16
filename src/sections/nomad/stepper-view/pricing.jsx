import React from "react";

// Components and Others...
import { Button, Typography } from "@/src/components";
import { RHFInput, RHFTextArea } from "@/src/components/hook-form";
import { price_includes } from "@/src/_mock/_popolar-amentities";

export const Pricing = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="flex flex-col  items-start gap-10 w-full h-full">
        <Typography variant="h4" className="font-semibold">
          Per Night Business Guest
        </Typography>
        <div className="flex flex-col gap-5 w-full">
          <RHFInput
            name="business_meeting.title"
            label="Pricing"
            type="number"
            placeholder="price "
            startIcon="marketeq:money-euro"
            startIconClass="size-8"
          />
        </div>
      </div>
      <div className="flex flex-col  items-start gap-10 w-full h-full">
        <Typography variant="h4" className="font-semibold">
          Price includes:
        </Typography>
        <div className="w-full">
          <ul className="grid grid-cols-2 gap-5 w-full list-disc">
            {price_includes.map((item) => (
              <li className="">{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
