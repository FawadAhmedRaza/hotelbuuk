"use client";

import { Button, Pannel, Typography } from "@/src/components";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const AcceptInvitationScreen = () => {
  //   const { width, height } = useWindowSize(); // Dynamically handle screen size
  //   const [showConfetti, setShowConfetti] = useState(true); // Control confetti visibility

  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       setShowConfetti(false); // Stop confetti after 5 seconds
  //     }, 5000);
  //     return () => clearTimeout(timer); // Cleanup timer on component unmount
  //   }, []);

  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [showConfetti, setShowConfetti] = useState(true);

  // Handle window resize to make sure the confetti fills the screen dynamically
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

  // Stop confetti after 5 seconds
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
              You have joined hotel as their internal Nomad.
            </Typography>

            <Button>Continue</Button>
          </div>
        </div>
      </Pannel>
    </>
  );
};

export default AcceptInvitationScreen;
