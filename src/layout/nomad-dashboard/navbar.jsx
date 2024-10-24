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
  console.log("user", user);

  const { nomad } = useSelector((state) => state.nomadProfile.getById);

  console.log("nomad from thunk", nomad);

  useEffect(() => {
    async function fetchNomad() {
      await dispatch(getNomadProfileById(user?.id)).unwrap();
    }

    fetchNomad();
  }, []);

  return (
    <div
      className={cn(
        "w-full flex justify-between items-center gap-1 py-5 absolute top-0 z-20 px-2 sm:px-8 lg:px-14 xl:px-10 ",
        className
      )}
    >
      <AnchorTag href={"/"}>
        <Typography
          variant="h3"
          className=" !text-xl sm:!text-3xl text-nowrap md:!text-[27px] font-bold text-white text-start  "
        >
          Hotelbuuk Dashboard
        </Typography>
      </AnchorTag>

      {isOpen && (
        <NomadDashboardMenu
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onClick={toggleDrawer}
        />
      )}

      <div className="flex gap-2 sm:gap-5">
        <LangaugeTranslator />

        <div
          onClick={toggleDrawer}
          className="flex items-center gap-1 sm:gap-5 border border-white rounded-lg px-2 py-1 sm:px-4 sm:py-2 cursor-pointer hover:bg-black hover:bg-opacity-20"
        >
          <Iconify
            iconName="material-symbols:menu"
            className="size-5 sm:size-8"
          />
          <span className="flex items-center gap-1">
            <Typography
              variant="p"
              className="font-medium !text-xs text-white text-nowrap"
            >
              Hi, {user ? user?.first_name : ""}
            </Typography>
            <ProfileAvatar
              src={user?.profile_img}
              type={"server"}
              alt={user?.first_name}
              className="w-10 h-10  object-cover rounded-full"
            />
            {/* <Avatar src={user?.profile_img} className="size-8 " /> */}
          </span>
        </div>
      </div>
    </div>
  );
});
