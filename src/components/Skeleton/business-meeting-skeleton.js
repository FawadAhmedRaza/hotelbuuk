const BussinessMeetingSkeleton = () => {
    return (
      <div className="flex flex-col gap-10 animate-pulse">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-5 lg:gap-10 w-full h-full">
          {/* Left Section */}
          <div className="flex flex-col gap-5 w-full">
            {/* Title Skeleton */}
            <div className="h-10 bg-gray-200 rounded-md"></div>
            
            {/* Description Skeleton */}
            <div className="h-20 bg-gray-200 rounded-md"></div>
  
            {/* Available Amenities */}
            <div className="flex flex-col gap-5">
              <div className="flex gap-3 justify-start items-center">
                <div className="h-6 bg-gray-200 rounded-md w-1/4"></div>
                <div className="h-5 bg-gray-200 rounded-md w-1/6"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-5 lg:py-0">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 animate-pulse"
                  >
                    <div className="h-4 w-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
  
          {/* Right Section */}
          <div className="flex flex-col justify-between items-start gap-5 w-full h-full">
            {/* Business Category Skeleton */}
            <div className="h-10 bg-gray-200 rounded-md w-full"></div>
            
            {/* Official Name Skeleton */}
            <div className="h-10 bg-gray-200 rounded-md w-full"></div>
            
            {/* Nomad Profile Skeleton */}
            <div className="flex flex-col items-start gap-5">
              <div className="w-full flex items-center gap-4">
                {/* Profile Image */}
                <div className="h-16 w-16 bg-gray-200 rounded-full"></div>
                {/* Profile Info */}
                <div className="flex flex-col gap-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Modal Skeleton Placeholder */}
        <div className="hidden"></div>
      </div>
    );
  };
  
  export default BussinessMeetingSkeleton;
  