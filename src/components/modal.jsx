"use client";
import { useEffect, useRef } from "react";
import { Button, Iconify, Typography } from ".";

const Modal = ({
  isOpen,
  onClose,
  children,
  className,
  bgClass,
  title,
  handleSubmit,
  isLoading,
  disableActions,
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 !z-50 flex items-center justify-center h-auto bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out  ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        ref={modalRef}
        className={`bg-white rounded-xl border overflow-y-auto shadow-lg transform transition-transform duration-300 ease-in-out w-11/12 md:w-2/3 lg:w-1/2  max-h-[90vh] relative ${
          isOpen ? "scale-100 translate-y-0" : "scale-90 -translate-y-10"
        } ${className}`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <Typography variant="h5" className="!text-xl font-semibold">
            {title}
          </Typography>
          <span
            onClick={onClose}
            className="flex items-center justify-center w-8 h- hover:bg-gray-200 rounded-full cursor-pointer transition-all duration-300"
          >
            <Iconify
              iconName="radix-icons:cross-2"
              className="!w-6 !h-6 !text-black"
            />
          </span>
        </div>

        {/* Modal Content */}
        <div className="p-4 overflow-visible">{children}</div>

        {/* Modal Footer */}

        {!disableActions && (
          <div className="sticky bottom-0 w-full p-4 bg-white flex justify-end gap-2 border-t">
            <Button
              className="text-tertiary !px-4 !py-2 !bg-slate-900"
              type="button"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              className="text-tertiary !px-4 !py-2 !bg-slate-900"
              type="button"
              onClick={handleSubmit}
              loading={isLoading}
            >
              Submit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
