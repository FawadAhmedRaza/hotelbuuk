import React from "react";

// Components and Others..
import { BookingSteps, Layout, } from "../sections";
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
      <Layout isNavBg={true}>
        <HotelOverview />
        <HotelDetail />
        <BookingSteps />
        <PopularAmenities />
        <HotelLocation />
        <GuestReviews />
        <ThingsKnow />
        <NearByHotels />
      </Layout>
    </div>
  );
});

export default HotelDetailScreen;
