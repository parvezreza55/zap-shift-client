import React from "react";
import logo from "../../../../assets/logo.png";
import { Link } from "react-router";
const ProFastLogo = () => {
  return (
    <Link to={"/"}>
      <div className="py-1">
        <div className="relative">
          <img src={logo} alt="" />
          <p className="absolute -bottom-2 left-5 text-3xl font-extrabold">
            ProFast
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProFastLogo;
