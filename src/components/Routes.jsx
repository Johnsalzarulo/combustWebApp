import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import Welcome from "./combust_examples/Welcome";
import Profile from "./combust_examples/Profile";

const Routes = props => {
  let loginWrapper = () => <Login {...props} />;
  let welcomeWrapper = () => <Welcome {...props} />;

  return (
    <Switch>
      <Route exact path="/" component={welcomeWrapper} />
      <Route path="/login" component={loginWrapper} />
      <Route path="/profile/:userId" component={Profile} />
    </Switch>
  );
};

export default Routes;
