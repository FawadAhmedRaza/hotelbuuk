"use client";

import React, { useEffect, useState } from "react";
import { Button, Iconify, Typography, Card } from "@/src/components";
import Built from "@/src/components/built";
import { useSelector } from "react-redux";
import { calculateDaysBetweenDates } from "@/src/libs/helper";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";
import { useRouter, useSearchParams } from "next/navigation";
import { useSnackbar } from "notistack";
import axiosInstance, { endpoints } from "@/src/utils/axios";
import Modal from "@/src/components/modal";
import { useModal } from "@/src/hooks/use-modal";
import {
  FUNDING,
  PayPalButtons,
  PayPalScriptProvider,
} from "@paypal/react-paypal-js";
import { paypalCaptureOrder } from "@/src/actions/payment.action";
import StripePayment from "../stripe-payment";

const hotelData = {
  time: "10am - 4pm",
  flexible: true,
  image: "/assets/images/hotel-bio.png",
  bio: "Booking A Day Use Room Grants You The Use Of Amenities Of The Property",
  amenities: [
    { id: 1, name: "Indoor pool", icon: "fas fa-swimming-pool" },
    { id: 2, name: "Fitness center", icon: "fas fa-dumbbell" },
    { id: 3, name: "Spa and wellness center", icon: "fas fa-spa" },
    { id: 4, name: "Bar/Lounge", icon: "fas fa-glass-martini-alt" },
    { id: 5, name: "Restaurant", icon: "fas fa-utensils" },
    { id: 6, name: "Free Wi-Fi", icon: "fas fa-wifi" },
    { id: 7, name: "Room service", icon: "fas fa-concierge-bell" },
    { id: 8, name: "Tea/coffee machine", icon: "fas fa-coffee" },
  ],
  pricePerNight: 80,
  tourName: "Business Tour | Manufacturing",
  marketTour: "London Market Tour",
  checkInDate: "10/8/2024",
  checkOutDate: "15/8/2024",
  nights: 5,
  guests: 1,
  priceDetails: [
    { description: "$20 x 4 Nights", amount: 80 },
    { description: "Hotelbuuk Service Fee", amount: 20 },
  ],
  total: 100,
};

export const HotelBio = ({ type, id }) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [guestCount, setGuestCount] = useState(1);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const params = useSearchParams();
  const payment_intent = params.get("payment_intent");
  const redirect_status = params.get("redirect_status");
  let event_type = params.get("type");

  const { event } = useSelector((state) => state.allEvents.getById);
  const { data } = useSelector((state) => state.bookings.userBooking);

  const { user } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const { onFalse, onTrue, value } = useModal();

  const stayNights = calculateDaysBetweenDates(
    event?.start_date,
    event?.end_date
  );

  const handleCalculation = (number) => {
    setGuestCount(number);
  };

  const createReservation = async () => {
    setLoading(true);

    try {
      const data = localStorage.getItem("orderData");
      const request = await axiosInstance.post(
        endpoints.booking.book_event,
        data
      );
      if (request?.status === 201) {
        localStorage.removeItem("orderData");
        enqueueSnackbar("Your booking request has been sent successfully", {
          variant: "success",
        });
        router.push(`http://localhost:3000/hotels/${id}?type=${type}`);
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.message, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleEventReserve = async () => {
    try {
      if (user?.user_type === "GUEST") {
        let data = {
          no_of_guests: guestCount,
          event_type: event_type,
          total_price:
            event?.price * stayNights * guestCount +
            ((event?.price * stayNights * guestCount) / 100) * 20,
          guest_id: user?.guest?.[0].id,
          user_id: event?.user_id,
        };
        if (event_type === "NOMAD") {
          data.nomad_event_id = event?.id;
        } else {
          data.hotel_event_id = event?.id;
        }
        localStorage.setItem("orderData", JSON.stringify(data));
        onTrue();
      } else {
        enqueueSnackbar("Only guest users can book this event", {
          variant: "warning",
        });
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.message, { variant: "error" });
    } 
  };

  const paypalButtons = (
    <div className="my-10">
      <PayPalScriptProvider
        options={{
          "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
          currency: "USD",
          intent: "capture",
          components: "buttons",
          environment: "production",
        }}
      >
        <PayPalButtons
          style={{
            color: "gold",
            shape: "rect",
            label: "pay",
            height: 50,
            minWidht: 200,
            maxWidth: 250,
          }}
          fundingSource={FUNDING.PAYPAL}
          onCancel={async () => {
            setValue("paymentMethod", "card");
            setStep(1);
          }}
          createOrder={async (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: (
                      event?.price * stayNights * guestCount +
                      ((event?.price * stayNights * guestCount) / 100) * 20
                    ).toFixed(2),
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            console.log("Data in approve", data);
            let response = await paypalCaptureOrder(data.orderID);
            if (response) {
              await createReservation();
              return true;
            }
          }}
        />
      </PayPalScriptProvider>
    </div>
  );

  // Create An order after stripe payment succeeded
  useEffect(() => {
    if (redirect_status == "succeeded" && payment_intent && !loading) {
      const orderData = localStorage.getItem("orderData");
      if (orderData) {
        (async () => {
          createReservation();
        })();
      }
    }
  }, [payment_intent, redirect_status]);

  console.log("Event User", data);
  console.log("User", user);

  return (
    <div className="flex flex-col lg:flex-row bg-white  gap-5 mt-10 ">
      <div className="  w-full  lg:w-[70%] ">
        <div className=" flex flex-col mt-5 gap-10 justify-start  items-start w-full  ">
          <div className="">
            <Typography variant="h4" className=" font-semibold text-primary">
              Teaching Tool
            </Typography>
            <div className=" mt-3">
              <Built>{event?.nomad?.video}</Built>
              <Built>{event?.nomad?.sample}</Built>
              <Built>{event?.nomad?.projector}</Built>
            </div>
          </div>
          <div className=" ">
            <Typography variant="h4" className=" font-semibold text-primary">
              Competence
            </Typography>
            <div className=" mt-3">
              <Built>Market Research</Built>
              <Built>Negotiation</Built>
            </div>
          </div>
        </div>
      </div>
      {/* Right Panel - Hotel Details and Booking Information */}
      <Modal
        title="Payment Method"
        disableActions={true}
        isOpen={value}
        onClose={onFalse}
      >
        <div className="flex gap-5 h-12 ">
          <Card
            onClick={() => setPaymentMethod("card")}
            className={`gap-4 cursor-pointer ${
              paymentMethod === "card" && `border-primary border`
            }`}
          >
            <Iconify iconName="ion:card" className="text-black size-7" />
            Card
          </Card>
          <Card
            onClick={() => setPaymentMethod("paypal")}
            className={`gap-4 cursor-pointer ${
              paymentMethod === "paypal" && `border-primary border`
            }`}
          >
            <Iconify
              iconName="lineicons:paypal"
              className="text-black size-7"
            />
            Paypal
          </Card>
        </div>
        <div className="mt-2">
          {paymentMethod === "card" && (
            <StripePayment
              amount={(
                event?.price * stayNights * guestCount +
                ((event?.price * stayNights * guestCount) / 100) * 20
              ).toFixed(2)}
              type={type}
              id={id}
            />
          )}
          {paymentMethod === "paypal" && paypalButtons}
        </div>
      </Modal>

      <div className="w-full lg:w-[30%]  py-4   flex flex-col justify-between border-neutral-400">
        <Card className="flex  flex-col gap-1 w-full">
          <div className="w-full">
            <Typography variant="h6" className=" font-semibold">
              ${event?.price} Per / Night
            </Typography>
            <Typography variant="h6" className="font-semibold text-start ">
              {event?.title}
            </Typography>
            <Typography variant="h5" className="font-semibold text-center mt-2">
              {hotelData.marketTour}
            </Typography>
          </div>

          {/* Dates and Guests */}
          <div className="grid grid-cols-3 bg-neutral-100 w-full rounded-xl shadow-lg  items-center mt-2 divide-x divide-neutral-400 ">
            <div className="flex flex-col justify-center  items-center sm:items-start  sm:p-5 lg:px-3">
              <Typography
                variant="p"
                className="!text-xs sm:text-sm font-medium"
              >
                Check-In
              </Typography>
              <Typography variant="p" className="!text-xs sm:text-sm">
                {event?.start_date?.toString().slice(0, 10)}
              </Typography>
            </div>
            <div className="flex flex-col justify-center  items-center sm:items-start sm:p-5 lg:px-2">
              <Typography
                variant="p"
                className="!text-xs sm:text-sm font-medium"
              >
                Checkout
              </Typography>
              <Typography variant="p" className="!text-xs sm:text-sm">
                {event?.end_date?.toString().slice(0, 10)}
              </Typography>
            </div>
            <div className="flex justify-between  p-5 lg:px-2">
              <Typography
                variant="p"
                className="!text-xs sm:text-sm font-medium"
              >
                {stayNights} Night
              </Typography>
            </div>
          </div>

          <div className="flex flex-col gap-5 w-full pt-5">
            <div className=" flex gap-2  justify-between border-b w-full pb-2 border-neutral-500 ">
              <Typography
                variant="p"
                className="font-medium grow justify-between"
              >
                Guests
              </Typography>
              <input
                type="number"
                className="!outline-none !border-none !text-[16px]"
                placeholder="5"
                onChange={(e) => handleCalculation(e.target.value)}
                value={guestCount}
              />
            </div>
            <Typography variant="p" className="text-secondary text-center">
              price includes business room & meetings
            </Typography>
            <div className=" flex flex-col gap-2 ">
              <div className=" flex flex-col gap-2 border-b w-full pb-2 border-neutral-500">
                <span className="flex justify-between items-center ">
                  <Typography variant="p" className="font-medium">
                    $ {event?.price} x {stayNights} Nights
                  </Typography>
                  <Typography variant="p" className="font-medium">
                    $ {(event?.price * stayNights * guestCount).toFixed(2)}
                  </Typography>
                </span>
                <span className="flex justify-between items-center ">
                  <Typography variant="p" className="font-medium">
                    HotelBuuk Service Fee
                  </Typography>
                  <Typography variant="p" className="font-medium">
                    $
                    {(
                      ((event?.price * stayNights * guestCount) / 100) *
                      20
                    ).toFixed(2)}
                    {/* {((event?.price * stayNights * guestCount) / 100) * 20} */}
                  </Typography>
                </span>
              </div>
              <span className="flex justify-between items-center mt-2 mb-3">
                <Typography variant="h6" className="font-semibold">
                  Total
                </Typography>
                <Typography variant="h6" className="font-semibold">
                  $
                  {(
                    event?.price * stayNights * guestCount +
                    ((event?.price * stayNights * guestCount) / 100) * 20
                  ).toFixed(2)}
                </Typography>
              </span>
              {user?.user_type !== "GUEST" ? (
                <div className="flex bg-gray-50  p-2 rounded-md justify-between items-center mt-2 mb-3">
                  <Typography variant="h6" className="font-semibold text-center">
                    You should be signin as a guest for reservation
                  </Typography>
                </div>
              ) : data?.id ? (
                <div className="flex bg-gray-50 p-2 rounded-md justify-between items-center mt-2 mb-3">
                  <Typography variant="h6" className="font-semibold text-center">
                    You already part of this event
                  </Typography>
                </div>
              ) : (
                <Button className="w-full mt-2" onClick={handleEventReserve}>
                  Reserve
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Reserve Button */}
        {/* <span className="flex justify-center items-center gap-3 w-full mt-4 md:mt-2">
          <Iconify iconName="mynaui:flag-solid" className="text-black" />
          <Typography variant="p" className=" font-medium">
            Report This Listing
          </Typography>
        </span> */}
      </div>
    </div>
  );
};
