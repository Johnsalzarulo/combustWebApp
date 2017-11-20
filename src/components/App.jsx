import React, { Component } from "react";
import { Link } from "react-router-dom";
import Routes from "./Routes";
import { userService } from "../service/UserService";

export default class App extends Component {
  //application state managed here.
  //replace this with your state mngmnt library of choice (eg: redux/mobx)
  state = {
    user: null
  };

  setGlobalState = (key, val) => {
    this.setState({ [key]: val });
  };

  listenToUser = userData => {
    this.props.history.push("/");
    userService.listenForUserChanges(userData, (err, user) => {
      this.setState({ user });
    });
  };

  render() {
    const props = {
      setGlobalState: this.setGlobalState,
      globalState: this.state,
      listenToUser: this.listenToUser
    };

    let user = null;
    let screenName = user ? user.id : "none";

    return (
      <div>
        <div className="header">
          <Link to="/">Home</Link>
          {!user && <Link to="/login">Login</Link>}
          <div>User: {screenName}</div>
          {/* {user && <a onClick={e => UserService.signout(user)}>Logout</a>} */}
        </div>
        <Routes {...this.props} {...props} />
      </div>
    );
  }
}
