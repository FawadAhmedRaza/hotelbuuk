"use client";
import React, { useEffect, useRef } from "react";

export const Drawer = ({ isDrawerOpen, setIsDrawerOpen, children }) => {
  const drawerRef = useRef(null);

  // Lock or unlock body scroll based on drawer state
  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  // Close the drawer when clicking outside of it
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
  }, [setIsDrawerOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isDrawerOpen ? "bg-black bg-opacity-50" : "pointer-events-none"
      }`}
    >
      <div
        ref={drawerRef}
        className={`fixed top-0 left-0 h-full z-50 bg-white p-6 w-full min-450:w-96 transition-transform duration-300 ease-in-out transform ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
