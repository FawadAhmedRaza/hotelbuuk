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
import { Button, Typography } from "@/src/components";

import { bnb_amenities } from "@/src/_mock/_popolar-amentities";
import { businessCategories } from "@/src/_mock/_business_categories";
import { hotels } from "@/src/_mock/_hotel-qna";
import { getCities, getCountries } from "@/src/libs/helper";
import { useSelector } from "react-redux";
import { useBoolean } from "@/src/hooks";
import { useModal } from "@/src/hooks/use-modal";
import CreateEditAmenities from "./modals/create-edit-amenities";

export const BussinessMeeting = () => {
  const { watch, setValue } = useFormContext();
  const openAmenitiesModal = useModal();

  const { amenities } = useSelector((state) => state.eventAmenities);
  const { nomads } = useSelector((state) => state.nomadProfile);

  let modifiedNomadList = nomads?.map((item) => {
    return {
      hotel_name: item?.first_name + " " + item?.last_name,
      image: item?.profile_img,
      address: item?.email,
      value: item?.id,
    };
  });

  const selectedAmenities = watch("business_meeting.amenities") || [];

  const handleCheckboxChange = (amenity, checked) => {
    setValue(
      "business_meeting.amenities",
      checked
        ? [...selectedAmenities, amenity] // add if checked
        : selectedAmenities.filter((selected) => selected.name !== amenity.name) // remove if unchecked
    );
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-5 lg:gap-10 w-full h-full">
        {/* left  */}
        <div className="flex flex-col gap-5 w-full">
          <RHFInput
            name="business_meeting.title"
            label="Title"
            placeholder="Tesla Factory Tour "
          />
          <RHFTextArea
            name="business_meeting.description"
            label="Description"
            required={true}
            placeholder="Describe your Business Tour "
          />
          <RHFInput
            name="business_meeting.official_name"
            label="Official Name"
            placeholder="John Tesla Factory Tour"
          />
          <div className="flex flex-col gap-5 ">
            <div className="flex gap-3 justify-start items-center">
              <Typography variant="h4" className="font-semibold">
                Available Amenities in your B&B
              </Typography>
              <Typography
                variant="h5"
                className="font-semibold !text-primary cursor-pointer"
                onClick={openAmenitiesModal.onTrue}
              >
                Add more
              </Typography>
            </div>
            <div className="grid grid-cols-1  md:grid-cols-3 gap-3 py-5 lg:py-0">
              {amenities?.map((amenity, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    id={amenity?.name}
                    type="checkbox"
                    checked={selectedAmenities?.some(
                      (selected) => selected?.name === amenity?.name
                    )} // check if the facility is selected
                    onChange={(e) =>
                      handleCheckboxChange(amenity, e.target.checked)
                    }
                    className="h-4 w-4 rounded-xl border border-black accent-primary transition-colors duration-200"
                  />
                  <label
                    className="text-sm text-gray-700 cursor-pointer select-none font-montserrat font-medium"
                    htmlFor={amenity?.name}
                  >
                    {amenity?.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Right  */}
        <div className="flex flex-col justify-between items-start gap-10 w-full h-full">
          <RHFSelect
            name="business_meeting.business_category"
            placeholder="Select Bussiness Category"
            label="Bussiness Category"
            options={businessCategories}
          />

          <RHFImageSelect
            name="business_meeting.nomad_id"
            placeholder="Select Nomad"
            label="Nomads"
            options={modifiedNomadList}
          />
        </div>
      </div>

      {openAmenitiesModal.onTrue && (
        <CreateEditAmenities
          isOpen={openAmenitiesModal.value}
          onClose={openAmenitiesModal.onFalse}
        />
      )}
    </div>
  );
};