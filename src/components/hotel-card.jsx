"use client";

import React, { useEffect, useState } from "react";
import { AnchorTag } from "./anchor-tag";
import { BgIcon } from "./bg-icon";
import { Typography } from "./typography";
import { cn } from "@/lib/utils";
import { paths } from "../contants";
import ImageRender from "./ImageRenderer";
import { useDispatch, useSelector } from "react-redux";
import { useAuthContext } from "../providers/auth/context/auth-context";
import { useRouter } from "next/navigation";
import {
  createWishList,
  deleteWishList,
  getWishById,
} from "../redux/wishlist/thunk";
import { enqueueSnackbar } from "notistack";

export const HotelCard = React.memo(({ event, className }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useAuthContext();
  const [eventId, setEventId] = useState("");

  const { isLoading, wish } = useSelector((state) => state.wishList.getById);

  // Function to handle adding or deleting the event from wishlist
  const handleHeartIconClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      router.push(paths.auth.login);
      return;
    }

    if (eventId) {
      // If the event is already in the wishlist, delete it
      try {
        await dispatch(
          deleteWishList({ userId: user?.id, eventId: event?.id })
        ).unwrap();
        setEventId(""); // Clear the event ID after deletion
        enqueueSnackbar(`${event?.title} is removed from wishlist.`, {
          variant: "success",
        });
      } catch (error) {
        console.log(error);
        enqueueSnackbar(error?.message, { variant: "error" });
      }
    } else {
      // Otherwise, add it to the wishlist
      const data = {
        user_id: user?.id,
        event,
      };
      try {
        await dispatch(createWishList(data)).unwrap();
        setEventId(event?.id); // Set the event ID to mark it as added
        enqueueSnackbar(`${event?.title} is added to wishlist.`, {
          variant: "success",
        });
      } catch (error) {
        console.log(error);
        enqueueSnackbar(error?.message, { variant: "error" });
      }
    }
  };

  // Fetch the wishlist item when the component mounts or user/event changes
  useEffect(() => {
    async function fetchWish() {
      try {
        await dispatch(
          getWishById({ userId: user?.id, eventId: event?.id })
        ).unwrap();
      } catch (error) {
        console.log(error);
      }
    }

    if (user && event) {
      fetchWish();
    }
  }, [user, event, dispatch]);

  // Update eventId if the event is found in the wishlist
  useEffect(() => {
    const wishedEvent = wish?.nomad_event_id
      ? wish?.nomad_event_id
      : wish?.hotel_event_id;
    if (wishedEvent === event?.id) {
      setEventId(wishedEvent);
    }
  }, [wish, event?.id]);

  return (
    <AnchorTag
      href={paths.hotels.getHotelById(event?.id, event?.type)}
      className={cn("relative w-full !text-black", className)}
    >
      <div className="w-full h-full relative">
        <div className="h-80 relative overflow-hidden rounded-3xl shadow-[0px_4px_10px_2px_rgba(0,_0,_0,_0.3)]">
          <div className="absolute rounded-3xl w-full h-full inset-0 bg-black opacity-45 " />
          <ImageRender
            src={event?.event_images?.[0]?.img || event?.hotel?.hotel_image}
            type={"server"}
            alt={`Uploaded Image`}
            ratio="4/3"
            delayTime={300}
            threshold={200}
            effect="opacity"
            wrapperProps={{ style: { transitionDelay: "0.5s" } }}
            className="h-full w-full object-cover rounded-3xl !event-card-shadow"
          />
        </div>

        <div className="absolute top-0 w-full h-full flex flex-col gap-1.5 justify-center hotels-center">
          <Typography
            variant="h3"
            className="!text-2xl md:!text-[25px] !font-medium text-white uppercase text-center font-lemonMilk"
          >
            {event?.title?.length > 30
              ? `${event?.title.slice(0, 40)}...`
              : event?.title}
          </Typography>
          <Typography
            variant="h3"
            className="!text-[18px] font-normal text-white uppercase font-lemonMilk text-center"
          >
            {event?.city || event?.hotel?.city}
          </Typography>
          <Typography
            variant="h4"
            className="font-normal !text-[15px] text-white -mt-5 text-center"
          >
            {event?.country || event?.hotel?.country}
          </Typography>
        </div>

        <div className="absolute bottom-2 left-5 w-full h-full flex flex-col justify-end hotels-start pb-3">
          <Typography
            variant="p"
            className="!text-base font-medium text-white font-dmSans"
          >
            ${event?.price} / Night
          </Typography>
          <Typography
            variant="p"
            className="!text-base font-medium text-white font-dmSans"
          >
            Per Guest
          </Typography>
        </div>
      </div>

      <div className="flex flex-col mt-1 px-2 !font-dmSans">
        <Typography variant="h6" className="font-bold">
          {event?.title}
        </Typography>
        <Typography variant="p" className="font-normal">
          {event?.type === "NOMAD"
            ? event?.accomodation_type === "bnb"
              ? `${event?.city} ${event?.country}`
              : `${event?.hotel?.city} ${event?.hotel?.country}`
            : `${event?.hotel?.city} ${event?.hotel?.country}`}
        </Typography>
        <Typography
          variant="p"
          className="!text-sm font-medium text-neutral-400 mt-1"
        >
          {`${event?.start_date?.toString().slice(4, 10)} - ${event?.end_date
            ?.toString()
            .slice(4, 10)}`}
        </Typography>
      </div>

      <BgIcon
        iconName={eventId ? "solar:heart-bold" : "solar:heart-outline"}
        iconClass={`!text-white ${eventId ? "!text-red-700" : ""} `}
        className={`bg-primary absolute top-4 right-6 ${
          eventId ? "bg-white" : ""
        }`}
        onClick={handleHeartIconClick}
      />
    </AnchorTag>
  );
});
