import React from "react";

// Components and Others..
import { Pannel } from "../components";
import { BookingSteps, Footer, NavBar } from "../sections";
import { HotelLocation } from "../sections/hotel-details";

const HotelDetailScreen = () => {
  return (
    <div className="w-full h-full">
      <NavBar className="bg-primary static" />
      <Pannel>
        <BookingSteps />
        <HotelLocation />
      </Pannel>
      <Footer />
    </div>
  );
};

export default HotelDetailScreen;
