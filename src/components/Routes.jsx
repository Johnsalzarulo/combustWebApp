import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import Welcome from "./Welcome";

const Routes = props => {
  let loginWrapper = () => <Login {...props} />;
  let welcomeWrapper = () => <Welcome {...props} />;

  return (
    <Switch>
      <Route exact path="/" component={welcomeWrapper} />
      <Route path="/login" component={loginWrapper} />
    </Switch>
  );
};

export default Routes;
