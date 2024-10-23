"use client";

import { Iconify } from "@/src/components";
import { RHFUploader } from "@/src/components/hook-form";
import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

const ImageUploader = () => {
  const [imageBox, setImageBox] = useState(Array.from({ length: 10 }));
  const { getValues, setValue, watch } = useFormContext();

  const uploaderRef = useRef();
  const [uploadedImages, setUploadedImages] = useState([]);

  const fieldImages = watch("images") || []; // Watch images in the form

  // Ensure initial sync between form state and local state
  useEffect(() => {
    setUploadedImages(fieldImages);
  }, [fieldImages]);

  const handleFileUpload = (newImages) => {

    const updatedImages = [...uploadedImages, ...newImages];
    setUploadedImages(updatedImages);
    setValue("images", updatedImages); // Update form context
  };

  const handleDeleteImage = (index) => {
    const updatedImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(updatedImages);
    setValue("images", updatedImages); // Update form context
  };

  useEffect(() => {
    const imageCount = uploadedImages.length;
    const newBoxLength = Math.max(10 - imageCount, 0);
    setImageBox(Array.from({ length: newBoxLength }));
  }, [uploadedImages]);

  const handleNameChange = (index, value) => {
    const updatedImages = uploadedImages.map((img, i) =>
      i === index ? { ...img, name: value } : img
    );
    setUploadedImages(updatedImages);
    setValue("images", updatedImages); // Sync with form context
  };

  return (
    <div className="flex flex-col gap-10 my-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 w-full">
        <RHFUploader
          ref={uploaderRef}
          name="images"
          onFileUpload={handleFileUpload}
        />
        {uploadedImages.map((image, index) => {
          const imageSrc = image.file
            ? URL.createObjectURL(image.file)
            : image.url;

          return (
            <div key={index} className="relative group">
              <div className="flex justify-center items-center">
                <img
                  src={imageSrc}
                  alt={`Uploaded Image ${index}`}
                  className="w-full h-20 sm:h-28 md:h-36 lg:h-40 object-cover rounded-xl"
                />
                <div
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition cursor-pointer"
                  onClick={() => handleDeleteImage(index)}
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
          );
        })}
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

export default ImageUploader;