"use client";

import React, { useEffect, useState } from "react";

import { useBoolean } from "@/src/hooks";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";

import { NomadDashboardMenu } from "./menu-link";
import {
  AnchorTag,
  Avatar,
  Iconify,
  ProfileAvatar,
  Typography,
} from "@/src/components";
import { LangaugeTranslator } from "@/src/sections";
import { cn } from "@/src/libs/cn";
import { useDispatch, useSelector } from "react-redux";
import { getNomadProfileById } from "@/src/redux/nomad-profile/thunk";

export const NomadDashboardNavBar = React.memo(({ className }) => {
  const { user } = useAuthContext();
  const dispatch = useDispatch();

  const { isOpen, toggleDrawer, setIsOpen } = useBoolean();

  const { nomad } = useSelector((state) => state.nomadProfile.getById);

  useEffect(() => {
    async function fetchNomad() {
      await dispatch(getNomadProfileById(user?.id)).unwrap();
    }
    fetchNomad();
  }, []);

  return (
    <div
      className={cn(
        "w-full flex justify-between items-center gap-1 py-5 fixed top-0 z-[999] px-2 sm:px-8 lg:px-14 xl:px-10 !bg-black",
        className
      )}
    >
      <div className="flex items-center gap-10">
        <div className="cursor-pointer" onClick={toggleDrawer}>
          <Iconify
            iconName="material-symbols:menu"
            className="size-5 sm:size-8 md:size-10"
          />
        </div>
        <AnchorTag className="!no-underline" href={"/"}>
          <div className=" flex gap-3 items-center">
            <img
              src="/assets/images/transperent-logo/transperent/WHITE.png"
              className="w-12"
            />
            <Typography
              variant="h3"
              className="sm:!text-xl md:flex hidden md:!text-[1.6rem] !text-[14px] font-bold text-white text-start text-nowrap"
            >
              Dashboard
            </Typography>
          </div>
        </AnchorTag>
      </div>

      {isOpen && (
        <NomadDashboardMenu
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onClick={toggleDrawer}
        />
      )}

      <div className="flex gap-2 sm:gap-5">
        <div className="flex items-center gap-1 sm:gap-3 border border-white rounded-full px-3 py-1 sm:px-2 sm:py-1 hover:bg-black hover:bg-opacity-20">
          {/* <Iconify
            iconName="material-symbols:menu"
            className="size-5 sm:size-8 "
          /> */}
          <div className="flex items-center gap-5 sm:gap-1">
            {user?.first_name && (
              <Typography
                variant="p"
                className="hidden md:block font-medium mr-3  !text-xs text-white text-nowrap"
              >
                {`Hi, ${user?.first_name}`}
              </Typography>
            )}

            {user.profile_img ? (
              <ProfileAvatar
                src={user?.profile_img}
                type={"server"}
                effect="blur"
                alt={user?.first_name}
                iconSize="!size-8"
                className="w-7 h-7 md:w-8 md:h-8  object-cover rounded-full"
              />
            ) : (
              <Iconify
                iconName="carbon:user-avatar-filled"
                className="!size-8 md:!size-10 text-white"
              />
            )}
          </div>
        </div>

        <LangaugeTranslator />
      </div>
    </div>
  );
});
