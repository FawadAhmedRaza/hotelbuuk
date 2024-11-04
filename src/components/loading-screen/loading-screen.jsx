"use client";
export default function LoadingScreen({ className, ...other }) {
  return (
    <div
      className={`flex items-center justify-center w-full  h-96 sm:h-[450px] px-5 ${className}`}
      {...other}
    >
      <div className="w-full max-w-md">
        <div className="w-full h-1 bg-gray-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-1/4 bg-primary animate-loadingProgress"></div>
        </div>
      </div>
    </div>
  );
}
