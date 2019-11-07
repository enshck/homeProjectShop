import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import SignUp from "../components/pages/login_signUp";
import AdminPanel from "../components/pages/adminPanel";
import { IProfile } from "../components/modals/basketModal";
import Items from "../components/pages/items";
import ItemsDetail from "../components/pages/itemsDetails";
import WrapComponent from "../components/wrapComponent";

const PrivateRoute = ({
  component: Component,
  isAuth,
  profile,
  isAdmin,
  ...rest
}: {
  component: any;
  isAuth: boolean;
  profile: IProfile;
  isAdmin: boolean;
  path: string;
  exact?: boolean;
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (isAuth) {
          return <Component {...props} />;
        } else {
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
  isAuth,
  profile,
  isAdmin,
  ...rest
}: {
  component: any;
  isAuth: boolean;
  profile: IProfile;
  isAdmin: boolean;
  path: string;
  exact?: boolean;
}) => {
  console.log(isAdmin, "adm");
  return (
    <Route
      {...rest}
      render={props => {
        if (isAdmin) {
          return <Component {...props} />;
        } else {
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
  isAuth,
  type,
  ...rest
}: {
  component: any;
  isAuth: boolean;
  path: string;
  type: string;
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!isAuth) {
          return <Component {...props} type={type} />;
        } else {
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

const Routes = () => {
  const isAuth = useSelector<any, boolean>(state => state.isAuth);
  const isAdmin = useSelector<any, boolean>(state => state.isAdmin);
  const profile = useSelector<any, IProfile>(state => state.profile);

  return (
    <WrapComponent>
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            isAdmin ? <Redirect to="/items" /> : <Redirect to="/login" />
          }
        />
        <PublicRoute
          component={SignUp}
          path="/login"
          {...{ isAuth, type: "auth" }}
        />
        <PublicRoute
          component={SignUp}
          path="/signUp"
          {...{ isAuth, type: "signUp" }}
        />
        <PrivateRoute
          exact
          component={Items}
          path="/items"
          {...{ isAuth, profile, isAdmin }}
        />
        <PrivateRoute
          component={ItemsDetail}
          path={`/items/:id`}
          {...{ isAuth, profile, isAdmin }}
        />
        <ProtectedRoute
          component={AdminPanel}
          path="/adminPanel"
          {...{ isAuth, type: "auth", profile, isAdmin }}
        />

        <Route render={() => <div>Not found</div>} />
      </Switch>
    </WrapComponent>
  );
};

export default Routes;
