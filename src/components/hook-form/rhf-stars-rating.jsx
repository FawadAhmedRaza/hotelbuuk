"use client";
import React, { useEffect, useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { Typography } from "../typography";
import { cn } from "@/src/libs/cn";
import get from "lodash/get";

export const RHFStarsRating = React.memo(
  ({ label, name, disabled = false, className }) => {
    const {
      control,
      formState: { errors },
      setValue,
    } = useFormContext();

    const watchedStars = useWatch({
      control,
      name,
    });

    const [rating, setRating] = useState(0); // State for clicked rating
    const [hoverRating, setHoverRating] = useState(0); // State for hover rating

    useEffect(() => {
      setRating(watchedStars || 0);
    }, [watchedStars]);

    const handleMouseEnter = (value) => {
      if (!disabled) {
        setHoverRating(value);
      }
    };

    const handleMouseLeave = () => {
      if (!disabled) {
        setHoverRating(0); // Reset hover state when mouse leaves
      }
    };

    const handleClick = (value) => {
      if (!disabled) {
        setValue(name, value);
        setRating(value); // Update the clicked rating
      }
    };

    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div
            className={cn(
              "relative flex flex-col gap-1 w-full items-center justify-center", // Centering the contents
              className,
              disabled && "cursor-not-allowed"
            )}
          >
            {label && (
              <Typography
                variant="p"
                className={`text-custom-black !text-sm ${
                  disabled ? "opacity-50" : ""
                } text-center`} // Center the label text
              >
                {label}
              </Typography>
            )}

            <div className="flex justify-center items-center mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-6 h-6 mx-1 cursor-pointer ${
                    star <= (hoverRating || rating)
                      ? "text-yellow-300"
                      : "text-gray-300 dark:text-gray-500"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                  onMouseEnter={() => handleMouseEnter(star)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick(star)}
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              ))}
            </div>

            {errors && (
              <Typography
                variant="p"
                className="!text-xs text-red-400 transition-all duration-500"
              >
                {get(errors, name)?.message}
              </Typography>
            )}
          </div>
        )}
      />
    );
  }
);
