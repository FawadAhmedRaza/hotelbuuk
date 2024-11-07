"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/src/libs/cn";
import {
  fetchPlaceDetails,
  fetchPlacesSuggestions,
} from "@/src/actions/google-location";
import { Typography } from ".";

// Debounce function to limit API calls
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

export const LocationInput = ({
  label,
  placeholder,
  disabled = false,
  className,
  inputClass,
  onChange,
  value: initialValue = "",
  queryParams,
}) => {
  const [query, setQuery] = useState(initialValue);
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
      onChange?.(fetchPlace);
      setQuery(option.label);
      setSuggestions([]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setQuery(queryParams);
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
            `flex items-center text-xs rounded bg-white placeholder:text-neutral-300 px-1 w-full border border-custom-neutral outline-none ${inputClass}`,

            disabled && "!bg-gray-100 cursor-not-allowed"
          )}
          placeholder={placeholder}
          value={query}
          onChange={handleChangeQuery}
          disabled={disabled}
        />
        {suggestions.length > 0 && (
          <div className="rounded-md absolute bg-white top-[40px] hide-scrollbar custom-scrollbar w-full md:w-60 border border-custom-neutral divide-y divide-dashed divide-custom-neutral !z-50 max-h-56 shadow-lg overflow-auto">
            {suggestions.map((option, index) => (
              <Typography
                variant="p"
                key={index}
                className="!text-xs w-full py-2 px-3 hover:bg-tertiary cursor-pointer !text-custom-black"
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
