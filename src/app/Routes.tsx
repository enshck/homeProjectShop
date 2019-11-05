import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import SignUp from "../components/pages/login_signUp";
import AdminPanel from "../components/pages/adminPanel";
import { IProfile } from "../components/modals/basketModal";
import Items from "../components/pages/items";
import ItemsDetail from "../components/pages/itemsDetails";

const PrivateRoute = ({
  component: Component,
  authStatus,
  profile,
  role,
  ...rest
}: {
  component: any;
  authStatus: string;
  profile: IProfile;
  role: string | null;
  path: string;
  exact?: boolean;
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (authStatus === "autorize") {
          return <Component {...props} profile={profile} role={role} />;
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

const ProtectedRoute = ({
  component: Component,
  authStatus,
  profile,
  role,
  ...rest
}: {
  component: any;
  authStatus: string;
  profile: IProfile;
  role: string | null;
  path: string;
  exact?: boolean;
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (role === "admin") {
          return <Component {...props} profile={profile} />;
        } else if (role === "user") {
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

const PublicRoute = ({
  component: Component,
  authStatus,
  type,
  ...rest
}: {
  component: any;
  authStatus: string;
  path: string;
  type: string;
}) => {
  return (
    <Route
      {...rest}
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
  authStatus,
  role
}: {
  profile: IProfile;
  authStatus: string;
  role: string | null;
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
        {...{ authStatus, profile, role }}
      />
      <PrivateRoute
        component={ItemsDetail}
        path={`/items/:id`}
        {...{ authStatus, profile, role }}
      />
      <ProtectedRoute
        component={AdminPanel}
        path="/adminPanel"
        {...{ authStatus, type: "auth", profile, role }}
      />

      <Route render={() => <div>Not found</div>} />
    </Switch>
  );
};

export default Routes;
