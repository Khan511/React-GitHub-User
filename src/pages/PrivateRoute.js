import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth0();
  const UserTrue = isAuthenticated && user;

  console.log(UserTrue);

  if (!UserTrue) {
    return <Navigate to="/login" />;
  }

  return children;

  // UserTrue ? children : <Navigate to="/login" />;
};
export default PrivateRoute;
