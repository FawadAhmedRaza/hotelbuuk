"use client";

import React from "react";

import { useRouter } from "next/navigation";

import { Button, Pannel, Typography } from "@/src/components";

const RejectInvitationScreen = ({ hotelName }) => {
  const router = useRouter();

  return (
    <>
      <Pannel className="flex flex-col justify-start  h-screen">
        <div className="flex flex-col gap-10 justify-center items-center">
          <div className="flex justify-center items-center w-40 h-40 ">
            <img
              src="https://i.pinimg.com/originals/47/ff/8d/47ff8dc9fabc0e455f7113d4213cdaa0.png"
              alt="trophy"
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-5">
            <Typography variant="h1" className="">
              Invitation Decline
            </Typography>
            <Typography variant="h4" className="">
              You request has been successfully decline for becoming {hotelName}{" "}
              internal Nomad.
            </Typography>
            <Button onClick={() => router.push("/")}>Continue</Button>
          </div>
        </div>
      </Pannel>
    </>
  );
};

export default RejectInvitationScreen;
