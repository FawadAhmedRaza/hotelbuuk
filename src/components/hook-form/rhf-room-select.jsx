// "use client";

// import React, { useEffect, useState, useRef } from "react";
// import { Controller, useFormContext } from "react-hook-form";
// import { Typography } from "../typography";
// import { Iconify } from "../iconify";
// import { ProfileAvatar } from "..";
// import { cn } from "@/src/libs/cn";
// import get from "lodash/get";

// export const RHFRoomSelect = ({
//   label,
//   name,
//   placeholder,
//   hotelRooms = [],
//   disabled = false,
//   className,
// }) => {
//   const { control, setValue, watch } = useFormContext();
//   const [openDropdown, setOpenDropdown] = useState(false);
//   const [query, setQuery] = useState("");
//   const [selectedRoom, setSelectedRoom] = useState(null); // Store selected room info
//   const dropDownRef = useRef(null);

//   // Filter options based on the search query
//   const filterOptions = hotelRooms.filter((item) =>
//     item?.room_name?.toLowerCase().includes(query.toLowerCase())
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

//   const handleOptionClick = (field, selectedValue, selectedOption) => {
//     field.onChange(selectedValue); // Store only the selected value (room ID)
//     setSelectedRoom(selectedOption); // Store the full object for rendering purposes
//     setOpenDropdown(false);
//     setQuery("");
//   };

//   useEffect(() => {
//     if (selectedRoom) {
//       setSelectedRoom(selectedRoom);
//     }
//   }, [selectedRoom]);

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
//             "relative flex flex-col gap-1 w-full z-10",
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
//                 "flex items-center justify-between rounded bg-white h-12 px-2 gap-2 border border-custom-neutral cursor-pointer",
//                 disabled ? "!bg-gray-100 cursor-not-allowed" : ""
//               )}
//               onClick={toggleDropdown}
//             >
//               <div className="flex items-center">
//                 {selectedRoom ? ( // Display the selected room
//                   <div className="flex items-center gap-2 w-full">
//                     {!selectedRoom?.image ? (
//                       <Iconify
//                         iconName="carbon:user-avatar-filled"
//                         className="!size-8 rounded-full object-cover text-gray-500"
//                       />
//                     ) : (
//                       <ProfileAvatar
//                         src={selectedRoom?.image}
//                         effect="blur"
//                         iconSize="!size-8"
//                         type={"server"}
//                         className="w-7 h-7 object-cover rounded-md"
//                       />
//                     )}

//                     <div>
//                       <Typography
//                         variant="p"
//                         className="!text-sm !text-secondary"
//                       >
//                         {selectedRoom?.room_name}
//                       </Typography>
//                       <Typography
//                         variant="p"
//                         className="!text-xs text-neutral-500"
//                       >
//                         ${selectedRoom?.price}
//                       </Typography>
//                     </div>
//                   </div>
//                 ) : (
//                   <Typography
//                     variant="p"
//                     className={`!text-sm px-2 grow !text-neutral-300`}
//                   >
//                     {placeholder}
//                   </Typography>
//                 )}
//               </div>
//               <Iconify
//                 iconName="mingcute:down-fill"
//                 className={`!text-primary group-hover:text-blue transition-all duration-500 ${
//                   openDropdown ? "rotate-180" : ""
//                 }`}
//               />
//             </div>

//             {openDropdown && (
//               <div className="rounded-md absolute bg-white top-[52px] w-full border border-custom-neutral divide-y divide-dashed divide-custom-neutral !z-[9999] max-h-56 shadow-lg overflow-hidden">
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
//                           handleOptionClick(field, option.value, option)
//                         }
//                       >
//                         <ProfileAvatar
//                           src={option?.image}
//                           effect="blur"
//                           iconSize="!size-10"
//                           type={"server"}
//                           className="w-10 h-10 object-cover rounded-md"
//                         />
//                         <div>
//                           <Typography variant="p" className="!text-sm">
//                             {option?.room_name}
//                           </Typography>
//                           <Typography
//                             variant="p"
//                             className="!text-xs text-neutral-500"
//                           >
//                             ${option?.price}
//                           </Typography>
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <p className="p-3 text-sm text-primary w-full text-center">
//                       No rooms found
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

// SECOND******************************************

"use client";

import React, { useEffect, useState, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Typography } from "../typography";
import { Iconify } from "../iconify";
import { ProfileAvatar } from "..";
import { cn } from "@/src/libs/cn";
import get from "lodash/get";

export const RHFRoomSelect = ({
  label,
  name,
  placeholder,
  hotelRooms = [],
  disabled = false,
  className,
}) => {
  const { control, setValue, watch } = useFormContext();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null); // Store selected room info
  const dropDownRef = useRef(null);

  // Watch for room_id changes in the form
  const roomId = watch("business_meeting.room_id"); // Change key as per your form structure

  // Filter options based on the search query
  const filterOptions = hotelRooms.filter((item) =>
    item?.room_name?.toLowerCase().includes(query.toLowerCase())
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
    field.onChange(selectedValue); // Store only the selected value (room ID)
    setSelectedRoom(selectedOption); // Store the full object for rendering purposes
    setOpenDropdown(false);
    setQuery("");
  };

  useEffect(() => {
    if (roomId) {
      const existingRoom = hotelRooms.find((room) => room.value === roomId); // Find the room by its ID
      if (existingRoom) {
        setSelectedRoom(existingRoom); // Set the selected room if found
      }
    }
  }, [roomId, hotelRooms]); // Rerun if roomId or hotelRooms change

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
            "relative flex flex-col gap-1 w-full z-10",
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
                {selectedRoom ? ( // Display the selected room
                  <div className="flex items-center gap-2 w-full">
                    {!selectedRoom?.image ? (
                      <Iconify
                        iconName="carbon:user-avatar-filled"
                        className="!size-8 rounded-full object-cover text-gray-500"
                      />
                    ) : (
                      <ProfileAvatar
                        src={selectedRoom?.image}
                        effect="blur"
                        iconSize="!size-8"
                        type={"server"}
                        className="w-7 h-7 object-cover rounded-md"
                      />
                    )}

                    <div>
                      <Typography
                        variant="p"
                        className="!text-sm !text-secondary"
                      >
                        {selectedRoom?.room_name}
                      </Typography>
                      <Typography
                        variant="p"
                        className="!text-xs text-neutral-500"
                      >
                        ${selectedRoom?.price}
                      </Typography>
                    </div>
                  </div>
                ) : (
                  <Typography
                    variant="p"
                    className={`!text-sm px-2 grow !text-neutral-300`}
                  >
                    {placeholder}
                  </Typography>
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
              <div className="rounded-md absolute bg-white top-[52px] w-full border border-custom-neutral divide-y divide-dashed divide-custom-neutral !z-[9999] max-h-56 shadow-lg overflow-hidden">
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
                        <ProfileAvatar
                          src={option?.image}
                          effect="blur"
                          iconSize="!size-10"
                          type={"server"}
                          className="w-10 h-10 object-cover rounded-md"
                        />
                        <div>
                          <Typography variant="p" className="!text-sm">
                            {option?.room_name}
                          </Typography>
                          <Typography
                            variant="p"
                            className="!text-xs text-neutral-500"
                          >
                            ${option?.price}
                          </Typography>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="p-3 text-sm text-primary w-full text-center">
                      No rooms found
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
