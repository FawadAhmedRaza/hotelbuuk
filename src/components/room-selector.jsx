"use client";
import React, { useEffect, useState } from "react";
import { Typography, Button, ProfileAvatar } from "@/src/components";

const RoomSelector = ({
  rooms,
  selectedHotelId,
  onRoomSelect,
  preselectedRoomId,
}) => {
  const [selectedRoomId, setSelectedRoomId] = useState(
    preselectedRoomId || null
  ); // Set initial room as preselectedRoomId
  const [visibleCount, setVisibleCount] = useState(4); // Number of visible rooms

  // Filter and reorder rooms based on the selected hotel ID
  const filteredRooms = rooms?.filter(
    (room) => room.hotel_id === selectedHotelId
  );

  const reorderedRooms = React.useMemo(() => {
    if (preselectedRoomId) {
      // Move preselected room to the front
      const preselectedRoom = filteredRooms.find(
        (room) => room.id === preselectedRoomId
      );
      const otherRooms = filteredRooms.filter(
        (room) => room.id !== preselectedRoomId
      );
      return preselectedRoom ? [preselectedRoom, ...otherRooms] : filteredRooms;
    }
    return filteredRooms;
  }, [filteredRooms, preselectedRoomId]);

  const handleSelectRoom = (roomId) => {
    setSelectedRoomId(roomId); // Update selected room ID
    if (onRoomSelect) {
      onRoomSelect(roomId); // Notify parent component of the selection
    }
  };

  const showMoreRooms = () => {
    setVisibleCount((prevCount) => prevCount + 4); // Show more rooms
  };

  // Reset selected room when the hotel changes
  useEffect(() => {
    if (selectedHotelId) {
      setSelectedRoomId(preselectedRoomId || null); // Clear or reset room selection
    }
  }, [selectedHotelId, preselectedRoomId]);

  return (
    <div className="w-full mx-auto mt-8">
      <Typography variant="h4" className="mb-4 font-bold">
        Select a Room
      </Typography>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {reorderedRooms && reorderedRooms.length > 0 ? (
          reorderedRooms
            .slice(0, visibleCount) // Display up to visible count
            .map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                isSelected={selectedRoomId === room.id}
                onSelect={handleSelectRoom}
              />
            ))
        ) : (
          <Typography variant="h5" className="text-center w-full">
            No rooms available for this hotel.
          </Typography>
        )}
      </div>

      {reorderedRooms?.length > visibleCount && (
        <div className="text-center mt-6">
          <Button onClick={showMoreRooms} className="bg-black">
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

// RoomCard Component
const RoomCard = ({ room, isSelected, onSelect }) => {
  const { id, room_name, room_images, price } = room;

  return (
    <div
      onClick={() => onSelect(id)} // Handle selection
      className={`p-4 rounded-lg cursor-pointer flex flex-col items-start transition-all duration-200 border ${
        isSelected
          ? "border-blue-500 bg-blue-50 shadow-lg"
          : "border-gray-300 bg-white"
      }`}
    >
      {/* Room Image */}
      {room_images?.length > 0 ? (
        <ProfileAvatar
          src={room_images[0]?.img}
          effect="blur"
          iconSize="!size-28"
          type={"server"}
          className="h-40 w-full object-cover rounded-md mb-4"
        />
      ) : (
        <div className="h-40 w-full bg-gray-200 rounded-md mb-4 flex items-center justify-center">
          <Typography className="text-gray-500">No Image</Typography>
        </div>
      )}

      {/* Room Info */}
      <Typography variant="h6" className="font-semibold mb-2">
        {room_name}
      </Typography>
      <Typography variant="body1" className="font-semibold">
        ${price} / night
      </Typography>
    </div>
  );
};

export default RoomSelector;
