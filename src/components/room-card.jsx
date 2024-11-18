"use client";
import { useFormContext } from "react-hook-form";
import { Typography } from ".";
import ImageRender from "./ImageRenderer";
import { useEffect } from "react";

// Card component to display room information
export const RoomCard = ({ room, onSelect, isSelected }) => {
  const { watch } = useFormContext();
  const { room_images, room_name, maximum_occupancy, room_type, price } = room;
  const firstImage = room_images.length > 0 ? room_images[0].img : null;

  const currentRoom = watch("room_id");
  console.log(currentRoom);

  return (
    <div
      onClick={() => onSelect(room.id)} // Select the room on click
      className={`p-4 rounded-lg cursor-pointer flex flex-col mb-4 transition-all duration-200 ${
        isSelected || currentRoom === room.id
          ? "border-2 border-blue-500 bg-blue-50"
          : "border border-gray-300 bg-white"
      }`}
    >
      {firstImage && (
        <ImageRender
          src={firstImage}
          type={"server"}
          alt={`Uploaded Image`}
          delayTime={300}
          threshold={200}
          effect="blur"
          wrapperProps={{ style: { transitionDelay: "0.5s" } }}
          className="h-full w-full object-cover rounded-lg "
        />
      )}
      <Typography variant="h6" className="mt-2 font-semibold">
        {room_name}
      </Typography>

      <Typography variant="p" className="mt-1 text-gray-600">
        <strong>Max Occupancy:</strong> {maximum_occupancy}
      </Typography>
      <Typography variant="p" className="mt-1 text-gray-600">
        <strong>Room Type:</strong> {room_type}
      </Typography>
      <Typography variant="p" className="mt-1 font-semibold">
        Price: ${price}
      </Typography>
    </div>
  );
};
