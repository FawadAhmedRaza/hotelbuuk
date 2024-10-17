"use client";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Iconify, Typography } from "..";

const RHFAutoComplete = ({ label, name }) => {
  const { control, setValue } = useFormContext();
  const [tagValue, setTagValue] = useState("");
  const [tags, setTags] = useState([]);

  const addTags = (e) => {
    if (e.key === "Enter" && tagValue) {
      e.preventDefault();
      const newTag = { name: tagValue };
      setTags([...tags, newTag]);
      setValue(name, [...tags, newTag], { shouldValidate: true });
      setTagValue("");
    }
  };

  const deleteTag = (tag) => {
    const filteredTags = tags.filter((t) => t !== tag);
    setTags(filteredTags);
    setValue(name, filteredTags);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="relative flex-1 text-xs w-full mb-0.5">
          {label && (
            <Typography variant="p" className={`text-custom-black !text-sm`}>
              {label}
            </Typography>
          )}
          <div className="flex flex-wrap border border-gray-300 rounded-lg px-2 py-2">
            <div className="flex flex-wrap w-full">
              {tags.map((tag, index) => (
                <button
                  type="button"
                  key={index}
                  className="flex items-center bg-gray-200 px-2 py-1 rounded-lg mr-1"
                >
                  <span className="mr-1.5">{tag.name}</span>
                  <Iconify
                    iconName="basil:cross-solid"
                    onClick={() => deleteTag(tag)}
                    className="cursor-pointer text-[#616161] mt-0.5 font-bold hover:text-black"
                  />
                </button>
              ))}
              <input
                {...field}
                type="text"
                className="w-auto min-w-[100px] flex-1 py-1 bg-transparent border-none outline-none"
                value={tagValue}
                onChange={(event) => setTagValue(event.target.value)}
                onKeyDown={addTags}
                placeholder={!tags.length ? "Type and hit Enter" : ""}
              />
            </div>
          </div>
        </div>
      )}
    />
  );
};

export default RHFAutoComplete;
