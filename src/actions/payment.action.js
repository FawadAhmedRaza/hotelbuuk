"use server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import checkoutNodeJssdk from "@paypal/checkout-server-sdk";
import paypal from "@paypal/checkout-server-sdk";

const configureEnvironment = function () {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  return process.env.NEXT_PUBLIC_PAYMENT_ENVIROMENT === "PRODUCTION"
    ? new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret)
    : new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
};

export const client = async function () {
  return new checkoutNodeJssdk.core.PayPalHttpClient(configureEnvironment());
};

export async function createOrder(data) {
  const { order_price, user_id } = data;

  if (!order_price || !user_id)
    return {
      success: false,
      message: "Please Provide order_price And User ID",
    };

  try {
    const PaypalClient = await client();

    //This code is lifted from https://github.com/paypal/Checkout-NodeJS-SDK
    const request = new paypal.orders.OrdersCreateRequest();
    request.headers["prefer"] = "return=representation";
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: order_price + "",
          },
        },
      ],
    });

    const response = await PaypalClient.execute(request);
    if (response.statusCode !== 201) {
      return { success: false, message: "Some Error Occured at backend" };
    }
    return { success: true, data: { order } };
  } catch (err) {
    return { success: false, message: "Could Not Found the user" };
  }
}

export async function captureOrder(data) {
  const { orderID } = data || {};

  const PaypalClient = await client();
  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});
  const response = await PaypalClient.execute(request);
  if (!response) {
    return { success: false, message: "Some Error Occured at backend" };
  }
  return { success: true, data: response?.result };
}

export const createClientSecret = async (amount) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Number(amount * 100)
      ?.toFixed(0)
      ?.toString(),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  return paymentIntent.client_secret;
};

const paypalCreateOrder = async () => {
  try {
    let response = await createOrder({
      user_id: store.getState().auth.user._id,
      order_price: amountRef.current.value,
    });
    return response.data.data.order.order_id;
  } catch (err) {
    return null;
  }
};

const paypalCaptureOrder = async (orderID) => {
  try {
    let response = await captureOrder({
      orderID,
    });
    if (response.success) {
      return true;
    }
  } catch (err) {
    console.log("Error", err);
    return false;
  }
};

export { paypalCaptureOrder, paypalCreateOrder };
