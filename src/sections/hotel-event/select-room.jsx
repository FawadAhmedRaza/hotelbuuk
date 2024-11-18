"use client";
import React, { useEffect, useState } from "react";
import { Button, RoomCard, Typography } from "@/src/components";
import { useSelector } from "react-redux";
import { useFormContext } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

export const SelectRoom = () => {
  const { rooms, isLoading } = useSelector((state) => state.rooms.getAllRooms);
  const [selectedRoomId, setSelectedRoomId] = useState(null); // Manage the selected room
  const { control, setValue } = useFormContext(); // For form handling (if needed)

  const handleRoomSelect = (roomId) => {
    setSelectedRoomId(roomId); // Update the selected room ID
    setValue("room_id", roomId); // Optionally update form data if needed
  };

  if (isLoading) {
    return (
      <Typography variant="h3" className="text-center">
        Loading rooms...
      </Typography>
    );
  }

  return (
    <div className="flex flex-col justify-between items-start gap-10 w-full h-full">
      {" "}
      <Typography variant="h4" className="mb-3 text-center font-semibold">
        Select a Room
      </Typography>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {rooms && rooms.length > 0 ? (
          rooms.map((room) => (
            <RoomCard
              key={room.id} // Unique key for each room card
              room={room}
              onSelect={handleRoomSelect}
              isSelected={selectedRoomId === room.id} // Check if this room is selected
            />
          ))
        ) : (
          <Typography className="text-center">No rooms available</Typography>
        )}
      </div>
    </div>
  );
};
