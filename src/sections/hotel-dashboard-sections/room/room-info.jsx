"use client";
import React, { useEffect, useState } from "react";

// Components and Others...
import {
  RHFCheckbox,
  RHFImageSelect,
  RHFInput,
  RHFRadio,
  RHFSelect,
  RHFTextArea,
} from "@/src/components/hook-form";
import { useForm, useFormContext } from "react-hook-form";
import { Button, Iconify, Typography } from "@/src/components";

import { room_facilities, roomTypes } from "@/src/_mock/_room";
import { useModal } from "@/src/hooks/use-modal";
import { LocalStorageGetItem } from "@/src/utils/localstorage";
import AmenitiesModal from "@/src/screens/hotel-info/components/amenities-modal";
import { RoomTypeModal } from ".";

const initialFacilities = [
  { title: "Free WI-FI", value: "freeWI-FI" },
  { title: "Parking", value: "parking" },
  { title: "Pool", value: "pool" },
  { title: "Gym", value: "gym" },
  { title: "Restaurant", value: "restaurant" },
];
export const RoomInfo = () => {
  const [facilitiesArray, setFacilitiesArray] = useState(initialFacilities);
  const [refetch, setRefetch] = useState(false);

  const { watch, setValue, handleSubmit } = useFormContext();
  const selectedFacilities = watch("facilities", {});

  const openModal = useModal();

  // On component mount, fetch stored amenities and update facilities
  useEffect(() => {
    const storedAmenities = LocalStorageGetItem("amenities");
    if (storedAmenities) {
      const parsedAmenities = JSON.parse(storedAmenities)?.amenities || [];
      const newFacilities = parsedAmenities.map((item) => ({
        title: item.name, // Assuming name field from amenities
        value: item.name.toLowerCase().replace(/\s+/g, ""), // Generate a key for facility
      }));

      // Avoid duplicating facilities
      setFacilitiesArray((prevArray) => {
        const existingFacilities = new Set(prevArray.map((f) => f.value)); // Create a set for fast lookup
        const filteredNewFacilities = newFacilities.filter(
          (facility) => !existingFacilities.has(facility.value) // Add only unique facilities
        );
        return [...prevArray, ...filteredNewFacilities];
      });
    }
  }, [refetch]);

  const handleCheckboxChange = (key, checked) => {
    setValue("facilities", {
      ...selectedFacilities,
      [key]: checked,
    });
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-5 lg:gap-10 w-full h-full">
        {/* left  */}
        <div className="flex flex-col gap-5 w-full">
          <RHFInput
            name="room_name"
            label="Room Name"
            placeholder="Room Name "
          />
          <RHFTextArea
            name="description"
            label="Description"
            required={true}
            placeholder="Describe your Business Tour "
          />
          <RHFInput
            name="maximum_occupancy"
            label="Maximum Occupancy"
            placeholder="Maximum Occupancy"
          />
          <div className="flex flex-col gap-5 ">
            <Typography variant="h4" className="font-semibold">
              Room Facilities
            </Typography>
            <div className="grid grid-cols-1  md:grid-cols-3 gap-3 py-5 lg:py-0">
              {room_facilities.map((amenity, index) => (
                <RHFCheckbox
                  key={index}
                  name={amenity.name}
                  label={amenity.label}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Right  */}
        <div className="flex flex-col justify-between items-start gap-10 w-full h-full">
          <RHFSelect
            name="room_type"
            placeholder="Select Room Type"
            label="Room Type"
            options={roomTypes}
          />

          <div className="flex flex-col gap-5 w-full">
            <RHFInput
              name="price"
              label="Pricing"
              type="number"
              placeholder="price "
              startIcon="marketeq:money-euro"
              startIconClass="size-8"
            />
          </div>

          <div className="flex flex-col gap-3 w-full mt-6">
            <div className="flex flex-row gap-4">
              <Typography variant="h6" className="font-medium">
                Add Room Type
              </Typography>
              <Typography
                variant="h6"
                className="font-medium text-primary hover:cursor-pointer"
                onClick={() => openModal.onTrue()} // Open modal on click
              >
                <Iconify iconName="tabler:plus" />
              </Typography>
            </div>

            <div className="  grid grid-cols-2 gap-4">
              {facilitiesArray?.map((facility, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={!!selectedFacilities[facility.value]}
                    onChange={(e) =>
                      handleCheckboxChange(facility.value, e.target.checked)
                    }
                    className="h-4 w-4 rounded-xl border border-black accent-primary transition-colors duration-200"
                  />
                  <label
                    className="text-sm text-gray-700 cursor-pointer select-none font-montserrat font-medium"
                    htmlFor={facility.title}
                  >
                    {facility?.title}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {openModal.onTrue && (
        <RoomTypeModal
          setRefetch={setRefetch}
          isOpen={openModal.value}
          onClose={openModal.onFalse}
        />
      )}
    </div>
  );
};
