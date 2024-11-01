import React from "react";
import { DateRange } from "react-date-range";
import format from "date-fns/format";
import { differenceInDays } from "date-fns"; // Import differenceInDays
import { Pannel, Typography } from "@/src/components";

const AvailabilityCalendar = ({
  dateRange,
  handleDateChange,
  isMobile,
  clearDateRange,
}) => {
  const startDate = dateRange[0]?.startDate;
  const endDate = dateRange[0]?.endDate;

  // Calculate the number of nights
  const nights =
    startDate && endDate ? differenceInDays(endDate, startDate) : 0;

  return (
    <Pannel className="flex flex-col md:flex-row gap-5 md:gap-5 justify-between items-center md:items-start p-4 md:p-8 bg-white ">
      <div className="text-center md:text-left  w-full">
        <Typography variant="h1" className="text-black">
          Availability
        </Typography>
        <div className="mt-5">
          {startDate && endDate && nights > 0 ? (
            <div>
              <Typography
                variant="h4"
                className="text-lg md:text-[] font-medium"
              >
                {nights} nights in Sohna
              </Typography>
              <Typography
                variant="h5"
                className="text-gray-400 mt-2 text-sm md:text-base"
              >
                {format(startDate, "MMM d, yyyy")} -{" "}
                {format(endDate, "MMM d, yyyy")}
              </Typography>
            </div>
          ) : (
            <span>No dates selected</span>
          )}
        </div>
      </div>

      <div className="w-full md:w-auto">
        <div className="border border-gray-300 rounded-lg shadow-md  bg-white mx-auto w-full">
          <DateRange
            onChange={handleDateChange}
            months={2}
            ranges={dateRange}
            direction={isMobile ? "vertical" : "horizontal"}
            rangeColors={["#000000"]}
            showDateDisplay={false}
            minDate={new Date()}
            color="#000000"
            weekdayDisplayFormat="EEE"
            monthDisplayFormat="MMMM yyyy"
            className=" text-[11px] sm:text-[20px] md:text-[15px] xl:text-sm   text-gray-800 "
          />

          {/* Date Display Section */}
          <div className="text-center mt-4 text-gray-800">
            {startDate && endDate ? (
              <div className="text-sm">
                Selected Range: {format(startDate, "MMM d, yyyy")} -{" "}
                {format(endDate, "MMM d, yyyy")}
              </div>
            ) : (
              <span>No dates selected</span>
            )}
          </div>

          {/* Clear Dates Button */}
          <div
            className="text-center mt-4 text-blue-600 cursor-pointer hover:underline"
            onClick={clearDateRange} // Call clearDateRange on click
          >
            Clear dates
          </div>
        </div>
      </div>
    </Pannel>
  );
};

export default AvailabilityCalendar;
