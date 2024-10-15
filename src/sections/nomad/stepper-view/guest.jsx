"use client";

import React, { useState } from "react";

// Components and Others...
import { Button, Typography } from "@/src/components";
import { RHFInput, RHFTextArea } from "@/src/components/hook-form";
import { useFormContext } from "react-hook-form";

export const GuestLearn = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    console.log(title, description);
  };

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
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <RHFTextArea
          name="description"
          label="Description"
          placeholder="Description of your Topic"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <div className="flex justify-end items-end">
          <Button onClick={handleSubmit}>Add</Button>
        </div>
      </div>
    </div>
  );
};
