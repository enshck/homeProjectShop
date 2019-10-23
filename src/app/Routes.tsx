import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import SignUp from "../components/pages/login_signUp";
import { IProfile } from "../components/basketModal";
import Items from "../components/pages/items";
import ItemsDetail from "../components/pages/itemsDetails";

const PrivateRoute = ({
  component: Component,
  authStatus,
  profile
}: {
  component: any;
  authStatus: string;
  profile: IProfile;
  path: string;
  exact?: boolean;
}) => {
  return (
    <Route
      render={props => {
        if (authStatus === "autorize") {
          return <Component {...props} profile={profile} />;
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

const PublicRoute = ({
  component: Component,
  authStatus,
  type
}: {
  component: any;
  authStatus: string;
  path: string;
  type: string;
}) => {
  return (
    <Route
      render={props => {
        if (authStatus === "unautorize") {
          return <Component {...props} type={type} />;
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

const Routes = ({
  profile,
  authStatus
}: {
  profile: IProfile;
  authStatus: string;
}) => {
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
        exact
        component={Items}
        path="/items"
        {...{ authStatus, profile }}
      />
      <PrivateRoute
        component={ItemsDetail}
        path={`/items/:id`}
        {...{ authStatus, profile }}
      />

      <Route render={() => <div>Not found</div>} />
    </Switch>
  );
};

export default Routes;
