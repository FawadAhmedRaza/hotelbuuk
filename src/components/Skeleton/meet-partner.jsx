import React from "react";

const MeetPartnerSkeleton= () => {
  return (
    <div>
      <div className={"relative w-full animate-pulse"}>
        <div className="w-full h-full relative">
          <div className=" absolute top-5 right-5 z-30  w-10 rounded-full   h-10 bg-gray-50"></div>
          {/* Image Placeholder */}
          <div className="h-80 relative bg-gray-100 rounded-3xl overflow-hidden">
            <div className="absolute rounded-3xl inset-0 bg-gray-100 "></div>
          </div>

          {/* Price and Category at the Bottom Left */}
          <div className="absolute bottom-2 left-0 right-0 px-5 w-full h-full flex flex-col justify-end items-start pb-5">
            <div className="w-full px-5  h-10 bg-gray-50 rounded-md"></div>
          </div>
        </div>

        {/* Card Details Section */}
      </div>
    </div>
  );
};

export default MeetPartnerSkeleton;
