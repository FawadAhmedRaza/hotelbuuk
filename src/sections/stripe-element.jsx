import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";
import { Button } from "../components";
import { useSnackbar } from "notistack";

const StripeElement = ({id,type}) => {
  const { enqueueSnackbar } = useSnackbar();
  // Stripes
  const stripe = useStripe();
  const elements = useElements();
  const stripePayment = async () => {
    if (!stripe || !elements) {
      return;
    }
    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.HOST_URL}/hotels/${id}?type=${type}`,
          payment_method_data: {
            billing_details: {
              address: {
                country: "US",
              },
            },
          },
        },
      });
      if (error) {
        console.log("error", error);
        enqueueSnackbar(error.message, { variant: "error" });
      } else {
      }
    } catch (err) {
      console.log("error",err);
      enqueueSnackbar("Opps! something went wrong", { variant: "error" });
    }
  };
  return (
    <>
      <PaymentElement
        options={{
          fields: {
            billingDetails: {
              address: {
                country: "never",
              },
            },
          },
        }}
      />
      <Button onClick={stripePayment} className="mt-5">
        Pay Now
      </Button>
    </>
  );
};

export default StripeElement;
