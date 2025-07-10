import React from "react";

const HighlightCard = ({ item }) => {
  const { image, title, description } = item;
  return (
    <div
      data-aos="fade-down"
      data-aos-easing="ease-in-out"
      className="flex flex-col md:flex-row gap-4 bg-base-100 space-y-3 py-7 px-8 shadow-2xl rounded-2xl"
    >
      {/* Left Side: Image and Dotted Line */}
      <div className="flex flex-col md:flex-row gap-10 items-center">
        <img src={image} alt={title} className="w-40 object-contain" />
        <div className="w-24 border-t-2 md:w-0 md:h-32 md:border-l-2 border-dotted border-gray-400 mt-1"></div>
      </div>

      {/* Right Side: Title & Description */}
      <div className="flex-1 flex flex-col justify-center ">
        <div>
          <h3 className="text-2xl font-extrabold mb-1">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};
export default HighlightCard;
