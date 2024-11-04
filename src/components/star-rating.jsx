import { cn } from "@/lib/utils";
import React from "react";

export const StarRating = ({ rating, className }) => {
  const roundedRating = Math.round(rating); // Round the decimal rating to nearest integer

  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, index) => {
        const currentRating = index + 1;
        return (
          <span
            key={index}
            className={cn(
              `text-2xl ${
                currentRating <= roundedRating
                  ? "text-yellow-500"
                  : "text-gray-300"
              }`,
              className
            )}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};
