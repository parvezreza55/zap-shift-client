import React from "react";
import { FaQuoteRight } from "react-icons/fa";

const TestimonialCard = ({ testimonial }) => {
  const { description, title, role, message, avatar } = testimonial;
  return (
    <div
      data-aos="zoom-in-up"
      className="z-50 bg-white md:p-4 rounded-xl shadow-xl text-left"
    >
      <FaQuoteRight className="text-2xl text-cyan-500 mb-4" />
      <p>{title}</p>
      <p className="text-gray-700 mb-6">{message}</p>
      <div className="border-2 opacity-60 border-dotted"></div>
      <div className="flex justify-center items-center gap-4 mt-2">
        <div className="w-14 h-14 rounded-full border-2 flex justify-center items-center object-cover">
          {avatar}
        </div>
        <div>
          <h4 className="font-bold text-gray-800">{description}</h4>
          <p className="text-gray-500 text-sm">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
