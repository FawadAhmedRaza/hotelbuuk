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
            name="room_info.room_name"
            label="Room Name"
            placeholder="Room Name "
          />
          <RHFTextArea
            name="room_info.description"
            label="Description"
            required={true}
            placeholder="Describe your Business Tour "
          />
          <RHFInput
            name="room_info.maximum_occupancy"
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
                  name={`room_info.room_facilities.${amenity.name}`}
                  label={amenity.label}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Right  */}
        <div className="flex flex-col justify-between items-start gap-10 w-full h-full">
          <RHFSelect
            name="room_info.room_type"
            placeholder="Select Room Type"
            label="Room Type"
            options={roomTypes}
          />

          <div className="flex flex-col gap-5 w-full">
            <RHFInput
              name="room_info.price"
              label="Pricing"
              type="number"
              placeholder="price "
              startIcon="marketeq:money-euro"
              startIconClass="size-8"
            />
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
