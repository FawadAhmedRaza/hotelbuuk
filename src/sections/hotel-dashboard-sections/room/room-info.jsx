"use client";
import React, { useEffect, useRef, useState } from "react";

// Components and Others...
import {
  RHFCheckbox,
  RHFDatePicker,
  RHFImageSelect,
  RHFInput,
  RHFRadio,
  RHFSelect,
  RHFTextArea,
} from "@/src/components/hook-form";
import { useForm, useFormContext } from "react-hook-form";
import {
  Button,
  CalendarInput,
  CustomPopover,
  Iconify,
  Typography,
} from "@/src/components";
import { addDays } from "date-fns";

import { room_facilities } from "@/src/_mock/_room";
import { useModal } from "@/src/hooks/use-modal";
import { RoomTypeModal } from ".";
import { useSelector } from "react-redux";

const initialFacilities = [
  { title: "Free WI-FI", value: "freeWI-FI" },
  { title: "Parking", value: "parking" },
  { title: "Pool", value: "pool" },
  { title: "Gym", value: "gym" },
  { title: "Restaurant", value: "restaurant" },
];
export const RoomInfo = () => {
  const { roomTypes } = useSelector((state) => state.rooms);
  const openModal = useModal();
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
            placeholder="Tell guests whats special about this room"
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
          <div ref={datePopoverRef} className="relative flex flex-col w-full  ">
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
    </div>
  );
};
