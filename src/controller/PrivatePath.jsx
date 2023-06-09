import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {routes} from "./routes";
import {isLoggedIn} from "./localStorageHandler";

const PrivateRoute = ({component: Component, ...rest}) => {

  return <Route {...rest} render={props => (
    isLoggedIn() ?
      <Component {...props} {...rest} /> :
      <Redirect to={{pathname: routes.login, state: {from: props.location}}}/>
  )}/>
};
export default PrivateRoute;
