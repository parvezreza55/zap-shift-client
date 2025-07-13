import React from "react";
import {
  FaHome,
  FaTachometerAlt,
  FaInfoCircle,
  FaBoxOpen,
  FaHistory,
  FaSearchLocation,
  FaUserEdit,
  FaUsers,
  FaUserClock,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router";
import ProFastLogo from "../Pages/Home/Shared/Logo/ProFastLogo";

const DashBoardLayOut = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
        </div>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="bg-base-200 min-h-full">
          <ProFastLogo></ProFastLogo>
          <ul className="menu bg-base-200 text-base-content  w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <NavLink to="/">
                <FaHome className="inline mr-2" /> Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard">
                <FaTachometerAlt className="inline mr-2" /> Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink to="#">
                <FaInfoCircle className="inline mr-2" /> About
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/myparcel">
                <FaBoxOpen className="inline mr-2" /> My Parcel
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/PaymentHistroy">
                <FaHistory className="inline mr-2" /> Payment History
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/track">
                <FaSearchLocation className="inline mr-2" /> Track a Package
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/profile">
                <FaUserEdit className="inline mr-2" /> Update Profile
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/activeRiders">
                <FaUsers className="inline mr-2" /> Active Riders
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/pendingApproval">
                <FaUserClock className="inline mr-2" /> Pending Approval
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayOut;
