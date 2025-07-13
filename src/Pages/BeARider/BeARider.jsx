import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

// Example service center data
const serviceCenters = [
  { region: "Dhaka", district: "Mirpur" },
  { region: "Dhaka", district: "Banani" },
  { region: "Chattogram", district: "Pahartali" },
  { region: "Chattogram", district: "Agrabad" },
];

// Unique regions
const uniqueRegions = [...new Set(serviceCenters.map((w) => w.region))];
const getDistrictsByRegion = (region) =>
  serviceCenters.filter((w) => w.region === region).map((w) => w.district);

const BeARider = () => {
  const { user } = useAuth();
  const { register, handleSubmit, watch } = useForm();

  const axiosSecure = useAxiosSecure();
  const selectedRegion = watch("region");
  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.post("/riders", data);
      console.log(res.data);

      if (res.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Rider info submitted successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to submit rider info.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-3xl font-bold mb-2">Be a Rider</h2>
      <p className="mb-6 text-gray-600">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Your Name"
            defaultValue={user?.displayName || ""}
            {...register("name", { required: true })}
            className="w-full p-2 border rounded"
          />

          <input
            type="number"
            placeholder="Your Age"
            {...register("age", { required: true })}
            className="w-full p-2 border rounded"
          />

          <input
            type="email"
            placeholder="Your Email"
            defaultValue={user?.email || ""}
            {...register("email", { required: true })}
            className="w-full p-2 border rounded"
          />

          <input
            type="text"
            placeholder="Contact"
            {...register("contact", { required: true })}
            className="w-full p-2 border rounded"
          />

          <input
            type="text"
            placeholder="NID No"
            {...register("nid", { required: true })}
            className="w-full p-2 border rounded"
          />

          <select
            {...register("region", { required: true })}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Your Region</option>
            {uniqueRegions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>

          <select
            {...register("district", { required: true })}
            disabled={!selectedRegion}
            className="w-full p-2 border rounded"
          >
            <option value="">Which wire-house you want to work?</option>
            {getDistrictsByRegion(selectedRegion).map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BeARider;
