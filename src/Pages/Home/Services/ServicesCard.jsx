// components/OurServices/ServiceCard.jsx
import React from "react";

const ServicesCard = ({ service }) => {
  const { icon: Icon, title, description } = service;
  return (
    <div
      data-aos="fade-down"
      className="card bg-base-100 shadow-md hover:shadow-lg hover:bg-[#caeb66] p-6 text-center transition-all duration-300"
    >
      <div className="text-4xl text-primary mb-4 mx-auto">
        <Icon />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default ServicesCard;
