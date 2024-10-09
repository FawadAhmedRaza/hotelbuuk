import React from "react";

// Components and Others..
import { Pannel } from "../components";
import { BookingSteps, Footer, NavBar } from "../sections";
import {
  GuestReviews,
  HotelLocation,
  HotelOverview,
  NearByHotels,
  ThingsKnow,
  PopularAmenities,
  HotelDetail,
} from "../sections/hotel-details";

const HotelDetailScreen = React.memo(() => {
  return (
    <div className="w-full h-full">
      <NavBar className="bg-primary static" />
      <HotelOverview />
      <HotelDetail />
      <BookingSteps />
      <PopularAmenities />
      <HotelLocation />
      <GuestReviews />
      <ThingsKnow />
      <NearByHotels />
      <Footer />
    </div>
  );
});

export default HotelDetailScreen;
