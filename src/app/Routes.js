import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import SignUp from "../components/pages/login_signUp";
import Items from "../components/pages/items";

const PrivateRoute = props => {
  const { render, component: Component, authStatus, profile, ...rest } = props;

  return (
    <Route
      {...rest}
      render={props => {
        if (authStatus === "autorize") {
          return render ? render() : <Component {...props} profile={profile} />;
        } else if (authStatus === "unautorize") {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          );
        }
      }}
    />
  );
};

const PublicRoute = props => {
  const { render, component: Component, authStatus, type, ...rest } = props;
  return (
    <Route
      {...rest}
      render={props => {
        if (authStatus === "unautorize") {
          return render ? render() : <Component {...props} type={type} />;
        } else if (authStatus === "autorize") {
          return (
            <Redirect
              to={{
                pathname: "/items",
                state: { from: props.location }
              }}
            />
          );
        }
      }}
    />
  );
};

const Routes = ({ profile, authStatus }) => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() =>
          authStatus ? <Redirect to="/items" /> : <Redirect to="/login" />
        }
      />
      <PublicRoute
        component={SignUp}
        path="/login"
        {...{ authStatus, type: "auth" }}
      />
      <PublicRoute
        component={SignUp}
        path="/signUp"
        {...{ authStatus, type: "signUp" }}
      />
      <PrivateRoute
        component={Items}
        path="/items"
        {...{ authStatus, profile }}
      />

      <Route render={() => <div>Not found</div>} />
    </Switch>
  );
};

export default Routes;
