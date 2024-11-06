"use client";

import React, { useEffect, useState } from "react";
import { Button, Pannel, ProfileAvatar, Typography } from "../components";
import { cn } from "@/lib/utils";
import { enqueueSnackbar } from "notistack";
import axiosInstance from "../utils/axios";
import { calculateDaysBetweenDates } from "../libs/helper";
import { Swiper, SwiperSlide } from "swiper/react";
import "@/src/app/globals.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { EffectCoverflow, Navigation } from "swiper/modules";
import { useAuthContext } from "../providers/auth/context/auth-context";
import { paths } from "../contants";
import { useRouter } from "next/navigation";

export const BusinessFactsSwiper = React.memo(({ className }) => {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [businessFacts, setBusinessFacts] = useState([]);

  const router = useRouter();

  const fetchBusinessFacts = async () => {
    try {
      setIsLoading(true);
      const request = await axiosInstance.get("/business-facts");
      setBusinessFacts(request?.data?.list);
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.message, { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinessFacts();
  }, []);

  console.log("all business facts", businessFacts);

  const handleAsk = (item) => {
    if (user) {
      router.push(paths?.chats?.chatsById(item?.user?.id));
    } else {
      router.push(paths?.auth?.login);
    }
  };

  return (
    <Pannel
      className={cn("w-full   px-0 sm:px-3 lg:px-9 xl:px-5 !py-0  ", className)}
    >
      <div className="flex flex-col gap-2 px-3 ">
        <Typography
          variant="h2"
          className="font-semibold text-start !text-black"
        >
          Business Facts
        </Typography>
        <Typography
          variant="h6"
          className="font-normal text-start text-neutral-400"
        >
          Our journey in numbers and highlights.
        </Typography>
      </div>

      <div className="w-full   mt-10">
        <Swiper
          modules={[EffectCoverflow, Navigation]}
          initialSlide={1}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          spaceBetween={100}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: true,
          }}
          loop={true}
          navigation
          style={{
            width: "100%",
            overflow: "hidden",
          }}
          className="!py-5 -mt-8  "
        >
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <SwiperSlide
                  key={`skeleton-${index}`}
                  className="max-w-[700px]"
                >
                  <div className="p-4 border rounded-lg shadow-md bg-white animate-pulse">
                    <div className="flex">
                      <div className="h-24 w-24 bg-gray-200 rounded-md"></div>
                      <div className="flex-1 ml-4">
                        <div className="h-6 w-3/4 bg-gray-200 rounded-md mb-2"></div>
                        <div className="h-4 w-full bg-gray-200 rounded-md mb-1"></div>
                        <div className="h-4 w-5/6 bg-gray-200 rounded-md"></div>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2 mb-3">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div
                          key={i}
                          className="h-4 w-3/4 bg-gray-200 rounded-md"
                        ></div>
                      ))}
                    </div>
                    <div className="h-5 w-1/3 bg-gray-200 rounded-md mb-4"></div>
                    <div className="flex justify-end">
                      <div className="h-10 w-24 bg-gray-200 rounded-md"></div>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            : businessFacts.map((item) => (
                <SwiperSlide key={item.id} className="max-w-[700px]">
                  <div className="flex flex-col gap-4 p-5 rounded-2xl drop-shadow-xl bg-white border">
                    <div className="flex flex-col md:flex-row gap-3 md:gap-5 items-start">
                      <div className="w-full h-full md:w-[30%] md:h-36">
                        <ProfileAvatar
                          src={item?.cover_img}
                          type="server"
                          effect="blur"
                          alt={item?.title}
                          className="w-full md:w-52 h-full rounded"
                        />
                      </div>
                      <div className="flex w-full md:w-[70%] flex-col gap-1">
                        <Typography variant="h4" className="font-semibold">
                          {item?.title}
                        </Typography>
                        <Typography
                          variant="p"
                          className="font-medium text-sm text-wrap break-words !text-gray-600"
                        >
                          {item?.description}
                        </Typography>
                      </div>
                    </div>
                    <ul className="list-disc list-inside flex flex-col">
                      {item?.business_facts_amenities?.map((point, index) => (
                        <li key={index} className="text-sm">
                          {point?.name}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <Typography
                        variant="p"
                        className="font-medium text-start"
                      >
                        ${item?.price} for{" "}
                        {calculateDaysBetweenDates(
                          item?.start_date,
                          item?.end_date
                        )}{" "}
                        days per guest
                      </Typography>
                      <Button
                        onClick={() => handleAsk(item)}
                        className="py-1.5 px-4 mx-auto min-450:mx-0"
                      >
                        Ask {item?.user?.nomad[0].first_name}
                      </Button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </Pannel>
  );
});
