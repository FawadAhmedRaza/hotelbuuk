"use client";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "../image";
import { Iconify } from "..";

export default function UploadAvatar({
  error,
  file,
  disabled,
  helperText,
  isEdit,
  ...other
}) {
  const [preview, setPreview] = useState(null);

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      multiple: false,
      disabled,
      accept: { "image/*": [] },
      ...other,
      onDrop: (acceptedFiles) => {
        other.onChange(acceptedFiles[0]);
      },
    });

  useEffect(() => {
    if (file) {
      const objectUrl =
        typeof file === "string" ? file : URL.createObjectURL(file);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [file]);

  const hasFile = !!file;
  const hasError = isDragReject || !!error;

  return (
    <div
      {...getRootProps()}
      className={`relative   p-1 mx-auto md:w-[175px] md:h-[175px] w-[150px] h-[150px] cursor-pointer rounded-full border border-dashed transition-opacity ${
        hasError ? "border-red-500" : "border-[#852169]"
      } ${disabled ? "opacity-50 pointer-events-none" : ""}`}
    >
      <input {...getInputProps()} />
      <div className="relative w-full h-full rounded-full overflow-hidden">
        {hasFile && preview && (
          <Image
            alt="avatar"
            src={preview}
            className="w-full h-full rounded-full"
            type={typeof file !== "string" ? "normal" : "server"}
          />
        )}

        {!hasFile && (
          <div
            className={`absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full z-10 rounded-full transition-opacity duration-200 bg-gray-100 text-gray-500`}
          >
            <Iconify icon="solar:camera-add-bold" width={30} />
            <p className="text-xs">{file ? "Update photo" : "Upload photo"}</p>
          </div>
        )}
      </div>
      {isEdit || preview ? (
        <div className="flex justify-center items-center absolute p-2 bottom-0 right-3 rounded-full bg-primary">
          <Iconify iconName="mage:edit" className=" z-40 size-5  text-white" />
        </div>
      ) : (
        ""
      )}
      {helperText && <p className="text-xs text-red-500">{helperText}</p>}
    </div>
  );
}
