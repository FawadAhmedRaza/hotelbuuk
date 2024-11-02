"use client";
import React, { useEffect, useState } from "react";
import { createClientSecret } from "../actions/payment.action";
import { Typography } from "../components";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeElement from "./stripe-element";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const StripePayment = ({ amount, id, type }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [secretLoading, setSecretLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setSecretLoading(true);
      try {
        const clientSecret = await createClientSecret(amount);
        setClientSecret(clientSecret);
      } catch (err) {
        console.log("error", err);
      } finally {
        setSecretLoading(false);
      }
    })();
  }, [amount]);

  const options = {
    clientSecret,
  };

  return (
    <div className="mt-10 ">
      {secretLoading ? (
        <Typography variant="p">Loading...</Typography>
      ) : (
        <Elements stripe={stripePromise} options={options}>
          <StripeElement id={id} type={type} />
        </Elements>
      )}
    </div>
  );
};

export default StripePayment;
