import React from "react";
import Banner from "../../banner/Banner";
import Services from "../Services/Services";
import ContributorsSlider from "../Contributors/ContributorsSlider";
import HighlightsList from "../Highlights/HighlightsList";
import TestimonialSlider from "../CustomerReview/TestimonialSlider";
// import Test from "../../Test/Test";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Services></Services>
      <ContributorsSlider></ContributorsSlider>
      <HighlightsList></HighlightsList>
      <TestimonialSlider></TestimonialSlider>
      {/* <Test></Test> */}
    </div>
  );
};

export default Home;
