import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import ReactShowMoreText from "react-show-more-text";

const PaymentHistroy = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [], isPending } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });
  if (isPending) {
    return ".........loading";
  }
  console.log(payments);

  return (
    <div className="overflow-x-auto mt-10 border rounded-2xl w-11/12 mx-auto">
      <table className="table table-zebra w-full  ">
        <thead className="bg-gray-100">
          <tr>
            <th>#</th>
            <th>Parcel ID</th>
            <th>Amount</th>
            <th>Transaction ID</th>
            <th>Email</th>
            <th>Method</th>
            <th>Paid At</th>
          </tr>
        </thead>
        <tbody>
          {payments.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-4 text-gray-500">
                No payment history found.
              </td>
            </tr>
          ) : (
            payments.map((payment, index) => (
              <tr key={payment.parcelId}>
                <td>{index + 1}</td>
                <td>{payment.parcelId}</td>
                <td>${payment.amount}</td>
                <td className="text-xs break-all">
                  <span title={payment.transactionId}>
                    {payment.transactionId}
                  </span>
                </td>
                <td>{payment.email}</td>
                <td>{payment.paymentMethod}</td>
                <td>{new Date(payment.paid_At).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistroy;
