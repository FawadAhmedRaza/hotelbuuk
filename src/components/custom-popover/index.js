"use client";

import React, { useEffect, useRef } from "react";
import { Iconify } from "..";

const CustomPopover = ({ isOpen, onClose, children, className, popoverRef, arrow = false, parentClass, arrowClass }) => {

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        !event.target.closest(".popover-button")
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div
      ref={popoverRef}
      className={`absolute top-10 right-1 flex flex-col justify-end items-end transition-opacity duration-300 ease-in-out !z-50 ${parentClass} ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
    >
      {arrow && (
        <Iconify
          iconName="bxs:up-arrow"
          className={`!w-4 !h-4 justify-end -mb-1 mr-1.5 popover-button ${arrowClass}`}
          onClick={(e) => e.stopPropagation()}
        />
      )}
      <div
        className={`rounded-10rd flex flex-col bg-custom-white border border-card_border shadow-lg ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default CustomPopover;