import React from "react";

// Components and Others...
import { Button, Typography } from "@/src/components";
import { RHFInput, RHFTextArea } from "@/src/components/hook-form";

export const Pricing = () => {
  return (
    <div className="flex flex-col justify-between items-start gap-10 w-full h-full">
      <Typography variant="h4" className="font-semibold">
        Business Guest / Per Person
      </Typography>
      <div className="flex flex-col gap-5 w-1/2">
        <RHFInput
          name="business_meeting.title"
          label="Pricing"
          type="number"
          placeholder="Tesla Factory Tour "
          startIcon="marketeq:money-euro"
          startIconClass="size-8"
        />
      </div>
    </div>
  );
};
