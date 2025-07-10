import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Pages/Home/Shared/Navbar";
import Footer from "../Pages/Home/Shared/Footer";
import TestimonialSlider from "../Pages/Home/CustomerReview/TestimonialSlider";

const HomeLayOut = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-[calc(100vh-335px)]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default HomeLayOut;
