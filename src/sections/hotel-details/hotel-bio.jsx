"use client";

import React, { useEffect, useState } from "react";
import { Button, Iconify, Typography, Card, AnchorTag } from "@/src/components";
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
  console.log("booking", data);

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
        const request = await axiosInstance.post(
          endpoints.booking.book_event,
          data
        );
        if (request?.status === 201) {
          localStorage.removeItem("orderData");
          enqueueSnackbar("Your booking request has been sent successfully", {
            variant: "success",
          });
          router.push(`/guest-dashboard`);
        }
      } else {
        enqueueSnackbar("Only guest users can book this event", {
          variant: "warning",
        });
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.message, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const updateReservation = async () => {
    try {
      let bookingId = JSON.parse(localStorage.getItem("bookingId"));
      const request = await axiosInstance.put(
        endpoints.booking.update_booking_paid_status(bookingId)
      );
      if (request?.status === 200) {
        enqueueSnackbar("Payment successfull", { variant: "success" });
        router.push("/guest-dashboard");
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.message, { variant: "error" });
    }
  };

  const handleEventReserve = async () => {
    try {
      if (user?.user_type === "GUEST") {
        localStorage.setItem("bookingId", JSON.stringify(data?.id));
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
    if (redirect_status == "succeeded" && payment_intent) {
      (async () => {
        updateReservation();
      })();
    }
  }, [payment_intent, redirect_status]);

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
          <div className="">
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
            <Typography variant="p" className=" font-medium text-gray-500">
              ${event?.price} Per / Night
            </Typography>
            <Typography variant="p" className="font-semibold text-start my-3  ">
              {event?.title}
            </Typography>
            <Typography variant="h6" className="font-semibold   mt-2">
              {event_type === "NOMAD"
                ? event?.accomodation_type === "bnb"
                  ? `${event?.city} ${event?.country}`
                  : `${event?.hotel?.city}, ${event?.hotel?.country}`
                : `${event?.hotel?.city}, ${event?.hotel?.country}`}
            </Typography>
          </div>

          {/* Dates and Guests */}
          <div className=" flex justify-between bg-neutral-100 w-full rounded-full px-5 ju py-2 shadow-sm  items-center mt-2 divide-x divide-neutral-200 ">
            <div className="flex flex-col justify-center  items-center sm:items-start  ">
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

            <div className=" h-full w-[2px] bg-gray-400"></div>
            <div className="flex flex-col justify-center  items-center sm:items-start ">
              <Typography
                variant="p"
                className="!text-xs sm:text-sm font-medium"
              >
                Check-out
              </Typography>
              <Typography variant="p" className="!text-xs sm:text-sm">
                {event?.end_date?.toString().slice(0, 10)}
              </Typography>
            </div>
            <div className=" h-full w-[2px] bg-gray-400"></div>
            <div className="flex justify-between  ">
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
                disabled={data}
                className="!outline-none !border-none !text-[16px]  w-10"
                placeholder="5"
                onChange={(e) => handleCalculation(e.target.value)}
                value={data ? data?.no_of_guests : guestCount}
              />
            </div>
            <Typography
              variant="p"
              className="text-secondary text-sm text-center"
            >
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
                  </Typography>
                </span>
              </div>
              <span className="flex justify-between items-center mt-2 mb-3">
                <Typography variant="h6" className="font-semibold">
                  Total
                </Typography>
                <Typography variant="h6" className="font-semibold">
                  $
                  {data
                    ? data?.total_price
                    : (
                        event?.price * stayNights * guestCount +
                        ((event?.price * stayNights * guestCount) / 100) * 20
                      ).toFixed(2)}
                </Typography>
              </span>
              {user?.user_type !== "GUEST" ? (
                <div className="flex bg-gray-100   p-2 rounded-md justify-between items-center mt-2 mb-3">
                  <Typography
                    variant="p"
                    className="font-medium text-sm text-center text-gray-500"
                  >
                    You should be sign in as a guest for reservation
                  </Typography>
                </div>
              ) : data?.booking_status === "PENDING" ? (
                <Button className="w-full mt-2">Request Pending</Button>
              ) : data?.booking_status === "ACCEPTED" ? (
                <Button
                  loading={loading}
                  className="w-full mt-2"
                  onClick={handleEventReserve}
                >
                  Pay now
                </Button>
              ) : data?.booking_status === "REJECTED" ? (
                <Button className="w-full mt-2">Request Rejected</Button>
              ) : data?.booking_status === "PAID" ? (
                <Button className="w-full mt-2">Event booked</Button>
              ) : (
                <Button
                  loading={loading}
                  className="w-full mt-2"
                  onClick={createReservation}
                >
                  Reserve
                </Button>
              )}
            </div>
          </div>
        </Card>
        <AnchorTag href={"#"}>
          <span className="flex justify-center items-center gap-3 w-full mt-4 md:mt-2">
            <Iconify iconName="mynaui:flag-solid" className="text-black" />
            <Typography variant="p" className=" font-medium">
              Report This Listing
            </Typography>
          </span>
        </AnchorTag>
      </div>
    </div>
  );
};
