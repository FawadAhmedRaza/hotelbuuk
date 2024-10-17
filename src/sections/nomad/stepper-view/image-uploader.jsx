"use client";

import { Iconify } from "@/src/components";
import { RHFUploader } from "@/src/components/hook-form";
import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

const ImageUploader = () => {
  const { getValues, setValue, watch } = useFormContext();
  const uploaderRef = useRef(); // Create ref for RHFUploader
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleFileUpload = (images) => {
    console.log("Uploaded Images:", images);
    setUploadedImages(images); // Update state with the new image list
  };
  console.log(uploadedImages);

  console.log("form context images", watch("images"));

  const handleDeleteImage = (index) => {
    if (uploaderRef.current) {
      uploaderRef.current.deleteImage(index); // Call delete from RHFUploader via ref
    }
  };
  useEffect(() => {
    const images = getValues("images");
    setUploadedImages(images);
  }, []);

  useEffect(() => {
    // Extract the 'url' properties into a new array
    // const urls = uploadedImages.map((file) => file.url);

    // Use setValue to store the URLs array in the form state
    setValue("images", uploadedImages);
  }, [uploadedImages, setValue]);

  return (
    <div className="flex flex-col gap-10">
      {/* Render the image if an imageSrc exists */}
      <div className="w-full">
        {uploadedImages.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
            {uploadedImages.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image.url}
                  alt={`Uploaded Image ${index}`}
                  className="w-full h-64 object-cover rounded-md"
                />
                <div
                  type="button"
                  onClick={() => handleDeleteImage(index)} // Trigger delete via parent
                  className="absolute top-2 right-2 bg-red-600 text-white !text-xl rounded-full p-2 px-2 opacity-0 group-hover:opacity-100 transition"
                >
                  <Iconify iconName="material-symbols-light:delete-outline" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Image Uploader */}
      <div className="flex justify-center items-center w-full !border-gray-500 !border-1">
        <RHFUploader
          ref={uploaderRef} // Attach ref to RHFUploader
          name="images"
          onFileUpload={handleFileUpload}
        />
      </div>
    </div>
  );
};

export default ImageUploader;
