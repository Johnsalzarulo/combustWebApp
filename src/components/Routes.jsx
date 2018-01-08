import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./combust_examples/users/Login";
import Register from "./combust_examples/users/Register";
import Welcome from "./combust_examples/Welcome";
import Profile from "./combust_examples/users/Profile";
import PostView from "./combust_examples/posts/PostView";
import NotifHistory from "./combust_examples/notifications/NotifHistory";

const Routes = props => {
  let welcomeWrapper = () => <Welcome {...props} />;

  return (
    <Switch>
      <Route exact path="/" component={welcomeWrapper} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/profile/:userId" component={Profile} />
      <Route path="/posts/:postId" component={PostView} />
      <Route path="/notifications" component={NotifHistory} />
    </Switch>
  );
};

export default Routes;
