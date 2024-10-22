"use client";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/src/libs/cn";
import get from "lodash/get";
import { useDropzone } from "react-dropzone";
import { Iconify, Typography } from "..";

export const RHFUploader = forwardRef(
  ({ name, className, iconClasses, onFileUpload, icon }, ref) => {
    const {
      control,
      formState: { errors },
    } = useFormContext();

    const [imageFiles, setImageFiles] = useState([]); // Store image files

    const onDrop = useCallback(
      (acceptedFiles) => {
        console.log("Accepted Files", acceptedFiles);

        const newFiles = acceptedFiles.map((file) => {
          return { file }; // Store only the file object
        });

        // Update the state with new files and notify parent
        setImageFiles((prev) => [...prev, ...newFiles]);
        if (onFileUpload) onFileUpload(newFiles); // Notify parent
      },
      [onFileUpload]
    );

    // Expose deleteImage function to parent using ref
    useImperativeHandle(ref, () => ({
      deleteImage(index) {
        const updatedFiles = imageFiles.filter((_, i) => i !== index);
        setImageFiles(updatedFiles);
        if (onFileUpload) onFileUpload(updatedFiles); // Notify parent
      },
    }));

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="relative flex flex-col gap-2 w-full cursor-pointer ">
            {/* Display errors dynamically */}
            {errors && (
              <Typography
                variant="p"
                className="absolute !text-xs -top-10 text-red-400 transition-all duration-500"
              >
                {get(errors, name)?.message}
              </Typography>
            )}
            {/* Image Input */}
            <div className="w-full !border-gray-500 border-2 border-dashed rounded-xl">
              <div
                {...getRootProps({ className: "dropzone " })}
                className={cn(
                  `flex flex-col justify-center items-center h-20 sm:h-28 md:h-36 lg:h-40 bg-gray-100 w-full rounded-xl outline-none`,
                  className
                )}
              >
                <Iconify
                  iconName={icon}
                  className={`${iconClasses} size-16 text-gray-500`}
                />
                <input {...getInputProps()} />
              </div>
            </div>
          </div>
        )}
      />
    );
  }
);
