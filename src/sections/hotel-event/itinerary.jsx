"use client";
import { Button, Typography } from "@/src/components";
import { useFormContext } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import React, { useEffect, useState } from "react";
import { Accordion } from "@/src/components";
import { RHFLocationSelect } from "@/src/components/hook-form/rhf-location-select";

export const Itinerary = () => {
  const initialState = { title: "", stop: "", location: "" };

  const [singleLocation, setSingleLocation] = useState(initialState);
  const [allLocations, setAllLocations] = useState([]);

  const { watch, setValue, getValues } = useFormContext();

  //   const formTopics = watch("topics");

  const handleAdd = () => {
    const currentLocations = getValues("locations") || []; // Get existing topics (fallback to empty array)

    setAllLocations((prev) => [...prev, singleLocation]);

    setValue("topics", [...currentLocations, singleLocation], {
      shouldValidate: true,
    });

    setTopicInfo(initialState);
  };

  const handleDelete = (id) => {
    const newLocation = allLocations.filter((loc) => loc.id !== id); // Filter topics by id
    setAllLocations(newLocation); // Update state

    // Update form topics
    // setValue("topics", newTopics, { shouldValidate: true });
  };

  const handleChange = (e) => {
    setSingleLocation((prev) => ({
      ...prev,
      id: uuidv4(),
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    // setAllLocations(formTopics);
  }, []);

  return (
    <div className="flex flex-col justify-between items-start gap-10 w-full h-full">
      <Typography variant="h4" className="font-semibold">
        What will guests learn from you? Add 3 only
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
                placeholder="Finding the best Chinese Suppliers"
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
              Stop
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
                placeholder="Finding the best Chinese Suppliers"
                className={`w-full text-sm rounded-md outline-none px-2 placeholder:text-neutral-300 text-secondary bg-transparent `}
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className={"relative flex flex-col gap-1 w-full"}>
          {/* <Typography
            variant="p"
            className={`text-custom-black !text-sm bg-white absolute -top-2.5 left-3 `}
          >
            Location
          </Typography>
          <div
            className={
              "flex items-center rounded bg-white h-12 px-2 gap-2 border border-custom-neutral"
            }
          >
            <input
              name="location"
              type="text"
              value={singleLocation.location}
              onChange={(e) => handleChange(e)}
              placeholder="Finding the best Chinese Suppliers"
              className={`w-full text-sm rounded-md outline-none px-2 placeholder:text-neutral-300 text-secondary bg-transparent`}
            />
          </div> */}
          <RHFLocationSelect
            name="itinerary.location"
            label="Street Address"
            placeholder="Address of your B&B"
            className={"w-full"}
          />
        </div>

        <div className="flex justify-end items-end">
          <Button
            disabled={
              singleLocation?.title?.length < 3 ||
              singleLocation?.stop?.length < 3 ||
              singleLocation?.location?.length < 3
            }
            onClick={handleAdd}
          >
            Add
          </Button>
        </div>
      </div>

      {/* Conditionally render the Accordion only when visible */}

      {/* {formTopics &&
        formTopics?.map((topic) => (
          <div key={topic.id} className="w-full">
            <Accordion
              id={topic.id}
              title={topic?.title}
              className=""
              deleteTopic={handleDelete}
            >
              <Typography variant="p">{topic?.description}</Typography>
            </Accordion>
          </div>
        ))} */}
    </div>
  );
};
