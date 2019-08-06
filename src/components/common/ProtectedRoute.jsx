import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/AuthService";
const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!auth.getUser()) return <Redirect to={`/login`} />;
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
