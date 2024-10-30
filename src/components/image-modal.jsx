"use client";

import React, { useState } from "react";
import { Iconify } from ".";
import ImageRender from "./ImageRenderer";

export const ImageModal = ({ images, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen || images.length === 0) return null; // Avoid rendering if no images

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out">
      <div className="relative w-full h-full">
        {/* Close Button */}
        <button
          className="absolute top-5 right-5 text-white text-2xl font-bold"
          onClick={onClose}
        >
          <Iconify iconName="bitcoin-icons:cross-outline" />{" "}
        </button>

        {/* Image Display */}
        <div className="flex items-center justify-center h-full w-full">
          {/* <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex}`}
            className="max-w-full max-h-full w-4/5 h-[75vh] object-cover"
          /> */}
          <ImageRender
            key={images[currentIndex]?.img} // Force re-render when src changes
            src={images[currentIndex]?.img}
            type={"server"}
            alt="Lazy Loaded Image"
            wrapperProps={{
              style: { transitionDelay: "0.5s" }, // Adjust fade delay
            }}
            // className="!max-w-full !max-h-full !w-4/5 !h-[75vh] object-cover"
            className="!w-4/5 !h-[75vh] object-cover "
            wrapperClassName="flex justify-center items-center object-cover  w-full h-full" // Full width & 75% viewport height
          />
        </div>

        {/* Previous Button */}
        <span
          className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white bg-primary p-2 rounded-full text-3xl font-bold"
          onClick={handlePrev}
        >
          <Iconify iconName="cuida:arrow-left-outline" />{" "}
        </span>

        {/* Next Button */}
        <button
          className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white bg-primary p-2 rounded-full text-3xl font-bold"
          onClick={handleNext}
        >
          <Iconify iconName="cuida:arrow-right-outline" />{" "}
        </button>
      </div>
    </div>
  );
};
