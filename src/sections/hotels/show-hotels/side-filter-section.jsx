"use client";
import { Iconify, Typography } from "@/src/components";
import SideFilterSectionSkeleton from "@/src/components/Skeleton/side-filter-skeleton";
import { CheckBoxButton } from "@/src/components/ui/check-box-button";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SideFilterSection = ({ setFilters }) => {
  // State to keep track of checked values
  const [checkedNomads, setCheckedNomads] = useState([]);
  const [checkedLocations, setCheckedLocations] = useState([]);

  const [searchEvent, setSearchEvent] = useState("");
  const [rangeValue, setRangeValue] = useState();
  const [rating, setRating] = useState([]);

  const { events, isLoading } = useSelector((state) => state.allEvents);

  // Filter function for cities
  const cities = events
    .filter((event) => (event?.city ? event.city : event.hotel.city))
    .map((event) => (event?.city ? event.city : event.hotel.city));

  // Remove duplicates using Set
  const uniqueCities = [...new Set(cities)];

  // Filter function to extract nomad details
  const filteredNomads = events
    .filter((event) => event.nomad)
    .map((event) => ({
      id: event.nomad.id,
      first_name: event.nomad.first_name,
      last_name: event.nomad.last_name,
    }));

  // Get unique nomads by id
  const uniqueNomads = filteredNomads.filter(
    (nomad, index, self) => index === self.findIndex((n) => n.id === nomad.id)
  );

  const handleNomadChange = (isChecked, nomadId) => {
    setCheckedNomads((prev) => {
      if (isChecked) {
        return [...prev, nomadId];
      } else {
        return prev.filter((id) => id !== nomadId);
      }
    });
  };

  const handleLocationChange = (isChecked, city) => {
    setCheckedLocations((prev) => {
      if (isChecked) {
        return [...prev, city];
      } else {
        return prev.filter((loc) => loc !== city);
      }
    });
  };

  const handleRatingChange = (isChecked, rate) => {
    setRating((prev) => {
      if (isChecked) {
        return [...prev, rate];
      } else {
        return prev.filter((loc) => loc !== rate);
      }
    });
  };
  const highestPricedEvent = events
    .slice() // Create a shallow copy to avoid mutating the original array
    .sort((a, b) => parseFloat(b.price) - parseFloat(a.price))[0];

  // Set filters based on the current state
  useEffect(() => {
    setFilters({
      event_name: searchEvent,
      price: rangeValue,
      rating: rating,
      location: checkedLocations,
      nomad: checkedNomads,
    });
  }, [
    checkedNomads,
    checkedLocations,
    rating,
    rangeValue,
    searchEvent,
    setFilters,
  ]);

  useEffect(() => {
    if (events.length > 0) {
      setRangeValue(Number(highestPricedEvent?.price) / 2); // Update the range value
    }
  }, [events]); // Depend on events so it runs when events change
  const handleChange = (event) => {
    setRangeValue(event.target.value); // Update state with slider value
  };

  if (isLoading) return <SideFilterSectionSkeleton />;

  return (
    <div className="">
      <div className="flex flex-col items-center space-y-4 ">
        <div className="w-full px-5 space-y-8">
          <div>
            <Typography variant="h6" className="font-semibold">
              Filter
            </Typography>
            <div className="flex flex-col gap-3">
              {/* Search by Event */}
              <div className="flex items-center  bg-white h-12 px-2 rounded-full gap-2 border border-custom-neutral">
                <Iconify
                  iconName="lucide:search"
                  className="!size-5 text-gray-500"
                />
                <input
                  type="text"
                  value={searchEvent}
                  onChange={(e) => setSearchEvent(e.target.value)}
                  className="w-full text-sm rounded-md outline-none px-2 placeholder:text-neutral-300 text-secondary bg-transparent"
                  placeholder="Search Event"
                />
              </div>

              <div className="mt-4">
                <Typography variant="p">Price Range</Typography>

                <div className="relative w-full">
                  <input
                    type="range"
                    min="0"
                    max={highestPricedEvent?.price || 0} // Default to 0 to avoid NaN issues
                    value={rangeValue}
                    onChange={handleChange}
                    className="range range-primary w-full h-2 rounded-lg appearance-none cursor-pointer accent-black"
                    style={{
                      background: `linear-gradient(to right, #000000 ${
                        (rangeValue / highestPricedEvent?.price) * 100
                      }%, #d1d5db ${
                        (rangeValue / highestPricedEvent?.price) * 100
                      }%)`,
                    }}
                  />
                  <div
                    className="absolute top-0 transform -translate-x-1/2 -translate-y-8 bg-black text-white text-xs font-normal py-1 px-2 rounded-md"
                    style={{
                      left: `${
                        (rangeValue / highestPricedEvent?.price) * 100
                      }%`, // Position the tooltip correctly
                    }}
                  >
                    {`$${rangeValue}`}
                  </div>
                </div>

                <p className="text-gray-700 text-xs font-medium">
                  Selected price: {`$${rangeValue}`}
                </p>
              </div>
            </div>
          </div>

          <div>
            <Typography variant="h6" className="font-semibold">
              Filter by Rating
            </Typography>
            <div className="space-y-3 mt-4 ">
              {[5, 4, 3, 2, 1].map((rate) => (
                <CheckBoxButton
                  key={rate}
                  isRating={true}
                  label={rate}
                  onChange={(isChecked) => handleRatingChange(isChecked, rate)}
                />
              ))}
            </div>
          </div>

          <div>
            <Typography variant="h6" className="font-semibold">
              Location
            </Typography>
            <div className="space-y-3 mt-4">
              {uniqueCities.map((city) => (
                <CheckBoxButton
                  key={city}
                  label={city}
                  onChange={(isChecked) =>
                    handleLocationChange(isChecked, city)
                  }
                />
              ))}
            </div>
          </div>

          <div>
            <Typography variant="h6" className="font-semibold">
              Nomads
            </Typography>
            <div className="mt-4 space-y-3">
              {uniqueNomads.map((nomad) => (
                <CheckBoxButton
                  key={nomad.id}
                  label={`${nomad.first_name} ${nomad.last_name}`}
                  onChange={(isChecked) =>
                    handleNomadChange(isChecked, nomad.id)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideFilterSection;
