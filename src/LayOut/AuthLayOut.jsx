import React from "react";
import { Outlet } from "react-router";
import img1 from "../assets/authImage.png";
import ProFastLogo from "../Pages/Home/Shared/Logo/ProFastLogo";

const AuthLayOut = () => {
  return (
    <div className="w-11/12 mx-auto">
      <div>
        <ProFastLogo></ProFastLogo>
      </div>
      <div className="flex flex-col-reverse justify-center items-center lg:flex-row-reverse min-h-screen">
        <div className="flex-1 flex justify-center items-center">
          <img src={img1} className="rounded-lg" />
        </div>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AuthLayOut;
