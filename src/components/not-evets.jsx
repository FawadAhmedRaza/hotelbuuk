"use client";
import React from "react";
import { Card, Typography, Iconify } from "@/src/components";

const NoEvents = ({ message }) => {
  return (
    <Card className="p-5 rounded-xl shadow-md border flex flex-col items-center justify-center space-y-4">
      {/* Icon to signify no results, styled to match the theme */}
      <Iconify
        iconName="mdi:hotel-off-outline"
        className="text-gray-500 text-6xl"
      />

      {/* Message for no hotel events */}
      <Typography
        variant="h4"
        className="font-semibold text-lg md:text-xl text-gray-700 text-center"
      >
        {message}
      </Typography>
      <Typography
        variant="p"
        className="text-gray-500 text-sm md:text-base text-center"
      >
        Try adjusting your filters or check back later for more listings.
      </Typography>
    </Card>
  );
};

export default NoEvents;
