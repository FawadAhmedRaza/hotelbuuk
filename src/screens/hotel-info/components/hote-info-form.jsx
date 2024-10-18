import {
  RHFInput,
  RHFTextArea,
  RHFUploadAvatar,
} from "@/src/components/hook-form";
import React, { useState, useEffect } from "react";
import AmenitiesModal from "./amenities-modal";
import { RHFStarsRating } from "@/src/components/hook-form/rhf-stars-rating";
import { Typography } from "@/src/components";
import { useFormContext } from "react-hook-form";
import { useModal } from "@/src/hooks/use-modal";
import { LocalStorageGetItem } from "@/src/utils/localstorage";

const initialFacilities = [
  { title: "Free WI-FI", value: "freeWI-FI" },
  { title: "Parking", value: "parking" },
  { title: "Pool", value: "pool" },
  { title: "Gym", value: "gym" },
  { title: "Restaurant", value: "restaurant" },
];

const HotelInfoForm = () => {
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
    <div className="gap-y-4">
      <div className="flex flex-col w-full h-full justify-center items-center content-center mt-0">
        <RHFUploadAvatar name="hotel_image" />
        <RHFStarsRating name="stars" label="Stars Rating" className="mt-6" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5 w-full h-full mt-6">
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
                className="font-medium text-primary hover:cursor-pointer"
                onClick={() => openModal.onTrue()} // Open modal on click
              >
                Create
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
        <AmenitiesModal
          setRefetch={setRefetch}
          isOpen={openModal.value}
          onClose={openModal.onFalse}
        />
      )}
    </div>
  );
};

export default HotelInfoForm;
