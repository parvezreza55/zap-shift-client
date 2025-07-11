import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const PaymentForm = () => {
  const stripe = useStripe();
  const navigate = useNavigate(); //
  const elements = useElements();
  const [errors, setError] = useState("");
  const { id } = useParams();
  console.log(id);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: parcels = {},
    isLoading,
    refetch,
  } = useQuery({
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
            name: user.displayName,
            email: user.email,
          },
        },
      });
      const paymentData = {
        parcelId: id,
        amount,
        transactionId: result.paymentIntent.id,
        email: user.email,
        paymentMethod: result.paymentIntent.payment_method_types,
      };
      axiosSecure.post("/payments", paymentData).then((res) => {
        console.log(res.data);
        refetch();
      });

      if (result.error) {
        setError(result.error.message);
      } else if (
        result.paymentIntent &&
        result.paymentIntent.status === "succeeded"
      ) {
        setError("");
        console.log("Payment succeeded:", result);
        Swal.fire({
          icon: "success",
          title: "Payment Successful!",
          html: `<strong>TransactionId: ${result.paymentIntent.id}</strong>`,
          text: "Your parcel has been marked as paid.",
        }).then(() => {
          navigate("/dashboard/myparcel"); // replace with your route
        });
      } else {
        console.log("Unexpected result:", result);
      }
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
