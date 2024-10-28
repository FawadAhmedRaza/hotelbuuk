"use client";
import { Button, Typography } from "@/src/components";
import { useFormContext } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import React, { useState, useEffect } from "react";
import { Accordion } from "@/src/components";
import { RHFInput, RHFTextArea } from "@/src/components/hook-form";

export const GuestLearn = () => {
  const initialState = { title: "", description: "" };

  const [topicInfo, setTopicInfo] = useState(initialState);
  const [topics, setTopics] = useState([]);
  const [isAccordionVisible, setAccordionVisible] = useState(false);

  // Get the form context
  const { watch, setValue, getValues } = useFormContext();

  // Watch the learning info values from the form state
  const learningInfo = watch("learning_info");
  console.log("Learning Info", learningInfo);

  const formTopics = watch("topics");
  console.log("Form Topics", formTopics);

  const handleAdd = () => {
    const currentTopics = getValues("topics") || []; // Get existing topics (fallback to empty array)

    setTopics((prev) => [...prev, topicInfo]);

    setValue("topics", [...currentTopics, topicInfo], { shouldValidate: true });

    setTopicInfo({ title: "", description: "" });

    console.log("this is toic info", topicInfo);
  };

  const handleDelete = (id) => {
    const newTopics = topics.filter((topic) => topic.id !== id);

    const currentTopics = getValues("topics") || []; // Get current topics
    const updatedTopics = currentTopics.filter((_, index) => index !== id); // Remove the topic
    setValue("topics", updatedTopics, { shouldValidate: true }); // Update the fo
    setTopics(newTopics);
  };

  const handleChange = (e) => {
    console.log(e);
    setTopicInfo((prev) => ({
      ...prev,
      id: uuidv4(),
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex flex-col justify-between items-start gap-10 w-full h-full">
      <Typography variant="h4" className="font-semibold">
        What will guests learn from you? Add 3 only
      </Typography>

      <div className="flex flex-col gap-3 w-full">
        {/* <RHFInput
          // name="learning_info.title"
          name="title"
          label="Title"
          placeholder="Title of your Topic"
          value={topicInfo.title}
          onChange={handleChange}
        /> */}

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

        {/* <RHFTextArea
          // name="learning_info.description"
          name="description"
          label="Description"
          placeholder="Description of your Topic"
          value={topicInfo.description}
          onChange={handleChange}
        /> */}

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
          <Button onClick={handleAdd}>Add</Button>
        </div>
      </div>

      {/* Conditionally render the Accordion only when visible */}

      {/* {isAccordionVisible &&
        topics?.map((topic, index) => (
          <div key={index} className="w-full">
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
