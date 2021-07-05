import React, { Component } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  if (!Component) return null;
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
};

export default PrivateRoute;
