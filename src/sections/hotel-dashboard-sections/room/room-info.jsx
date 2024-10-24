"use client";
import React, { useRef, useState } from "react";

import { useFormContext } from "react-hook-form";
import { useModal } from "@/src/hooks/use-modal";
import { useSelector } from "react-redux";

import {
  RHFDatePicker,
  RHFInput,
  RHFSelect,
  RHFTextArea,
} from "@/src/components/hook-form";
import {
  CalendarInput,
  CustomPopover,
  Iconify,
  Typography,
} from "@/src/components";
import { RoomTypeModal } from ".";
import CreateNewRoomFacilites from "./modals/create-new-room-facilities";
import { addDays } from "date-fns";

export const RoomInfo = () => {
  const { watch, setValue } = useFormContext();
  const openModal = useModal();
  const openFacilityModal = useModal();
  const [isDateOpen, setIsDateOpen] = useState(false);
  const datePopoverRef = useRef(null);

  // Handle date state
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  const toggleDateCalender = () => setIsDateOpen(!isDateOpen);

  const { roomTypes } = useSelector((state) => state.rooms);
  const { roomFacilities } = useSelector((state) => state.roomFacilities);

  const selectedFacilities = watch("room_facilities") || [];
  console.log("seelcted", selectedFacilities);

  const handleCheckboxChange = (facility, checked) => {
    setValue(
      "room_facilities",
      checked
        ? [...selectedFacilities, facility] // add if checked
        : selectedFacilities.filter(
            (selected) => selected.name !== facility.name
          ) // remove if unchecked
    );
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
            placeholder="Tell guests what's special about this room"
          />
          <RHFInput
            name="room_info.maximum_occupancy"
            label="Maximum Occupancy"
            placeholder="Maximum Occupancy"
          />
          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-row gap-4">
              <Typography variant="h6" className="font-medium">
                Room Facilities
              </Typography>
              <Typography
                variant="h6"
                className="font-medium text-primary hover:cursor-pointer"
                onClick={() => openFacilityModal.onTrue()} // Open modal on click
              >
                Add more
              </Typography>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 py-2 lg:py-0">
              {roomFacilities?.map((facility, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedFacilities.some(
                      (selected) => selected?.name === facility?.name
                    )} // check if the facility is selected
                    onChange={(e) =>
                      handleCheckboxChange(facility, e.target.checked)
                    }
                    className="h-4 w-4 rounded-xl border border-black accent-primary transition-colors duration-200"
                  />
                  <label
                    className="text-sm text-gray-700 cursor-pointer select-none font-montserrat font-medium"
                    htmlFor={facility?.name}
                  >
                    {facility?.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Right  */}
        <div className="flex flex-col justify-between items-start gap-6 w-full h-full">
          <div className="w-full flex gap-2 justify-center items-center">
            <RHFSelect
              name="room_info.room_type"
              placeholder="Select Room Type"
              label="Room Type"
              options={roomTypes?.map((item) => {
                return {
                  label: item?.name,
                  value: item?.name,
                };
              })}
            />

            <Iconify
              onClick={openModal.onTrue}
              iconName="ic:round-plus"
              className="!text-black size-8 cursor-pointer"
            />
          </div>

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

          <Typography variant="h6" className="font-medium">
            Availability
          </Typography>
          <div ref={datePopoverRef} className="relative flex flex-col w-full">
            <CalendarInput
              label="Date"
              startDate={date[0].startDate.toString().slice(0, 10)}
              endDate={date[0].endDate.toString().slice(0, 10)}
              onClick={toggleDateCalender}
            />
            <CustomPopover
              popoverRef={datePopoverRef}
              isOpen={isDateOpen}
              onClose={toggleDateCalender}
              arrow={false}
              className="flex flex-col overflow-hidden mt-4 w-fit"
              parentClass="!left-0"
            >
              <RHFDatePicker
                name="availability"
                onChange={(item) => setDate([item.selection])}
                value={date}
                rangeColors={["#852169"]}
              />
            </CustomPopover>
          </div>
        </div>
      </div>

      {openModal.onTrue && (
        <RoomTypeModal isOpen={openModal.value} onClose={openModal.onFalse} />
      )}

      {openFacilityModal.onTrue && (
        <CreateNewRoomFacilites
          isOpen={openFacilityModal.value}
          onClose={openFacilityModal.onFalse}
        />
      )}
    </div>
  );
};
