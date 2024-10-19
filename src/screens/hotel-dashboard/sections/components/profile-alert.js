import React from "react";

import Link from "next/link";

const ProfileAlert = ({ setShowAlert }) => {
  return (
    <div
      role="alert"
      className="mb-4 relative flex flex-col md:flex-row items-center justify-between p-4 text-white bg-[#d54fd5] rounded-md"
    >
      <div className="flex-1 md:mr-4 font-montserrat">
        <Link
          href={"/hotel-info"}
          className={`font-medium text-md text-white hover:underline font-montserrat`}
          rel="noopener noreferrer"
        >
          Your profile is incomplete. complete now
        </Link>
      </div>

      <button
        className="flex items-center justify-center transition-all w-8 h-8 rounded-md text-white hover:bg-white/10 active:bg-white/10 absolute top-auto right-2"
        type="button"
        onClick={() => setShowAlert(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-5 w-5"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default ProfileAlert;
