import React from "react";

// Components and Others..
import { Pannel } from "../components";
import { BookingSteps, Footer, NavBar } from "../sections";
import {
  GuestReviews,
  HotelLocation,
  NearByHotels,
  ThingsKnow,
} from "../sections/hotel-details";

const HotelDetailScreen = () => {
  return (
    <div className="w-full h-full">
      <NavBar className="bg-primary static" />
      <BookingSteps />
      <GuestReviews />
      <HotelLocation />
      <ThingsKnow />
      <NearByHotels />
      <Footer />
    </div>
  );
};

export default HotelDetailScreen;
