"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Iconify } from "../iconify";

export const Pagination = React.memo(
  ({ currentPage, totalPages, onPageChange, rowsPerPage, setRowsPerPage }) => {
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      const handleOutSideClick = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleOutSideClick);
      return () => {
        document.removeEventListener("mousedown", handleOutSideClick);
      };
    }, []);

    const rowValues = [
      { id: 1, value: 5 },
      { id: 2, value: 10 },
      { id: 3, value: 15 },
      { id: 4, value: 20 },
    ];

    const generatePageNumbers = useMemo(() => {
      const pages = [];
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages || 0;
    }, [totalPages]);

    const handleRowChange = (val) => {
      setRowsPerPage(val);
      setIsOpen(false);
      onPageChange(1);
    };

    const handlePageChange = (newPage) => {
      if (newPage < 1 || newPage > totalPages) return;
      onPageChange(newPage);
    };

    return (
      <div className="flex flex-wrap justify-between items-center gap-2 grow border-t border-dashed border-gray-200 px-4 sm:px-6 py-4 !z-40 bg-white shadow-sm rounded-b-xl">
        <div className="flex items-center gap-2">
          <Iconify
            iconName="ri:arrow-left-double-line"
            className={` cursor-pointer text-primary   ${
              currentPage === 1
                ? "cursor-not-allowed opacity-40 pointer-events-none"
                : ""
            }`}
            onClick={() => handlePageChange(1)}
          />

          {totalPages === 0 ? (
            <button className="rounded-lg cursor-pointer w-8 h-8 outline-none text-primary bg-pagination shadow-sm border-2 border-white">
              0
            </button>
          ) : (
            generatePageNumbers?.map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={(e) => {
                  handlePageChange(pageNumber), e.preventDefault();
                }}
                className={`rounded-lg cursor-pointer w-8 h-8 outline-none text-primary   ${
                  pageNumber === currentPage
                    ? "bg-quaternary shadow-md border-2 border-white"
                    : "bg-none"
                }`}
              >
                {pageNumber}
              </button>
            ))
          )}

          <Iconify
            iconName="ri:arrow-right-double-line"
            onClick={() => handlePageChange(totalPages)}
            className={`cursor-pointer text-primary ${
              currentPage === totalPages
                ? "cursor-not-allowed opacity-40 pointer-events-none"
                : ""
            }`}
          />
        </div>

        <div
          ref={dropdownRef}
          className="relative bg-black rounded-lg shadow-custom-shadow cursor-pointer w-16 h-8 flex justify-start items-center text-white text-sm px-2.5  !z-10 font-normal"
          onClick={() => setIsOpen(!isOpen)}
        >
          {rowsPerPage}
          {isOpen && (
            <div className="absolute bottom-10 left-0 flex flex-col w-full bg-white shadow-md rounded-md !z-40 overflow-hidden">
              {rowValues?.map((item) => (
                <span
                  key={item.id}
                  onClick={() => handleRowChange(item.value)}
                  className={`flex text-black items-center w-full h-8 px-2 hover:bg-tertiary ${
                    rowsPerPage === item.value ? "bg-tertiary text-primary" : ""
                  }`}
                >
                  {item.value}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
);
