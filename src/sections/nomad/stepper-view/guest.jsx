import React from "react";

// Components and Others...
import { Button, Typography } from "@/src/components";
import { RHFInput, RHFTextArea } from "@/src/components/hook-form";

export const GuestLearn = () => {
  return (
    <div className="flex flex-col justify-between items-start gap-10 w-full h-full">
      <Typography variant="h4" className="font-semibold">
        Topics
      </Typography>
      <div className="flex flex-col gap-3 w-full">
        <RHFInput
          name="title"
          label="Title"
          placeholder="Title of your Topic"
        />
        <RHFTextArea
          name="description"
          label="Description"
          placeholder="Description of your Topic"
        />
        <div className="flex justify-end items-end">
          <Button>Add</Button>
        </div>
      </div>
    </div>
  );
};
