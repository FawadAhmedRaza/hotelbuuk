"use client";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import Confetti from "react-confetti";
import { Button, Pannel, Typography } from "@/src/components";

const AcceptInvitationScreen = ({ hotelName }) => {
  const router = useRouter();

  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Cleanup listener on unmount
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          numberOfPieces={300} // Control how much confetti you want
          recycle={false} // Disable recycling to stop after the animation ends
        />
      )}
      <Pannel className="flex flex-col justify-start  h-screen">
        <div className="flex flex-col gap-10 justify-center items-center">
          <div className="flex justify-center items-center w-40 h-40 ">
            <img src="/assets/images/rewards.png" alt="trophy" />
          </div>

          <div className="flex flex-col justify-center items-center gap-5">
            <Typography variant="h1" className="">
              Congratulations!
            </Typography>
            <Typography variant="h4" className="">
              You have joined {hotelName} as their internal Nomad.
            </Typography>

            <Button onClick={() => router.push("/nomad-dashboard")}>
              Continue
            </Button>
          </div>
        </div>
      </Pannel>
    </>
  );
};

export default AcceptInvitationScreen;
