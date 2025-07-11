import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errors, setError] = useState("");
  const { id } = useParams();
  console.log(id);
  const axiosSecure = useAxiosSecure();
  const { data: parcels = {}, isLoading } = useQuery({
    queryKey: ["parcels", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${id}`);
      return res.data;
    },
  });
  if (isLoading) {
    return ".........loading";
  }
  // console.log(parcels);
  const amount = parcels.cost;
  const amountIncent = amount * 100;
  console.log(amountIncent);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }
    // create payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setError(error.message);
      console.log("error message", error);
    } else {
      setError("");
      console.log("pament method", paymentMethod);
    }
    // step-2 : create payment intent
    const res = await axiosSecure.post("/create-payment-intent", {
      amountIncent,
      id,
    });
    console.log("intent", res);
    const clientSecret = res.data.clientSecret;
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: "Jenny Rosen",
        },
      },
    });
    if (result.error) {
      console.log("Payment failed:", result.error.message);
    } else if (
      result.paymentIntent &&
      result.paymentIntent.status === "succeeded"
    ) {
      console.log("Payment succeeded:", result);
    } else {
      console.log("Unexpected result:", result);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 shadow-xl w-md mx-auto mt-20"
    >
      <CardElement className="p-2 border rounded"></CardElement>
      {errors && <p className="text-sm text-red-600 mt-2">{errors} hi</p>}
      <button
        type="submit"
        className="btn btn-primary text-black w-full"
        disabled={!stripe}
      >
        Pay $ {amount}
      </button>
    </form>
  );
};

export default PaymentForm;
