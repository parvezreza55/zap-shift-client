import React, { use } from "react";
import { AuthContext } from "../Context/AuthContex";

const useAuth = () => {
  const dataInfo = use(AuthContext);
  return dataInfo;
};

export default useAuth;
