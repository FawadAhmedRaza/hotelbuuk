"use client";
import { Button, Typography } from "@/src/components";

import React, { useState, useEffect } from "react";
import { Accordion } from "@/src/components";
import { RHFInput, RHFTextArea } from "@/src/components/hook-form";

export const GuestLearn = () => {
  const [isAccordionVisible, setAccordionVisible] = useState(false);
  
  // Get the form context
  const { watch } = useFormContext();

  // Watch the learning info values from the form state
  const learningInfo = watch("learning_info");

  // Check if the form fields (title and description) are filled
  useEffect(() => {
    // Automatically show the accordion when both fields are filled
    if (learningInfo?.title && learningInfo?.description) {
      setAccordionVisible(true);
    }
  }, [learningInfo]);

  const handleAdd = () => {
    // Set the accordion visible when the button is clicked
    setAccordionVisible(true);
  };

  return (
    <div className="flex flex-col justify-between items-start gap-10 w-full h-full">
      <Typography variant="h4" className="font-semibold">
        Topics
      </Typography>
      
      <div className="flex flex-col gap-3 w-full">
        <RHFInput
          name="learning_info.title"
          label="Title"
          placeholder="Title of your Topic"
        />
        <RHFTextArea
          name="learning_info.description"
          label="Description"
          placeholder="Description of your Topic"
        />

        <div className="flex justify-end items-end">
          <Button onClick={handleAdd}>Add</Button>
          <Button>Add</Button>
        </div>
      </div>

      {/* Conditionally render the Accordion only when visible */}
      {isAccordionVisible && (
        <div className="w-full">
          <Accordion title={learningInfo?.title} className="">
            <Typography variant="p">{learningInfo?.description}</Typography>
          </Accordion>
        </div>
      )}
    </div>
  );
};
