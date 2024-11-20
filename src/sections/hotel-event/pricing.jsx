"use client";
import React from "react";

// Components and Others...
import { Button, Iconify, Typography } from "@/src/components";
import { RHFInput, RHFTextArea } from "@/src/components/hook-form";
import { price_includes } from "@/src/_mock/_popolar-amentities";
import { useFormContext } from "react-hook-form";

export const Pricing = () => {
  const { watch } = useFormContext();
  const price = watch("price");

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col  items-start gap-10 w-full  h-full">
        <div className="flex flex-col gap-5">
          <Typography variant="h4" className="font-semibold">
            For B&B Accommodation Only
          </Typography>
          <Typography variant="h4" className="font-semibold">
            Price Per Night
          </Typography>
        </div>

        <div className="flex items-center gap-5 w-full">
          <RHFInput
            name="price"
            label="Pricing"
            type="number"
            className="w-1/2"
            placeholder="price "
            startIcon="marketeq:money-euro"
            startIconClass="size-8"
          />
          <Typography variant="h4">Per Night / Business Guest</Typography>
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
      <div className="flex flex-col  items-start gap-10 lg:w-1/2 h-full">
        <div className="flex justify-between w-full">
          <Typography variant="h4" className="font-semibold">
            Expected Payout:
          </Typography>
          <Typography variant="h4" className="font-semibold">
            ${((price / 100) * (price <= 50 ? 75 : 85)).toFixed(2)}
          </Typography>
        </div>
        <div className="w-full">
          <Typography variant="h5" className="text-red-500">
            *Hotelbuuk deducts a small service fee between 15% and 25% before
            payout.
          </Typography>
        </div>
      </div>
    </div>
  );
};
