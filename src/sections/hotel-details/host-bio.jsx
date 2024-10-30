"use client";

import React from "react";
import {
  AnchorTag,
  Avatar,
  Button,
  Iconify,
  ProfileAvatar,
  Typography,
} from "@/src/components";
import { useSelector } from "react-redux";

export const HostBio = React.memo(() => {
  const { event } = useSelector((state) => state.allEvents.getById);

  // const profileImg = event?.nomad?.profile_img ||

  return (
    <div className="flex flex-col gap-3 w-full md:w-[550px]">
      <Typography variant="h4" className="font-medium text-xl md:text-3xl">
        Meet Your Host
      </Typography>
      <Typography variant="h6">in-house</Typography>
      <div className="flex flex-col  bg-section-bg rounded-lg  shadow-custom-shadow-sm overflow-hidden ">
        <div className="flex flex-col  gap-5 bg-white rounded-b-lg w-full p-5 ">
          <div className="flex items-center  justify-between lg:justify-start lg:gap-16 ">
            {/* <Avatar
              src="/assets/images/host.png"
              className=" size-24 lg:!size-32"
            /> */}
            <ProfileAvatar
              src={event?.nomad?.profile_img}
              type={"server"}
              alt={event?.nomad?.first_name}
              className="w-24 h-24 lg:w-32 lg:h-32 object-cover rounded-full"
            />
            <div className="flex flex-col gap-3 mr-3 ">
              <Typography variant="h4" className="font-semibold ">
                {event?.nomad?.first_name}
              </Typography>
              <Typography variant="p" className="font-medium ">
                Paris, france
              </Typography>
              <span className="flex items-center gap-2 ">
                <AnchorTag
                  href="#"
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
                Business meeting
              </Typography>
              <Typography variant="p" className="font-medium -mt-3">
                12 completed
              </Typography>
            </div>
            <div className="flex flex-col  gap-3 ">
              <Typography variant="h6" className="font-semibold">
                Specialty
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
            MY BIO
          </Typography>
          <Typography variant="p" className="font-normal">
            I graduated with first class degree in pharmacy. i completed my
            masters in IVN nanomediacations.
          </Typography>
          <Button className="w-full mt-2">Reserve</Button>
        </div>
      </div>
    </div>
  );
});
