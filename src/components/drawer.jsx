"use client";
import React, { useEffect, useRef } from "react";

export const Drawer = ({ isDrawerOpen, setIsDrawerOpen, children }) => {
  const drawerRef = useRef(null);

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        setIsDrawerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="text-center h-full w-full !z-50 ">
      <div
        className={` ${
          isDrawerOpen
            ? " w-screen h-screen fixed bg-black  bg-opacity-50  top-0 left-0  "
            : null
        }`}
      >
        <div
          ref={drawerRef}
          className={`fixed top-0 left-0 h-full !z-50 border-gray-200 bg-custom-white p-6 w-full min-450:w-96 transition-transform transform overflow-auto hide-scrollbar  bg-white shadow-lg  duration-300 ${
            isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          } `}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
