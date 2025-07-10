import React from "react";
import HighlightCard from "./HighlightCard";

import trackImg from "../../../assets/images/img1.png";
import deliveryImg from "../../../assets/images/img2.png";
import supportImg from "../../../assets/images/img2.png";

const data = [
  {
    id: 1,
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    image: trackImg,
  },
  {
    id: 2,
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    image: deliveryImg,
  },
  {
    id: 3,
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    image: supportImg,
  },
];

const HighlightsList = () => {
  return (
    <div className="space-y-5 px-4 py-10 w-11/12 mx-auto mt-12">
      {data.map((item) => (
        <HighlightCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default HighlightsList;
