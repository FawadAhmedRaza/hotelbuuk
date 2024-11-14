"use client";
import React, { useState } from "react";

import { useFormContext } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { Button, Typography } from "@/src/components";
import { Accordion } from "@/src/components";
import { RHFLocationSelect } from "@/src/components/hook-form/rhf-location-select";

export const Itinerary = () => {
  const initialState = { title: "", stop: "", location: "" };

  const [singleLocation, setSingleLocation] = useState(initialState);

  const { watch, setValue, getValues } = useFormContext();

  const itinerary = watch("itinerary");

  const handleAdd = () => {
    const prevItinerary = watch("itinerary") || [];
    setValue("itinerary", [...prevItinerary, singleLocation], {
      shouldValidate: true,
    });
    setSingleLocation(initialState);
  };

  const handleDelete = (id) => {
    const filtered = itinerary.filter((loc) => loc?.id !== id);
    setValue("itinerary", filtered, { shouldValidate: true });
  };

  const handleChange = (e) => {
    if (e?.target?.name) {
      setSingleLocation((prev) => ({
        ...prev,
        id: uuidv4(),
        [e.target.name]: e.target.value,
      }));
    } else {
      setSingleLocation((prev) => ({
        ...prev,
        location: e,
      }));
    }
  };

  return (
    <div className="flex flex-col justify-between items-start gap-10 w-full h-full">
      <Typography variant="h4" className="font-semibold">
        Add Itineraries
      </Typography>

      <div className="flex flex-col gap-3 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Title */}
          <div className={"relative flex flex-col gap-1 w-full"}>
            <Typography
              variant="p"
              className={`text-custom-black !text-sm bg-white absolute -top-2.5 left-3 `}
            >
              Title
            </Typography>
            <div
              className={
                "flex items-center rounded bg-white h-12 px-2 gap-2 border border-custom-neutral"
              }
            >
              <input
                name="title"
                type="text"
                value={singleLocation.title}
                onChange={(e) => handleChange(e)}
                placeholder="Enter title"
                className={`w-full text-sm rounded-md outline-none px-2 placeholder:text-neutral-300 text-secondary bg-transparent `}
              />
            </div>
          </div>

          {/* Stop */}
          <div className={"relative flex flex-col gap-1 w-full"}>
            <Typography
              variant="p"
              className={`text-custom-black !text-sm bg-white absolute -top-2.5 left-3 `}
            >
              Duration
            </Typography>
            <div
              className={
                "flex items-center rounded bg-white h-12 px-2 gap-2 border border-custom-neutral"
              }
            >
              <input
                name="stop"
                type="text"
                value={singleLocation.stop}
                onChange={(e) => handleChange(e)}
                placeholder="Enter stop time eg: 10 minutes"
                className={`w-full text-sm rounded-md outline-none px-2 placeholder:text-neutral-300 text-secondary bg-transparent `}
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className={"relative flex flex-col gap-1 w-full"}>
          <div
            className={
              "flex items-center rounded bg-white h-12 gap-2 mt-3 w-full"
            }
          >
            <RHFLocationSelect
              name="location"
              label="Street Address"
              value={singleLocation.location}
              placeholder="Search Stop location..."
              className={"w-full placeholder:text-neutral-300"}
              onChange={(details) => {
                handleChange(details);
              }}
            />
          </div>
        </div>

        <div className="flex justify-end items-end">
          <Button
            disabled={
              singleLocation?.title?.length < 3 ||
              singleLocation?.stop?.length < 3 ||
              !singleLocation?.location
            }
            className="!bg-black"
            onClick={handleAdd}
          >
            Add
          </Button>
        </div>
      </div>

      {itinerary &&
        itinerary?.map((topic) => (
          <div key={topic.id} className="w-full">
            <Accordion
              id={topic.id}
              title={topic?.title}
              className=""
              deleteTopic={handleDelete}
              isOpen={true}
            >
              <Typography variant="body1">
                {topic?.location?.formatted_address || topic?.location}
              </Typography>
            </Accordion>
          </div>
        ))}
    </div>
  );
};
