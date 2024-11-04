"use client";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { Iconify, Typography } from "..";

export const RHFUploader = forwardRef(({ name, onFileUpload }, ref) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [imageUrls, setImageUrls] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const newImages = acceptedFiles.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));

      const updatedUrls = [...imageUrls, ...newImages];
      setImageUrls(updatedUrls);

      if (onFileUpload) onFileUpload(newImages); // Send only new images to parent
    },
    [imageUrls, onFileUpload]
  );

  useImperativeHandle(ref, () => ({
    deleteImage(index) {
      const updatedUrls = imageUrls.filter((_, i) => i !== index);
      setImageUrls(updatedUrls);
    },
  }));

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="relative flex flex-col gap-2 w-full cursor-pointer">
          <div
            {...getRootProps()}
            className="w-full border-2 border-dashed rounded-xl"
          >
            <div className="flex justify-center items-center h-20 sm:h-28 md:h-36 lg:h-40 bg-gray-100 rounded-xl">
              <Iconify iconName="mdi-light:plus" className="text-gray-500" />
              <input {...getInputProps()} />
            </div>
          </div>
          {errors[name] && (
            <Typography variant="span" className="text-red-500 !text-sm">
              {errors[name]?.message}
            </Typography>
          )}
        </div>
      )}
    />
  );
});
