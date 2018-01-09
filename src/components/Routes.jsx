import React from "react";
import { Switch, Route } from "react-router-dom";

import Login from "./users/Login";
import Register from "./users/Register";
import Welcome from "./Welcome";
import Profile from "./users/Profile";

const Routes = props => {
  let welcomeWrapper = () => <Welcome {...props} />;

  return (
    <Switch>
      <Route exact path="/" component={welcomeWrapper} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/profile/:userId" component={Profile} />
    </Switch>
  );
};

export default Routes;
