// components/Contributors/ContributorsSlider.jsx
import React from "react";

// import your brands
import logo1 from "../../../assets/brands/amazon.png";
import logo2 from "../../../assets/brands/amazon_vector.png";
import logo3 from "../../../assets/brands/casio.png";
import logo4 from "../../../assets/brands/moonstar.png";
import logo5 from "../../../assets/brands/randstad.png";
import logo6 from "../../../assets/brands/start-people 1.png";
import logo7 from "../../../assets/brands/start.png";
import Marquee from "react-fast-marquee";

const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

const ContributorsSlider = () => {
  return (
    <div data-aos="fade-up" className=" my-10">
      <h2 className="text-2xl py-4 font-bold text-center mb-6">
        We've helped thousands of sales teams
      </h2>
      <Marquee
        direction="right"
        speed={40}
        gradient={false}
        pauseOnHover={true}
      >
        {logos.map((logo, index) => (
          <div key={index} className="mx-24">
            <img
              src={logo}
              alt={`contributor-${index}`}
              className="h-6 object-contain"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default ContributorsSlider;
