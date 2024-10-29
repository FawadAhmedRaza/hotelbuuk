"use client";
import React, { useRef, useState } from "react";
import {
  Button,
  CalendarInput,
  CustomPopover,
  Iconify,
  Typography,
} from "../components";
import * as Yup from "yup";
import {
  RHFDatePicker,
  RHFFormProvider,
  RHFInput,
} from "@/src/components/hook-form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";

export const Booking = React.memo(() => {
  const datePopoverRef = useRef(null);
  const [isDateOpen, setIsDateOpen] = useState(false);

  const toggleDateCalender = () => {
    setIsDateOpen(!isDateOpen);

  };

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const bookingSchema = Yup.object().shape({
    destination: Yup.string().required("Destination is required"),
  });

  const methods = useForm({
    resolver: yupResolver(bookingSchema),
    defaultValues: {
      destination: "",
    },
  });

  const {
    reset,
    formState: { errors },
  } = methods;

  const handleSubmit = async (data) => {
    try {
      console.log({
        destination: data.destination,
        check_in: date[0].startDate.toString(),
        check_out: date[0].endDate ? date[0].endDate.toString() : "",
      });
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RHFFormProvider
      methods={methods}
      onSubmit={methods.handleSubmit(handleSubmit)}
      className=""
    >
      <div>
        <div className="flex flex-col md:flex-row gap-8 lg:gap-10 items-center w-11/12 lg:!w-[70%] h-full md:!h-28 rounded-3xl shadow-lg p-5 sm:py-2 sm:px-10 bg-white mx-auto ">
          <div className="relative flex flex-col sm:flex-row justify-between md:justify-start items-center gap-5 md:gap-5 grow w-full">
            <div className="flex gap-1 sm:gap-3">
              <Iconify
                iconName="carbon:location-filled"
                className="text-primary mt-1"
              />
              <span className="flex flex-col gap-2 items-center justify-start sm:justify-start w-full">
                <Typography
                  variant="p"
                  className="font-normal !text-sm !text-start !w-full py-1"
                >
                  Destinations
                </Typography>
                <RHFInput
                  type="text"
                  placeholder="Moxy Dortmunt City"
                  name="destination"
                  inputClass="outline-none border-none text-base font-normal !p-0"
                  className="outline-none border-none !p-0 h-8"
                />
              </span>
            </div>
            <span className="hidden sm:flex h-16 w-[2px] mx-10 bg-primary" />

            <div className="flex gap-1 sm:gap-3">
              <Iconify iconName="ion:calendar" className="text-primary mt-1" />
              <div className="flex flex-col gap-1 sm:gap-2 w-auto">
                <span className="flex gap-7 items-center justify-start sm:justify-start w-full">
                  <Typography
                    variant="p"
                    className="font-normal !text-sm !text-start text-secondary py-1"
                  >
                    Check-in
                  </Typography>
                  <Typography
                    variant="p"
                    className="font-normal !text-sm !text-start text-secondary py-1"
                  >
                    Checkout
                  </Typography>
                </span>

                {/* <div
                  ref={datePopoverRef}
                  className="relative flex flex-col gap-2 items-start justify-start sm:justify-start w-full sm:w-fit"
                > */}
                <Popover>
                  <PopoverTrigger>
                    <CalendarInput
                      type="text"
                      placeholder="00-00-000 to 00-00-000"
                      name="destination"
                      inputClass="outline-none text-base font-normal !py-0 px-2 border-none hover:bg-neutral-100 w-fit transition-all duration-500"
                      className="outline-none border-none !p-0 h-8 -ml-2"
                      variant="small"
                      startDate={date[0]?.startDate?.toString()?.slice(0, 10)}
                      endDate={date[0]?.endDate?.toString()?.slice(0, 10)}
                      onClick={toggleDateCalender}
                    />
                  </PopoverTrigger>

                  {/* <CustomPopover
                    popoverRef={datePopoverRef}
                    isOpen={isDateOpen}
                    onClose={toggleDateCalender}
                    arrow={false}
                    className="flex flex-col overflow-hidden mt-4 w-fit"
                    parentClass={`right-0 min-450:!right-0 lg:!left-0 ${
                      isTopPosition ? "bottom-full" : "top-full"
                    } top-12`}
                  > */}
                  <PopoverContent>
                    <RHFDatePicker
                      name="availability"
                      onChange={(item) => setDate([item.selection])}
                      value={date}
                      rangeColors={["#852169"]}
                    />
                  </PopoverContent>
                </Popover>

                {/* </CustomPopover> */}
                {/* </div> */}
              </div>
            </div>
          </div>
          <Button type="submit" className="w-full sm:w-fit text-nowrap ">
            Search
          </Button>
        </div>
      </div>
    </RHFFormProvider>
  );
});
