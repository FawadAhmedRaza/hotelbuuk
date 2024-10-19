"use client";
import React, { useState } from "react";

// Components and Others...
import { Controller, useFormContext } from "react-hook-form";
import { Typography } from "../typography";
import { cn } from "@/src/libs/cn";
import { BgIcon } from "../bg-icon";

export const RHFProfileImgUploader = ({
  name,
  defaultImg,
  className,
  imageClass,
  buttonClass,
}) => {
  const formContext = useFormContext();
  const { control, setValue } = formContext || {};
  const [imagePreview, setImagePreview] = useState(defaultImg);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL?.createObjectURL(file));
      if (setValue) {
        setValue(name, file);
      }
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState: { errors } }) => {
        console.log(field.value);
        return (
          <div
            className={cn(
              "flex flex-col gap-2 h-fit w-fit overflow-hidden z-20",
              className
            )}
          >
            <div className=" group relative flex justify-center items-center rounded-full border border-custom-grey-100 bg-custom-grey-100 w-40 md:w-44 h-40 md:h-44 shadow-sm mx-auto overflow-hidden">
              {field.value || imagePreview ? (
                <img
                  src={
                    field.value
                      ? URL?.createObjectURL(field.value)
                      : imagePreview
                  }
                  alt="Uploaded"
                  className={cn("object-contain h-full w-full", imageClass)}
                />
              ) : (
                <label>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <BgIcon
                    iconName="solar:camera-bold"
                    iconClass={`size-6 ${buttonClass}`}
                    className="size-12 bg-primary"
                  />
                </label>
              )}

              {/* Overlay for changing image */}
              {field.value || defaultImg ? (
                <div className="absolute inset-0 hidden group-hover:flex justify-center items-center bg-black bg-opacity-50 transition-all duration-500  ">
                  <label>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <BgIcon
                      iconName="solar:camera-bold"
                      iconClass={`size-6 ${buttonClass}`}
                      className="size-12 bg-primary"
                    />
                  </label>
                </div>
              ) : null}
            </div>

            {errors[name] && (
              <Typography
                variant="p"
                className="text-xs text-red-400 transition-all duration-500 font-medium"
              >
                {errors[name]?.message}
              </Typography>
            )}
          </div>
        );
      }}
    />
  );
};
