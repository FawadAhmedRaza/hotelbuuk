"use client";

import React, { useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Typography } from "../typography";
import { cn } from "@/src/libs/cn";
import get from "lodash/get";
import {
  fetchPlaceDetails,
  fetchPlacesSuggestions,
} from "@/src/actions/google-location";

// Debounce function to limit API calls
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

export const RHFLocationSelect = ({
  label,
  name,
  placeholder,
  disabled = false,
  className,
  onChange,
}) => {
  const { control } = useFormContext();
  const [query, setQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const dropDownRef = useRef(null);

  const fetchSuggestions = debounce(async (value) => {
    if (value.length >= 3) {
      setLoading(true);
      try {
        const results = await fetchPlacesSuggestions(value);
        setSuggestions(
          results.map((suggestion) => ({
            label: suggestion.description,
            value: suggestion.place_id,
          }))
        );
        console.log(results);
      } catch (error) {
        console.error("Error fetching places suggestions:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  }, 300);

  // Handle input change
  const handleChangeQuery = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchSuggestions(value);
  };

  const handleOnClick = async (option) => {
    try {
      const fetchPlace = await fetchPlaceDetails(option?.value);
      console.log("place details",fetchPlace);
      onChange(fetchPlace);
      setQuery(option.label);
      setSuggestions([]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const outsideClickHandler = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", outsideClickHandler);
    return () => {
      document.removeEventListener("mousedown", outsideClickHandler);
    };
  }, []);

  return (
    <div
      className={cn(
        "relative flex flex-col gap-1 w-full",
        className,
        disabled && "cursor-not-allowed"
      )}
    >
      {label && (
        <Typography
          variant="p"
          className={`text-custom-black !text-sm bg-white absolute -top-2.5 left-3 z-10 ${
            disabled ? "opacity-50" : ""
          }`}
        >
          {label}
        </Typography>
      )}
      <div className="relative w-full" ref={dropDownRef}>
        <input
          className={cn(
            "flex items-center text-sm rounded bg-white h-12 placeholder:text-neutral-300 px-3 w-full border border-custom-neutral outline-none",
            disabled ? "!bg-gray-100 cursor-not-allowed" : ""
          )}
          placeholder={placeholder}
          value={query}
          onChange={handleChangeQuery}
          disabled={disabled}
        />
        {suggestions.length > 0 && (
          <div className="rounded-md absolute bg-white top-[52px] w-full border border-custom-neutral divide-y divide-dashed divide-custom-neutral !z-50 max-h-56 shadow-lg overflow-auto">
            {suggestions.map((option, index) => (
              <Typography
                variant="p"
                key={index}
                className="!text-sm w-full py-2 px-3 hover:bg-tertiary cursor-pointer !text-custom-black"
                onClick={() => handleOnClick(option)}
              >
                {option.label}
              </Typography>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
