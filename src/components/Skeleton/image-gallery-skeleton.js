import React from "react";

const ImageGallerySkeleton = () => {
  return (
    // <div className="relative hidden sm:flex flex-row gap-2 w-full h-[55vh] xl:h-[63vh]">
    //   {/* Button Skeleton */}
    //   <span className="absolute right-5 z-20 bottom-5 bg-gray-300 rounded-lg py-2 px-4 cursor-not-allowed opacity-50">
    //     <div className="h-4 w-32 bg-gray-400 rounded-md animate-pulse"></div>
    //   </span>

    //   {/* Main Image Skeleton */}
    //   <div className="h-full w-full rounded-l-2xl overflow-hidden bg-gray-300 animate-pulse"></div>

    //   {/* Thumbnail Skeletons */}
    //   <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full h-full">
    //     {[...Array(4)].map((_, index) => (
    //       <div key={index} className="relative w-full h-full">
    //         <div
    //           className={`h-full w-full bg-gray-300 animate-pulse ${
    //             index === 1 ? "rounded-tr-2xl" : ""
    //           } ${index === 3 ? "rounded-br-2xl" : ""}`}
    //         ></div>
    //       </div>
    //     ))}
    //   </div>
    // </div>

    <div className="relative hidden sm:flex flex-row gap-2 w-full h-[55vh] xl:h-[63vh] animate-pulse">
      {/* Button Skeleton */}
      <span className="absolute right-5 z-20 bottom-5 bg-gray-300 rounded-lg py-2 px-4">
        <div className="h-5 w-24 bg-gray-400 rounded"></div>
      </span>

      {/* Left Image Skeleton */}
      <div className="h-full w-full rounded-l-2xl rounded-bl-2xl bg-gray-300"></div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full h-full">
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className={`relative w-full h-full bg-gray-300 ${
                index === 1 && "rounded-tr-2xl"
              } ${index === 3 && "rounded-br-2xl"}`}
            ></div>
          ))}
      </div>
    </div>
  );
};

export default ImageGallerySkeleton;
