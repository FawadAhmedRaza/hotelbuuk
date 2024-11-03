"use client";

import React, { useEffect, useRef, useState } from "react";
import { Iconify } from "@/src/components";
import { RHFUploader } from "@/src/components/hook-form";
import ImageRender from "@/src/components/ImageRenderer";
import { useFormContext } from "react-hook-form";

const HotelImages = () => {
  const [imageBox, setImageBox] = useState(
    Array.from({ length: 10 }, (value, index) => index)
  );

  const { getValues, setValue, watch } = useFormContext();
  const uploaderRef = useRef();
  const [uploadedImages, setUploadedImages] = useState([]);
  const fieldImages = watch("images") || [];

  // Initialize uploaded images from form context
  useEffect(() => {
    setUploadedImages(fieldImages);
  }, []);

  // **Handle File Upload**
  const handleFileUpload = (newImages) => {
    const imagesWithId = newImages.map((img) => ({
      ...img,
      id: crypto.randomUUID(), // Assign a unique ID
      url: URL.createObjectURL(img.file), // Create the URL here once
    }));

    const updatedImages = [...uploadedImages, ...imagesWithId];
    setUploadedImages(updatedImages);
    setValue("images", updatedImages); // Update form context
  };

  // **Handle Image Deletion**
  const handleDeleteImage = (id) => {
    const imageToRemove = uploadedImages.find((img) => img.id === id);

    if (imageToRemove?.url) {
      URL.revokeObjectURL(imageToRemove.url); // Clean up object URL to avoid memory leaks
    }

    const updatedImages = uploadedImages.filter((img) => img.id !== id);
    setUploadedImages(updatedImages);
    setValue("images", updatedImages); // Update form context
  };

  // Dynamically update empty placeholders based on uploaded images
  useEffect(() => {
    const imageCount = uploadedImages.length;
    const newBoxLength = Math.max(10 - imageCount, 0); // Ensure non-negative length
    setImageBox(Array.from({ length: newBoxLength }));
  }, [uploadedImages]);

  // **Handle Image Name Change**
  const handleNameChange = (index, value) => {
    const updatedImages = uploadedImages.map((img, i) =>
      i === index ? { ...img, name: value } : img
    );
    setUploadedImages(updatedImages);
    setValue("images", updatedImages); // Update form context with updated names
  };

  return (
    <div className="flex flex-col gap-10 my-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 w-full">
        {/* Image Uploader */}
        <RHFUploader
          ref={uploaderRef}
          name="images"
          onFileUpload={handleFileUpload}
        />

        {/* Render Uploaded Images */}
        {uploadedImages.map((image, index) => (
          <div key={image.id} className="relative group">
            <div className="flex justify-center items-center">
              <ImageRender
                src={image.url}
                type={image.file ? "normal" : "server"}
                alt={`Uploaded Image ${index}`}
                effect="blur"
                className="w-full h-20 sm:h-28 md:h-36 lg:h-40 object-cover rounded-xl"
              />
              <div
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition cursor-pointer"
                onClick={() => handleDeleteImage(image.id)}
              >
                <Iconify iconName="material-symbols-light:delete-outline" />
              </div>
            </div>
            <input
              name={`image_name_${index}`}
              placeholder="Image Name"
              className="h-8 border-none outline-none w-full"
              value={image.name || ""}
              onChange={(e) => handleNameChange(index, e.target.value)}
            />
          </div>
        ))}

        {/* Render Empty Image Slots */}
        {imageBox.map((_, index) => (
          <div key={index} className="w-full border-2 border-dashed rounded-xl">
            <div className="flex justify-center items-center h-20 sm:h-28 md:h-36 lg:h-40 bg-gray-100 w-full rounded-xl">
              <Iconify
                iconName="tabler:camera-plus"
                className="text-gray-500"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelImages;
