"use client";
import React from "react";

import {
  RHFInput,
  RHFTextArea,
  RHFUploadAvatar,
} from "@/src/components/hook-form";
import { RHFStarsRating } from "@/src/components/hook-form/rhf-stars-rating";

import { Typography } from "@/src/components";
import { useFormContext } from "react-hook-form";
import { useModal } from "@/src/hooks/use-modal";
import AmenitiesModal from "./amenities-modal";

let array = [
  { title: "Free WI-FI", value: "freeWI-FI" },
  { title: "Parking", value: "parking" },
  { title: "Pool", value: "pool" },
  { title: "Gym", value: "gym" },
  { title: "Restaurent", value: "restaurent" },
];

const HotelInfoForm = () => {
  const { watch, setValue } = useFormContext();
  const selectedFacilities = watch("facilites", {});

  const openModal = useModal();

  const handleCheckboxChange = (key, checked) => {
    setValue("facilites", {
      ...selectedFacilities,
      [key]: checked,
    });
  };

  return (
    <div className="gap-y-4">
      {/* <Typography variant="h3" className="font-bold text-primary">
        Hotel Information
      </Typography> */}

      <div className="flex flex-col w-full h-full justify-center items-center content-center mt-0">
        <RHFUploadAvatar name="hotel_image" />

        <RHFStarsRating name="stars" label="Stars Rating" className="mt-6" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full h-full mt-6">
        <div className="flex flex-col gap-5">
          <RHFInput
            name="hotel_name"
            label="Hotel Name"
            placeholder="Movenpick hotel"
            // className="mt-6"
          />
          <RHFTextArea
            name="description"
            label="Hotel Description"
            placeholder="Enter Hotel description"
            // className="mt-6"
          />

          <div className="flex flex-col gap-3 w-full mt-6">
            <div className="flex flex-row gap-4">
              <Typography variant="h6" className="font-medium">
                Hotel Facilities
              </Typography>
              <Typography
                variant="h6"
                className="font-medium text-blue-600 hover:cursor-pointer"
                onClick={() => openModal.onTrue()}
              >
                Create
              </Typography>
            </div>

            {array.map((facility, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={!!selectedFacilities[facility.value]}
                  onChange={(e) =>
                    handleCheckboxChange(facility.value, e.target.checked)
                  }
                  className="h-4 w-4 rounded-xl border border-black  accent-primary transition-colors duration-200"
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
        <div className="flex flex-col gap-5">
          <RHFInput
            name="contact_email"
            label="Contact E-mail"
            placeholder="support@movenpick.com"
            // className="mt-6"
          />
          <RHFInput
            type="number"
            name="hotel_contact_no"
            label="Contact number"
            placeholder="Enter Contact number"
            // className="mt-6"
          />

          <RHFInput
            name="country"
            label="Country"
            placeholder="Enter Country"
            // className="mt-6"
          />
          <RHFInput
            name="city"
            label="City"
            placeholder="Enter City"
            // className="mt-6"
          />
          <RHFInput
            name="address"
            label="Address"
            placeholder="Enter Address"
            // className="mt-6"
          />
        </div>
      </div>

      {openModal.onTrue && (
        <AmenitiesModal isOpen={openModal.value} onClose={openModal.onFalse} />
      )}
    </div>
  );
};

export default HotelInfoForm;
