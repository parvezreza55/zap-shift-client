// components/OurServices/OurServices.jsx
import React from "react";
import {
  FaShippingFast,
  FaMapMarkedAlt,
  FaBoxes,
  FaHandHoldingUsd,
  FaBuilding,
  FaUndo,
} from "react-icons/fa";
import ServicesCard from "./ServicesCard";

const services = [
  {
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    icon: FaShippingFast,
  },
  {
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    icon: FaMapMarkedAlt,
  },
  {
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    icon: FaBoxes,
  },
  {
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    icon: FaHandHoldingUsd,
  },
  {
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which includes warehouse and inventory management support.",
    icon: FaBuilding,
  },
  {
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    icon: FaUndo,
  },
];

const Services = () => {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 bg-[#03373d] rounded-2xl">
      <div className="text-center mb-10 max-w-3xl mx-auto ">
        <h2 className="text-2xl text-white md:text-3xl font-bold mb-4">
          Our Services
        </h2>
        <p className="text-white">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, idx) => (
          <ServicesCard key={idx} service={service} />
        ))}
      </div>
    </section>
  );
};

export default Services;
