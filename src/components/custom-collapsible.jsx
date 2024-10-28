"use client";
import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const CustomCollapsible = React.memo(
  ({ children, className, isOpen }) => {
    const colRef = useRef(null);
    const [maxHeight, setMaxHeight] = useState("0px");

    useEffect(() => {
      if (colRef.current) {
        setMaxHeight(isOpen ? `${colRef.current.scrollHeight}px` : "0px");
      }
    }, [isOpen, children]);

    return (
      <div
        className={`w-full h-full object-contain flex flex-col justify-center ${className}`}
      >
        <div
          ref={colRef}
          className={cn(
            "transition-all duration-300 ease-in-out overflow-hidden p-5 ",
            isOpen ? "overscroll-x-auto" : ""
          )}
          style={{
            maxHeight: maxHeight,
          }}
        >
          {children}
        </div>
      </div>
    );
  }
);
