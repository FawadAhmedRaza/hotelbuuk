"use client";

import { Iconify } from "@/src/components";
import { RHFInput, RHFUploader } from "@/src/components/hook-form";
import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

const ImageUploader = () => {
  const [imageBox, setImageBox] = useState(
    Array.from({ length: 10 }, (value, index) => index)
  );
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
    const images = getValues("images") || [];
    setUploadedImages(images);
  }, [getValues]);

  console.log("length", imageBox);

  useEffect(() => {
    const imageCount = uploadedImages.length;
    const newBoxLength = Math.max(10 - imageCount, 0); // Ensure non-negative length

    setImageBox(Array.from({ length: newBoxLength }, (_, index) => index));
    setValue("images", uploadedImages);
  }, [uploadedImages, setValue]);

  return (
    <div className="flex flex-col gap-10">
      {/* Render the image if an imageSrc exists */}

      {/* Image Uploader */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 w-full !border-gray-500 !border-1">
        <RHFUploader
          ref={uploaderRef} // Attach ref to RHFUploader
          name="images"
          icon="mdi-light:plus"
          iconClasses="!size-20"
          onFileUpload={handleFileUpload}
        />
        {uploadedImages.length > 0 &&
          uploadedImages.map((image, index) => (
            <div key={index} className="relative group">
              <div className="flex justify-center items-center">
                <img
                  src={image.url}
                  alt={`Uploaded Image ${index}`}
                  className="w-full h-20 sm:h-28 md:h-36 lg:h-40 object-cover rounded-xl"
                />
                <div
                  type="button"
                  onClick={() => handleDeleteImage(index)} // Trigger delete via parent
                  className="absolute top-2 right-2 bg-red-600 text-white !text-xl rounded-full p-2 px-2 opacity-100 lg:opacity-0 group-hover:opacity-100  transition"
                >
                  <Iconify iconName="material-symbols-light:delete-outline" />
                </div>
              </div>
              <input
                name="image_name"
                placeholder="Image Name"
                className=" h-8 border-none outline-none w-full"
              />
            </div>
          ))}
        {imageBox.map(() => (
          <div className="w-full !border-gray-500 border-2 border-dashed  rounded-xl">
            <div
              className={`flex flex-col justify-center items-center h-20 sm:h-28 md:h-36 lg:h-40 bg-gray-100 w-full rounded-xl outline-none`}
            >
              <Iconify
                iconName="tabler:camera-plus"
                className={`size-10 md:size-14 lg:size-16 text-gray-500`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
