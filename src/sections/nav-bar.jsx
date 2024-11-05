"use client";
import React, { useState, useEffect } from "react";

// Components and Others..
import { AnchorTag, Iconify, ProfileAvatar, Typography } from "../components";
import { LangaugeTranslator } from ".";
import { useBoolean } from "../hooks/use-boolean";
import { Menu } from "./menu";
import { cn } from "../libs/cn";
import { useAuthContext } from "../providers/auth/context/auth-context";

export const NavBar = React.memo(({ className }) => {
  const { user } = useAuthContext();
  const { isOpen, toggleDrawer, setIsOpen } = useBoolean();

  // State for controlling navbar visibility and shadow
  const [showNavBar, setShowNavBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle shadow when scrolled more than 20px from the top
      if (window.scrollY > 20) {
        setShowNavBar(true);
      } else {
        setShowNavBar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        `!fixed w-full flex justify-between items-center gap-1 py-4 z-[999] px-2 sm:px-8 lg:px-14 xl:px-12 bg-white transition-shadow duration-300 ease-in-out`,
        showNavBar ? "shadow-md" : "",
        className
      )}
    >
      <AnchorTag
        href={"/"}
        className="flex hover:no-underline items-center gap-2"
      >
        <img
          src="/assets/images/transperent-logo/transperent/PINK.png"
          className="w-12"
        />
        <Typography
          variant="h3"
          className="!text-md sm:!text-3xl sm:flex hidden md:!text-3xl font-semibold !text-primary text-start font-poppins"
        >
          Hotelbuuk
        </Typography>
      </AnchorTag>

      {isOpen && (
        <Menu isOpen={isOpen} setIsOpen={setIsOpen} onClick={toggleDrawer} />
      )}
      <div className="flex gap-2 sm:gap-5">
        {/* Language */}
        <LangaugeTranslator
          mainClass={
            " !text-gray-600 !border-gray-600   hover:!bg-gray-100 hover:!bg-opacity-100"
          }
          iconClass={"text-gray-600"}
        />
        {/* Login */}
        <div
          onClick={toggleDrawer}
          className="flex items-center gap-1 sm:gap-5 rounded-full px-2 py-1 sm:px-4 sm:py-1 border border-gray-600 cursor-pointer hover:bg-gray-100"
        >
          <Iconify
            iconName="mynaui:menu"
            className="size-5 sm:size-8 text-gray-600"
          />
          <span className="flex items-center gap-1">
            <ProfileAvatar
              src={user?.profile_img}
              type={"server"}
              effect="blur"
              alt={user?.hotel_name}
              className="!w-5 !h-5 md:!w-8 md:!h-8 object-cover rounded-full"
            />
            <Typography
              variant="p"
              className="font-medium !text-xs text-gray-600 text-nowrap"
            >
              {user ? user?.first_name : ""}
            </Typography>
          </span>
        </div>
      </div>
    </div>
  );
});
