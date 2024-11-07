"use client";

import { Pannel, Typography } from "@/src/components";
import { EventWishCard } from "@/src/components/event-wish-card";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";
import { getWishList, deleteWishList } from "@/src/redux/wishlist/thunk";
import { Layout } from "@/src/sections";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";
import HotelCardSkeleton from "@/src/components/Skeleton/hotel-card-skeleton";

const WishlistScreen = () => {
  const [events, setEvents] = useState([]);
  const { user } = useAuthContext();
  const dispatch = useDispatch();
  const [isWishLoading, setIsWishLoading] = useState(true);
  const { isLoading, wishList, error } = useSelector((state) => state.wishList);

  useEffect(() => {
    setIsWishLoading(true);
    async function fetchWish() {
      if (!user?.id) return; // Ensure user ID is available
      try {
        await dispatch(getWishList(user.id)).unwrap();
        setIsWishLoading(false);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setIsWishLoading(false);
      }
    }

    fetchWish();
  }, [user, dispatch]);

  useEffect(() => {
    // Ensure that wishList is not null or undefined before mapping
    if (wishList && Array.isArray(wishList)) {
      // Filter and map nomad events
      const nomadEvents = wishList
        .filter((wish) => wish.nomad_event) // Only include items with nomad_event
        .map((wish) => ({
          ...wish.nomad_event,
          type: "NOMAD",
        }));

      // Filter and map hotel events
      const hotelEvents = wishList
        .filter((wish) => wish.hotel_event) // Only include items with hotel_event
        .map((wish) => ({
          ...wish.hotel_event,
          type: "HOTEL",
        }));

      // Combine both event types into one array
      const allWishEvents = [...nomadEvents, ...hotelEvents];
      setEvents(allWishEvents);
    }
  }, [wishList]);

  // Function to handle removing an event from the wishlist
  const handleRemoveEvent = async (event) => {
    if (!user) return; // Ensure user is logged in

    try {
      // Dispatch deleteWishList action to remove event from the wishlist
      await dispatch(
        deleteWishList({ userId: user?.id, eventId: event?.id })
      ).unwrap();

      // Update the local state to remove the event from the list
      setEvents((prevEvents) => prevEvents.filter((e) => e.id !== event.id));

      // Show a success message
      enqueueSnackbar(`${event?.title} is removed from wishlist.`, {
        variant: "success",
      });
    } catch (error) {
      console.error("Error removing event from wishlist:", error);
      enqueueSnackbar("Failed to remove event from wishlist.", {
        variant: "error",
      });
    }
  };

  return (
    <div>
      <Layout>
        <Pannel className="flex flex-col gap-10 h-full">
          <div className="flex justify-start flex-col mt-5">
            <Typography
              variant="h2"
              className="font-semibold text-start !text-black"
            >
              Wishlist
            </Typography>
            <Typography
              variant="h6"
              className="font-normal text-start mt-2 text-neutral-400"
            >
              Find Business Hotels with Local Market Insights.
            </Typography>
          </div>
          {isWishLoading ? (
            // Loading Skeleton
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {[...Array(4)].map((_, index) => (
                <HotelCardSkeleton key={index} />
              ))}
            </div>
          ) : events.length === 0 ? (
            // No items found
            <NoItemsFound />
          ) : (
            // Render Event Cards
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {events.map((event) => (
                <EventWishCard
                  key={event.id}
                  event={event}
                  onRemove={() => handleRemoveEvent(event)}
                />
              ))}
            </div>
          )}
        </Pannel>
      </Layout>
    </div>
  );
};

export default WishlistScreen;

// NoItemsFound Component
const NoItemsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Typography variant="h4" className="text-center text-gray-500">
        Your wishlist is currently empty.
      </Typography>
      <Typography variant="body1" className="text-center mt-2 text-neutral-400">
        You haven't added any events to your wishlist yet. Explore and add some!
      </Typography>
    </div>
  );
};
