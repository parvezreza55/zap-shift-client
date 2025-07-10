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
  const { data: parcels = {} } = useQuery({
    queryKey: ["parcels", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${id}`);
      return res.data;
    },
  });
  console.log(parcels);
  const amount = parcels.cost;

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
