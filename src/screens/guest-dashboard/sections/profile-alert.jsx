"use client";

import React from "react";

import Link from "next/link";
import { paths } from "@/src/contants";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";

const GuestProfileAlert = ({ setShowAlert }) => {
  const { user } = useAuthContext();

  return (
    <div
      role="alert"
      className="mb-4 relative flex flex-col md:flex-row items-center justify-between p-4 text-primary bg-[#fef5fc] rounded-md"
    >
      <div className="flex-1 md:mr-4 font-montserrat">
        <Link
          href={paths.guestDashboard.update_profile(user?.id)}
          className={`font-medium text-md text-primary hover:underline font-montserrat`}
          rel="noopener noreferrer"
        >
          Your profile is incomplete. complete now
        </Link>
      </div>

      <button
        className="flex items-center justify-center transition-all w-8 h-8 rounded-md text-primary hover:bg-white/10 active:bg-white/10 absolute top-auto right-2"
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

export default GuestProfileAlert;
