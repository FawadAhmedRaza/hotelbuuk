import React from "react";
import { Button, Pannel, Typography } from "../../components";
import { hotels } from "../../_mock/_hotels";
import { BgIcon } from "../../components/bg-icon";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/swiper-bundle.css";
// import { Navigation } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";

export const Destinations = React.memo(() => {
  return (
    <Pannel className="flex flex-col gap-10 justify-center items-center ">
      <div className="flex justify-center sm:justify-between items-center w-full md:px-8">
        <Typography
          variant="h2"
          className="font-semibold text-center w-full mb-5"
        >
          Popular Destinations
        </Typography>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-center items-center  gap-8 lg:gap-5 w-full">
        {hotels?.map((item) => (
          <div key={item.id} className="relative w-full mx-auto">
            <div className="w-full   h-auto relative">
              <img
                src={item.imageUrl}
                alt={item.hotelName}
                className="w-full   h-auto "
              />
              <img
                src="/assets/images/hotel-shadow.png"
                alt={item.hotelName}
                className="w-[96%] sm:w-[96%]  h-auto absolute top-0 left-2 "
              />
              <div className=" absolute top-0 w-full h-full flex flex-col gap-1.5 justify-center items-center">
                <Typography
                  variant="h3"
                  className=" text-2xl md:text-3xl font-bold text-white uppercase text-center  font-lemonMilk "
                >
                  {item.hotelName}
                </Typography>
                <Typography
                  variant="h3"
                  className=" text-2xl md:text-3xl font-bold text-white uppercase  font-lemonMilk  text-center"
                >
                  {item.city}
                </Typography>
                <Typography
                  variant="h4"
                  className="font-normal text-white -mt-2 text-center"
                >
                  {item.country}
                </Typography>
              </div>
              <div className=" absolute  bottom-2 left-8 w-full h-full flex flex-col  justify-end items-start pb-5 ">
                <Typography variant="p" className=" font-semibold text-white  ">
                  {item.price}
                </Typography>
                <Typography variant="p" className=" font-semibold text-white  ">
                  {item.guestType}
                </Typography>
              </div>
            </div>
            <div className="flex flex-col gap-1 mt-1 px-2">
              <Typography variant="h6" className="font-semibold">
                {item.event}
              </Typography>
              <Typography variant="p" className="font-medium">
                {item.dateRange}
              </Typography>
            </div>
            <BgIcon
              iconName="solar:heart-outline"
              iconClass="text-white"
              className="bg-primary absolute top-4 right-8"
            />
          </div>
        ))}
      </div>
    </Pannel>
  );
});
