import React, { Component } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "./Header";

const PrivateRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { currentUser } = useAuth();
  if (!Component) return null;
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <>
            <Header />
            <Component {...props} />
          </>
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
};

export default PrivateRoute;
