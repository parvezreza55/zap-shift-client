import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MyParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["my-parcels", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });
  console.log(parcels);
  const onView = (parcel) => {
    Swal.fire({
      title: "Parcel Details",
      html: `
      <b>Tracking ID:</b> ${parcel.tracking_id}<br/>
      <b>Type:</b> ${parcel.type}<br/>
      <b>Sender:</b> ${parcel.sender_name}<br/>
      <b>Receiver:</b> ${parcel.receiver_name}<br/>
      <b>Cost:</b> ${parcel.cost} ৳<br/>
      <b>Status:</b> ${parcel.delivery_status}
    `,
      icon: "info",
    });
  };

  const onPay = (parcel) => {
    // Swal.fire({
    //   title: "Confirm Payment?",
    //   text: `Pay ৳${parcel.cost} for this parcel?`,
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonText: "Yes, Pay",
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     navigate(`dashboard/payment/${parcel._id}`);
    //     // TODO: Make API call to mark paid
    //     Swal.fire("Paid!", "Payment successful.", "success");
    //   }
    // });
    console.log(parcel._id);
    navigate(`/dashboard/payment/${parcel._id}`);
  };

  const onDelete = async (id) => {
    console.log(id);
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This parcel will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    if (confirm.isConfirmed) {
      try {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire("Deleted!", "Parcel has been removed.", "success");
          }
          refetch();
        });
      } catch (error) {
        Swal.fire("Error!", "Failed to delete parcel.", "error");
        console.error("Delete error:", error);
      }
    }
  };
  return (
    <div className="overflow-x-auto">
      {parcels?.length > 0 && (
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Cost (৳)</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                {console.log("payment stat", parcel.payment_status)}
                <td>{index + 1}</td>
                <td>
                  <span
                    className={`badge ${
                      parcel.type === "document"
                        ? "badge-primary"
                        : "badge-secondary"
                    }`}
                  >
                    {parcel.type}
                  </span>
                </td>
                <td>{parcel.cost} ৳</td>
                <td>
                  <span
                    className={`badge ${
                      parcel.payment_status === "paid"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {parcel.payment_status}
                  </span>
                </td>
                <td className="space-x-2">
                  <button
                    onClick={() => onView(parcel)}
                    className="btn btn-sm btn-info text-white"
                  >
                    View
                  </button>

                  <button
                    onClick={() => onPay(parcel)}
                    disabled={parcel.payment_status !== "unpaid"}
                    className={`px-4 py-[6px] rounded-sm ${
                      parcel.payment_status !== "unpaid"
                        ? "bg-gray-100 cursor-not-allowed"
                        : "bg-warning cursor-pointer"
                    }`}
                  >
                    Pay
                  </button>
                  <button
                    onClick={() => onDelete(parcel._id)}
                    className="btn btn-sm btn-error text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {parcels?.length === 0 && (
        <div className="text-center py-10">
          <h2 className="text-xl font-semibold text-gray-500">
            📭 No parcels found.
          </h2>
          <p className="text-gray-400">You haven’t created any parcels yet.</p>
        </div>
      )}
    </div>
  );
};

export default MyParcel;
