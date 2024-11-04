"use client";

import React from "react";
import {
  AnchorTag,
  Button,
  Iconify,
  ProfileAvatar,
  Typography,
} from "@/src/components";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export const HostBio = React.memo(() => {
  const { t } = useTranslation();
  const { event } = useSelector((state) => state.allEvents.getById);
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between md:flex-row  flex-wrap">
        <Typography
          variant="h4"
          className="font-semibold !text-[1.26rem] md:text-2xl"
        >
          {t("hotelDetail.hostBio.meetHost")}
        </Typography>
        <Typography variant="h6" className="text-gray-400">
          {t("hotelDetail.hostBio.inHouse")}
        </Typography>
      </div>
      <div className="flex flex-col mt-3  bg-gray-100   rounded-xl  shadow-md  ">
        <div className="flex flex-col  gap-5 bg-white  w-full p-5 ">
          <div className="flex items-center  justify-between lg:justify-start w-full  gap-2 xl:gap-10 ">
            {/* <Avatar
              src="/assets/images/host.png"
              className=" size-24 lg:!size-32"
            /> */}
            <ProfileAvatar
              src={event?.nomad?.profile_img}
              type={"server"}
              effect="blur"
              alt={event?.nomad?.first_name}
              className="w-24 h-24 lg:w-[120px] lg:h-[120px] object-cover rounded-full"
            />
            <div className="flex flex-col  gap-2 xl:mr-3 ">
              <Typography variant="h5" className="font-semibold ">
                {event?.nomad?.first_name}
              </Typography>
              <Typography variant="p" className="font-medium ">
                {event?.nomad?.city} {event?.nomad?.country}
              </Typography>
              <span className="flex items-center gap-2 ">
                <AnchorTag
                  href={event?.nomad?.linkedin || ""}
                  target={"_blank"}
                  className=" text-[#0077B5] font-medium !text-sm md:!text-base"
                >
                  Linkedin
                </AnchorTag>
                <Iconify iconName="devicon:linkedin" />
              </span>
            </div>
          </div>
          <div className="flex  justify-between lg:justify-start gap-8 ">
            <div className="flex flex-col  gap-3 ">
              <Typography variant="h6" className="font-semibold">
                {t("hotelDetail.hostBio.businessMeeting")}
              </Typography>
              <Typography variant="p" className="font-medium -mt-3">
                {t("hotelDetail.hostBio.complete")}
              </Typography>
            </div>
            <div className="flex flex-col  gap-3 pe-10 ">
              <Typography variant="h6" className="font-semibold">
                {t("hotelDetail.hostBio.specialty")}
              </Typography>
              <Typography variant="p" className="font-medium text-secondary">
                {event?.nomad?.electronics} <br /> {event?.nomad?.manufacturing}{" "}
                <br /> {event?.nomad?.fundraising}
                <br /> {event?.nomad?.retails}
              </Typography>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-5">
          <Typography variant="h5" className="font-semibold">
            {t("hotelDetail.hostBio.myBio")}
          </Typography>
          <Typography variant="p" className="font-normal">
            {event?.nomad?.bio}
          </Typography>
        </div>
      </div>
    </div>
  );
});
