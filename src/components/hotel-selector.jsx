"use client";
import React, { useMemo, useState } from "react";
import {
  ProfileAvatar,
  Typography,
  Button,
  HotelSelectCard,
} from "@/src/components";
import { useFormContext } from "react-hook-form";

const HotelSelector = ({ hotels }) => {
  const { setValue, watch } = useFormContext();
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  // Get the selected hotel_id from the form data
  const selectedHotelIdFromForm = watch("business_meeting.hotel_id");

  // Rearrange hotels so the selected one appears first
  const reorderedHotels = useMemo(() => {
    if (!selectedHotelIdFromForm || !hotels) return hotels;
    const selectedHotel = hotels.find(
      (hotel) => hotel.id === selectedHotelIdFromForm
    );
    const otherHotels = hotels.filter(
      (hotel) => hotel.id !== selectedHotelIdFromForm
    );
    return selectedHotel ? [selectedHotel, ...otherHotels] : hotels;
  }, [selectedHotelIdFromForm, hotels]);

  const [selectedHotelId, setSelectedHotelId] = useState(
    selectedHotelIdFromForm
  ); // State for selected hotel
  const [visibleCount, setVisibleCount] = useState(4); // Number of visible hotels

  // Filter hotels based on the search query
  const filteredHotels = reorderedHotels?.filter((hotel) =>
    hotel?.hotel_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectHotel = (hotelId) => {
    setSelectedHotelId(hotelId); // Set the selected hotel ID
    setValue("business_meeting.hotel_id", hotelId); // Update the form value
  };

  const showMoreHotels = () => {
    setVisibleCount((prevCount) => prevCount + 4); // Increase the number of visible hotels
  };

  return (
    <div className="w-full mx-auto">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for a hotel..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-6"
      />
      <Typography variant="h4" className="mb-4 font-bold">
        Select a Hotel
      </Typography>
      {/* Hotel Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredHotels && filteredHotels.length > 0 ? (
          filteredHotels
            .slice(0, visibleCount) // Display only up to the visible count
            .map((hotel) => (
              <HotelSelectCard
                key={hotel.id}
                hotel={hotel}
                isSelected={selectedHotelId === hotel.id}
                onSelect={handleSelectHotel}
              />
            ))
        ) : (
          <Typography className="text-center w-full">
            No hotels match your search.
          </Typography>
        )}
      </div>

      {/* Show More Button */}
      {filteredHotels?.length > visibleCount && (
        <div className="text-center mt-6">
          <Button onClick={showMoreHotels} className={"bg-black"}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default HotelSelector;
