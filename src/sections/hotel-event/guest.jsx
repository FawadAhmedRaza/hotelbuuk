"use client";
import { Button, Typography } from "@/src/components";
import { useFormContext } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import React, { useEffect, useState } from "react";
import { Accordion } from "@/src/components";

export const GuestLearn = () => {
  const initialState = { title: "", description: "" };

  const [topicInfo, setTopicInfo] = useState(initialState);
  const [topics, setTopics] = useState([]);

  const { watch, setValue, getValues } = useFormContext();

  const formTopics = watch("topics");

  const handleAdd = () => {
    const currentTopics = getValues("topics") || []; // Get existing topics (fallback to empty array)

    setTopics((prev) => [...prev, topicInfo]);

    setValue("topics", [...currentTopics, topicInfo], { shouldValidate: true });

    setTopicInfo({ title: "", description: "" });
  };

  const handleDelete = (id) => {
    const newTopics = topics.filter((topic) => topic.id !== id); // Filter topics by id
    setTopics(newTopics); // Update state

    // Update form topics
    setValue("topics", newTopics, { shouldValidate: true });
  };

  const handleChange = (e) => {
    setTopicInfo((prev) => ({
      ...prev,
      id: uuidv4(),
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    setTopics(formTopics);
  }, []);

  return (
    <div className="flex flex-col justify-between items-start gap-10 w-full h-full">
      <Typography variant="h4" className="font-semibold">
        What will guests learn from you? Add 3 only
      </Typography>

      <div className="flex flex-col gap-3 w-full">
        {/* Input */}
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
              value={topicInfo.title}
              onChange={(e) => handleChange(e)}
              placeholder="Finding the best Chinese Suppliers"
              className={`w-full text-sm rounded-md outline-none px-2 placeholder:text-neutral-300 text-secondary bg-transparent `}
            />
          </div>
        </div>

        {/* TextArea */}
        <div className={" relative flex flex-col gap-1 w-full"}>
          <Typography
            variant={"p"}
            className={`text-custom-black !text-sm bg-white absolute -top-2.5  left-3 `}
          >
            Description
          </Typography>

          <textarea
            name="description"
            value={topicInfo.description}
            onChange={(e) => handleChange(e)}
            placeholder="Description "
            rows={6}
            className="w-full border bg-white text-sm py-2 px-4  rounded-md outline-none border-custom-neutral placeholder:text-neutral-300  text-secondary  resize-none"
          />
        </div>

        <div className="flex justify-end items-end">
          <Button
            disabled={
              topicInfo?.title?.length < 3 || topicInfo?.description?.length < 3
            }
            onClick={handleAdd}
          >
            Add
          </Button>
        </div>
      </div>

      {/* Conditionally render the Accordion only when visible */}

      {formTopics &&
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
        ))}
    </div>
  );
};
