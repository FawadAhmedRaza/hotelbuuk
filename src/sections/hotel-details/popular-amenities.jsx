"use client";
import React, { useState } from "react";
import { Pannel, Typography, Button, Iconify } from "@/src/components";
import { mockAmenities } from "@/src/_mock/_popolar-amentities";

export const PopularAmenities = React.memo(() => {
  const [showAll, setShowAll] = useState(false);
  const maxVisible = 12; 

  const handleToggleShow = () => {
    setShowAll(!showAll);
  };

  return (
    <Pannel className="flex flex-col gap-10 justify-start items-start bg-section-bg p-6">
      {/* Header */}
      <Typography variant="h3" className="font-medium">
        Most popular Amenities
      </Typography> 

      {/* Amenities list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-start md:justify-center items-start md:items-center w-full lg:w-[800px] gap-5">
        {mockAmenities
          .slice(0, showAll ? mockAmenities.length : maxVisible)
          .map((amenity) => (
            <div key={amenity.id} className="flex items-center gap-2">
              <Iconify iconName={amenity.icon} className="text-custom-grey" />
              <Typography variant="p" className="font-medium !text-base">
                {amenity.label}
              </Typography>
            </div>
          ))}
      </div>

      {/* Show/Hide button */}
      <Button onClick={handleToggleShow} className="mt-4">
        {showAll ? "Show Less" : `Show All (${mockAmenities.length})`}
      </Button>
    </Pannel>
  );
});
