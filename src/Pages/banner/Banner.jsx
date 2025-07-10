import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from "../../assets/banner/banner1.png";
import bannerImg2 from "../../assets/banner/banner2.png";
import bannerImg3 from "../../assets/banner/banner3.png";
const Banner = () => {
  return (
    <Carousel showThumbs={false} autoPlay={true} infiniteLoop={true}>
      <div>
        <img className="h-[30em]" src={bannerImg1} />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img className="h-[30em]" src={bannerImg2} />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img className="h-[30em]" src={bannerImg3} />
        <p className="legend">Legend 1</p>
      </div>
    </Carousel>
  );
};

export default Banner;
