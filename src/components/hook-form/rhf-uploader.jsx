// "use client";
// import React, { useCallback, useState } from "react";
// import { Controller, useFormContext } from "react-hook-form";
// import { Typography } from "../typography";
// import { cn } from "@/src/libs/cn";
// import get from "lodash/get"; // Import lodash's get method
// import { useDropzone } from "react-dropzone";
// import { Iconify } from "..";

// export const RHFUploader = React.memo(
//   ({ name, className, iconClasses, onFileUpload }) => {
//     const {
//       control,
//       formState: { errors },
//     } = useFormContext();

//     const [imageUrls, setImageUrls] = useState([]); // Store image URLs

//     const onDrop = useCallback(
//       (acceptedFiles) => {
//         const newImageUrls = []; // Store new URLs temporarily

//         acceptedFiles.forEach((file) => {
//           const reader = new FileReader();

//           reader.onerror = () => console.log("file reading has failed");
//           reader.onabort = () => console.log("file reading was aborted");

//           reader.onload = (e) => {
//             const imageUrl = e.target.result; // Get the image URL
//             newImageUrls.push(imageUrl); // Add to temporary array

//             // Update state and pass URLs to parent component if needed
//             setImageUrls((prev) => [...prev, imageUrl]);
//             if (onFileUpload) onFileUpload([...newImageUrls, ...imageUrls]); // Notify parent
//           };

//           reader.readAsDataURL(file); // Read the file as Data URL
//         });
//       },
//       [imageUrls, onFileUpload]
//     ); // Dependencies include `imageUrls` and `onFileUpload`

//     const { getRootProps, getInputProps } = useDropzone({ onDrop });
//     return (
//       <Controller
//         name={name}
//         control={control}
//         render={({ field }) => (
//           <>
//             <div
//               {...getRootProps({ className: "dropzone" })}
//               className={cn(
//                 `flex flex-col justify-center items-center h-52 bg-gray-100 w-full border-gray-3          00 border-dashed border-1 rounded-xl`,
//                 className
//               )}
//             >
//               <Iconify
//                 iconName={"humbleicons:upload"}
//                 className={`${iconClasses} size-16 text-gray-500`}
//               />
//               <input {...field} {...getInputProps()} />
//               <p>Drag 'n' drop some files here, or click to select files</p>
//             </div>

//             {/* Display errors dynamically */}
//             {errors && (
//               <Typography
//                 variant="p"
//                 className="!text-xs text-red-400 transition-all duration-500"
//               >
//                 {get(errors, name)?.message}
//               </Typography>
//             )}
//           </>
//         )}
//       />
//     );
//   }
// );

// SECOND
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
  ({ name, className, iconClasses, onFileUpload }, ref) => {
    const {
      control,
      formState: { errors },
    } = useFormContext();

    const [imageUrls, setImageUrls] = useState([]); // Store image URLs

    const onDrop = useCallback(
      (acceptedFiles) => {
        const newImageUrls = acceptedFiles.map((file) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);

          return new Promise((resolve) => {
            reader.onload = (e) => resolve({ url: e.target.result, file });
          });
        });

        Promise.all(newImageUrls).then((images) => {
          const updatedUrls = [...imageUrls, ...images];
          setImageUrls(updatedUrls);
          if (onFileUpload) onFileUpload(updatedUrls); // Notify parent
        });
      },
      [imageUrls, onFileUpload]
    );

    // Expose deleteImage function to parent using ref
    useImperativeHandle(ref, () => ({
      deleteImage(index) {
        const updatedUrls = imageUrls.filter((_, i) => i !== index);
        setImageUrls(updatedUrls);
        if (onFileUpload) onFileUpload(updatedUrls); // Notify parent
      },
    }));

    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="w-full !border-gray-500 border-2 border-dashed  rounded-xl">
            <div
              {...getRootProps({ className: "dropzone " })}
              className={cn(
                `flex flex-col justify-center items-center h-52 bg-gray-100 w-full  rounded-xl outline-none`,
                className
              )}
            >
              <Iconify
                iconName={"humbleicons:upload"}
                className={`${iconClasses} size-16 text-gray-500`}
              />
              <input {...field} {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>

            {/* Display errors dynamically */}
            {errors && (
              <Typography
                variant="p"
                className="!text-xs text-red-400 transition-all duration-500"
              >
                {get(errors, name)?.message}
              </Typography>
            )}
          </div>
        )}
      />
    );
  }
);
