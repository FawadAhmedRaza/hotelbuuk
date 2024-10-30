"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";

import { getAllBookings, getGuestBookingsList } from "@/src/redux/bookings/thunk";

import { enqueueSnackbar } from "notistack";

import { Breadcrumb, Pannel } from "@/src/components";
import RoomListSkeleton from "@/src/components/Skeleton/room-list-skeleton";
import GuestBookingList from "./list/guest-booking-list";

const GuestBookingListOverview = () => {
    const { user } = useAuthContext();
    const dispatch = useDispatch();

    const { isLoading } = useSelector((state) => state.bookings.getGuestBookings);

    const fetchAllBookings = async () => {
        try {
            await dispatch(getGuestBookingsList(user?.id)).unwrap();
        } catch (error) {
            console.log(error);
            enqueueSnackbar(error?.message, { variant: "error" });
        }
    };

    useEffect(() => {
        fetchAllBookings();
    }, []);

    return (
        <Pannel className="flex flex-col gap-10">
            {isLoading ? (
                <RoomListSkeleton />
            ) : (
                <>
                    <Breadcrumb title="My Bookings List" />

                    <GuestBookingList />
                </>
            )}
        </Pannel>
    );
};

export default GuestBookingListOverview;
