"use client";
import React, { useRef, useEffect } from "react";
import { useBoolean } from "../hooks";
import { Typography } from "./typography";
import { Iconify } from "./iconify";

export const Accordion = React.memo(
  ({ id, title, children, className, deleteTopic, isOpen = false }) => {
    const { isOpen: open, toggleDrawer, setIsOpen } = useBoolean(isOpen); // Use isOpen prop
    const accordionRef = useRef(null);

    // Set initial open state based on isOpen prop
    useEffect(() => {
      setIsOpen(isOpen);
    }, [isOpen, setIsOpen]);

    return (
      <div
        className={` w-full object-contain  flex flex-col justify-center  px-0 py-1  ${className}`}
      >
        <div
          className="flex items-center justify-between cursor-pointer px-2 py-2"
          onClick={toggleDrawer}
        >
          <Typography variant="h6" className="text-black font-normal">
            {title}
          </Typography>

          <div className="flex gap-5">
            {deleteTopic && (
              <Iconify
                iconName="system-uicons:cross"
                className="size-6 text-black font-bold"
                onClick={() => deleteTopic(id)}
              />
            )}

            <Iconify
              iconName="iconamoon:arrow-down-2-bold"
              className="size-6 text-black"
            />
          </div>
        </div>

        <div
          ref={accordionRef}
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            open ? "max-h-full overscroll-x-auto" : "max-h-0"
          } px-5`}
          style={{
            maxHeight: open ? `${accordionRef.current?.scrollHeight}px` : "0px",
          }}
        >
          {children}
        </div>
      </div>
    );
  }
);
