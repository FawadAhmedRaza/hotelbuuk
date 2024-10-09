import React from "react";

// Components and Others..
import { Pannel } from "../components";
import { BookingSteps, Footer, NavBar } from "../sections";
import { HotelLocation, NearByHotels } from "../sections/hotel-details";

const HotelDetailScreen = () => {
  return (
    <div className="w-full h-full">
      <NavBar className="bg-primary static" />
        <BookingSteps />
        <HotelLocation />
        <NearByHotels />
      <Footer />
    </div>
  );
};

export default HotelDetailScreen;
