// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { Controller, useFormContext } from "react-hook-form";
// import { Typography } from "../typography";
// import { Iconify } from "../iconify";
// import { cn } from "@/src/libs/cn";
// import get from "lodash/get";

// export const RHFImageSelect = ({
//   label,
//   name,
//   placeholder,
//   options = [],
//   disabled = false,
//   className,
// }) => {
//   const { control } = useFormContext();
//   const [openDropdown, setOpenDropdown] = useState(false);
//   const [query, setQuery] = useState("");
//   const dropDownRef = useRef(null);

//   // Filter the options based on the query
//   const filterOptions = options.filter((item) =>
//     item?.hotel_name?.toLowerCase().includes(query.toLowerCase())
//   );

//   const toggleDropdown = (e) => {
//     e.stopPropagation();
//     if (!disabled) {
//       setOpenDropdown((prev) => !prev);
//     }
//   };

//   const handleChangeQuery = (e) => {
//     e.stopPropagation();
//     setQuery(e.target.value);
//   };

//   const handleOptionClick = (field, selectedValue) => {
//     field.onChange(selectedValue);
//     setOpenDropdown(false);
//     setQuery("");
//   };

//   useEffect(() => {
//     const outsideClickHandler = (e) => {
//       if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
//         setOpenDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", outsideClickHandler);
//     return () => {
//       document.removeEventListener("mousedown", outsideClickHandler);
//     };
//   }, []);

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field, formState: { errors } }) => (
//         <div
//           className={cn(
//             "relative flex flex-col gap-1 w-full",
//             className,
//             disabled && "cursor-not-allowed"
//           )}
//         >
//           {label && (
//             <Typography
//               variant="p"
//               className={`text-custom-black !text-sm bg-white absolute -top-2.5 left-3 z-10 ${
//                 disabled ? "opacity-50" : ""
//               }`}
//             >
//               {label}
//             </Typography>
//           )}
//           <div className="relative w-full" ref={dropDownRef}>
//             <div
//               className={cn(
//                 "flex items-center rounded bg-white h-12 px-2 gap-2 border border-custom-neutral cursor-pointer",
//                 disabled ? "!bg-gray-100 cursor-not-allowed" : ""
//               )}
//               onClick={toggleDropdown}
//             >
//               <Typography
//                 variant="p"
//                 className={`!text-sm px-2 grow ${
//                   field.value ? "!text-secondary" : "!text-neutral-300"
//                 }`}
//               >
//                 {field.value || placeholder}
//               </Typography>
//               <Iconify
//                 iconName="mingcute:down-fill"
//                 className={`!text-primary group-hover:text-blue transition-all duration-500 ${
//                   openDropdown ? "rotate-180" : ""
//                 }`}
//               />
//             </div>

//             {openDropdown && (
//               <div className="rounded-md absolute bg-white top-[52px] w-full border border-custom-neutral divide-y divide-dashed divide-custom-neutral !z-50 max-h-56 shadow-lg overflow-hidden">
//                 <div className="p-2">
//                   <input
//                     className="!border-b border-primary !py-1.5 w-full text-sm outline-none px-2 placeholder:text-neutral-300 text-secondary"
//                     placeholder="Search..."
//                     value={query}
//                     onChange={handleChangeQuery}
//                   />
//                 </div>
//                 <div className="overflow-auto max-h-40 divide-y divide-dashed divide-secondary hide-scrollbar">
//                   {filterOptions.length > 0 ? (
//                     filterOptions.map((option, index) => (
//                       <div
//                         key={index}
//                         className={`flex items-center gap-3 py-2 px-3 hover:bg-tertiary cursor-pointer ${
//                           field.value === option.value
//                             ? "!text-primary bg-tertiary"
//                             : "!text-custom-black"
//                         }`}
//                         onClick={() => handleOptionClick(field, option.value)}
//                       >
//                         <img
//                           src={option.image}
//                           alt={option.hotel_name}
//                           className="w-10 h-10 object-cover rounded-md"
//                         />
//                         <Typography variant="p" className="!text-sm">
//                           {option.hotel_name}
//                         </Typography>
//                       </div>
//                     ))
//                   ) : (
//                     <p className="p-3 text-sm text-primary w-full text-center">
//                       No Found
//                     </p>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>

//           {errors && (
//             <Typography
//               variant="p"
//               className="!text-xs text-red-400 transition-all duration-500"
//             >
//               {get(errors, name)?.message}
//             </Typography>
//           )}
//         </div>
//       )}
//     />
//   );
// };

// SECOND IMAGE SELECT
// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { Controller, useFormContext } from "react-hook-form";
// import { Typography } from "../typography";
// import { Iconify } from "../iconify";
// import { cn } from "@/src/libs/cn";
// import get from "lodash/get";

// export const RHFImageSelect = ({
//   label,
//   name,
//   placeholder,
//   options = [],
//   disabled = false,
//   className,
// }) => {
//   const { control } = useFormContext();
//   const [openDropdown, setOpenDropdown] = useState(false);
//   const [query, setQuery] = useState("");
//   const dropDownRef = useRef(null);

//   // Filter the options based on the query
//   const filterOptions = options.filter((item) =>
//     item?.hotel_name?.toLowerCase().includes(query.toLowerCase())
//   );

//   const toggleDropdown = (e) => {
//     e.stopPropagation();
//     if (!disabled) {
//       setOpenDropdown((prev) => !prev);
//     }
//   };

//   const handleChangeQuery = (e) => {
//     e.stopPropagation();
//     setQuery(e.target.value);
//   };

//   const handleOptionClick = (field, selectedValue, selectedImage) => {
//     field.onChange(selectedValue);
//     setOpenDropdown(false);
//     setQuery("");
//     // Here, we set the image to display in the input select
//     field.onChange(selectedValue);
//   };

//   useEffect(() => {
//     const outsideClickHandler = (e) => {
//       if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
//         setOpenDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", outsideClickHandler);
//     return () => {
//       document.removeEventListener("mousedown", outsideClickHandler);
//     };
//   }, []);

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field, formState: { errors } }) => (
//         <div
//           className={cn(
//             "relative flex flex-col gap-1 w-full",
//             className,
//             disabled && "cursor-not-allowed"
//           )}
//         >
//           {label && (
//             <Typography
//               variant="p"
//               className={`text-custom-black !text-sm bg-white absolute -top-2.5 left-3 z-10 ${
//                 disabled ? "opacity-50" : ""
//               }`}
//             >
//               {label}
//             </Typography>
//           )}
//           <div className="relative w-full" ref={dropDownRef}>
//             <div
//               className={cn(
//                 "flex items-center rounded bg-white h-12 px-2 gap-2 border border-custom-neutral cursor-pointer",
//                 disabled ? "!bg-gray-100 cursor-not-allowed" : ""
//               )}
//               onClick={toggleDropdown}
//             >
//               {/* Display selected image */}
//               {field.value && (
//                 <img
//                   src={
//                     options.find((option) => option.value === field.value)
//                       ?.image
//                   }
//                   alt={field.value}
//                   className="w-10 h-10 object-cover rounded-md mr-2"
//                 />
//               )}
//               <Typography
//                 variant="p"
//                 className={`!text-sm px-2 grow ${
//                   field.value ? "!text-secondary" : "!text-neutral-300"
//                 }`}
//               >
//                 {field.value || placeholder}
//               </Typography>
//               <Iconify
//                 iconName="mingcute:down-fill"
//                 className={`!text-primary group-hover:text-blue transition-all duration-500 ${
//                   openDropdown ? "rotate-180" : ""
//                 }`}
//               />
//             </div>

//             {openDropdown && (
//               <div className="rounded-md absolute bg-white top-[52px] w-full border border-custom-neutral divide-y divide-dashed divide-custom-neutral !z-50 max-h-56 shadow-lg overflow-hidden">
//                 <div className="p-2">
//                   <input
//                     className="!border-b border-primary !py-1.5 w-full text-sm outline-none px-2 placeholder:text-neutral-300 text-secondary"
//                     placeholder="Search..."
//                     value={query}
//                     onChange={handleChangeQuery}
//                   />
//                 </div>
//                 <div className="overflow-auto max-h-40 divide-y divide-dashed divide-secondary hide-scrollbar">
//                   {filterOptions.length > 0 ? (
//                     filterOptions.map((option, index) => (
//                       <div
//                         key={index}
//                         className={`flex items-center gap-3 py-2 px-3 hover:bg-tertiary cursor-pointer ${
//                           field.value === option.value
//                             ? "!text-primary bg-tertiary"
//                             : "!text-custom-black"
//                         }`}
//                         onClick={() =>
//                           handleOptionClick(field, option.value, option.image)
//                         }
//                       >
//                         <img
//                           src={option.image}
//                           alt={option.hotel_name}
//                           className="w-10 h-10 object-cover rounded-md"
//                         />
//                         <div>
//                           <Typography variant="p" className="!text-sm">
//                             {option.hotel_name}
//                           </Typography>
//                           <Typography
//                             variant="p"
//                             className="!text-xs text-neutral-500"
//                           >
//                             {option.address} {/* Display the address here */}
//                           </Typography>
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <p className="p-3 text-sm text-primary w-full text-center">
//                       No Found
//                     </p>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>

//           {errors && (
//             <Typography
//               variant="p"
//               className="!text-xs text-red-400 transition-all duration-500"
//             >
//               {get(errors, name)?.message}
//             </Typography>
//           )}
//         </div>
//       )}
//     />
//   );
// };

// THIRD **********************************************************
"use client";

import React, { useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Typography } from "../typography";
import { Iconify } from "../iconify";
import { cn } from "@/src/libs/cn";
import get from "lodash/get";

export const RHFImageSelect = ({
  label,
  name,
  placeholder,
  options = [],
  disabled = false,
  className,
}) => {
  const { control } = useFormContext();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [query, setQuery] = useState("");
  const dropDownRef = useRef(null);

  // Filter the options based on the query
  const filterOptions = options.filter((item) =>
    item?.hotel_name?.toLowerCase().includes(query.toLowerCase())
  );

  const toggleDropdown = (e) => {
    e.stopPropagation();
    if (!disabled) {
      setOpenDropdown((prev) => !prev);
    }
  };

  const handleChangeQuery = (e) => {
    e.stopPropagation();
    setQuery(e.target.value);
  };

  const handleOptionClick = (field, selectedValue, selectedOption) => {
    field.onChange(selectedValue);
    setOpenDropdown(false);
    setQuery("");

    // Set the selected hotel info in the label
    const selectedLabel = (
      <div className="flex items-center gap-2 w-full">
        <img
          src={selectedOption.image}
          alt={selectedOption.hotel_name}
          className="w-7 h-7 object-cover rounded-md"
        />
        <div>
          <Typography variant="p" className="!text-sm !text-secondary">
            {selectedOption.hotel_name}
          </Typography>
          <Typography variant="p" className="!text-xs text-neutral-500">
            {selectedOption.address}{" "}
            {/* Assuming 'address' is part of the selectedOption */}
          </Typography>
        </div>
      </div>
    );

    field.onChange(selectedLabel);
  };

  useEffect(() => {
    const outsideClickHandler = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", outsideClickHandler);
    return () => {
      document.removeEventListener("mousedown", outsideClickHandler);
    };
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState: { errors } }) => (
        <div
          className={cn(
            "relative flex flex-col gap-1 w-full",
            className,
            disabled && "cursor-not-allowed"
          )}
        >
          {label && (
            <Typography
              variant="p"
              className={`text-custom-black !text-sm bg-white absolute -top-2.5 left-3 z-10 ${
                disabled ? "opacity-50" : ""
              }`}
            >
              {label}
            </Typography>
          )}
          <div className="relative w-full" ref={dropDownRef}>
            <div
              className={cn(
                "flex items-center justify-between rounded bg-white h-12 px-2 gap-2 border border-custom-neutral cursor-pointer",
                disabled ? "!bg-gray-100 cursor-not-allowed" : ""
              )}
              onClick={toggleDropdown}
            >
              <div className="flex items-center">
                {field.value && typeof field.value === "string" ? (
                  <Typography
                    variant="p"
                    className={`!text-sm px-2 grow !text-neutral-300`}
                  >
                    {placeholder}
                  </Typography>
                ) : (
                  field.value
                )}
              </div>
              <Iconify
                iconName="mingcute:down-fill"
                className={`!text-primary group-hover:text-blue transition-all duration-500 ${
                  openDropdown ? "rotate-180" : ""
                }`}
              />
            </div>

            {openDropdown && (
              <div className="rounded-md absolute bg-white top-[52px] w-full border border-custom-neutral divide-y divide-dashed divide-custom-neutral !z-50 max-h-56 shadow-lg overflow-hidden">
                <div className="p-2">
                  <input
                    className="!border-b border-primary !py-1.5 w-full text-sm outline-none px-2 placeholder:text-neutral-300 text-secondary"
                    placeholder="Search..."
                    value={query}
                    onChange={handleChangeQuery}
                  />
                </div>
                <div className="overflow-auto max-h-40 divide-y divide-dashed divide-secondary hide-scrollbar">
                  {filterOptions.length > 0 ? (
                    filterOptions.map((option, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-3 py-2 px-3 hover:bg-tertiary cursor-pointer ${
                          field.value === option.value
                            ? "!text-primary bg-tertiary"
                            : "!text-custom-black"
                        }`}
                        onClick={() =>
                          handleOptionClick(field, option.value, option)
                        }
                      >
                        <img
                          src={option.image}
                          alt={option.hotel_name}
                          className="w-10 h-10 object-cover rounded-md"
                        />
                        <div>
                          <Typography variant="p" className="!text-sm">
                            {option.hotel_name}
                          </Typography>
                          <Typography
                            variant="p"
                            className="!text-xs text-neutral-500"
                          >
                            {option.address}{" "}
                            {/* Make sure this is included in your data */}
                          </Typography>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="p-3 text-sm text-primary w-full text-center">
                      No Found
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

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
};
