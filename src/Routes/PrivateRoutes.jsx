import React from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate, useLocation } from "react-router";

const PrivateRoutes = ({ children }) => {
  const location = useLocation();
  const { loading, user } = useAuth();
  if (loading) {
    return (
      <>
        <div className="flex justify-center items-center">
          <span className="loading loading-bars loading-xl"></span>
        </div>
      </>
    );
  }
  if (!user) {
    return <Navigate to={"/login"} state={location.pathname}></Navigate>;
  }
  return children;
};

export default PrivateRoutes;
