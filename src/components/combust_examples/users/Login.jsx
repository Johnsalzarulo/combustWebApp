import React, { Component } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

import usersStore from "../../../stores/UsersStore";

@observer
export default class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  componentWillUpdate(nextProps) {
    if (usersStore.user) {
      this.props.history.push("/");
    }
  }

  submit = e => {
    e.preventDefault();
    let user = {
      email: this.state.email,
      password: this.state.password
    };
    usersStore.login(user, (err, userData) => {
      err ? console.log(err) : this.props.history.push("/");
    });
  };

  render() {
    return (
      <div className="Register uk-flex uk-flex-center uk-margin">
        <form onSubmit={this.submit}>
          <legend className="uk-legend">Login</legend>
          <div className="uk-margin">
            <input
              className="uk-input uk-form-width-medium"
              type="text"
              onChange={e => {
                this.setState({ email: e.target.value });
              }}
              placeholder="Email"
            />
          </div>
          <div className="uk-margin">
            <input
              className="uk-input uk-form-width-medium"
              type="password"
              onChange={e => {
                this.setState({ password: e.target.value });
              }}
              placeholder="Password"
            />
          </div>
          <button
            className="uk-button uk-button-default uk-form-width-medium uk-margin-small-bottom"
            onClick={this.submit}
          >
            Login
          </button>{" "}
          <br />
          <Link to="/register">Create an account</Link>
        </form>
      </div>
    );
  }
}
