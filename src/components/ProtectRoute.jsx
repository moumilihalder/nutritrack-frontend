import React from "react";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("You must log in to access this page!");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectRoute;
