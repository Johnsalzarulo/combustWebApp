import React, { Component } from "react";
import { observer } from "mobx-react";

import usersStore from "../stores/UsersStore";

@observer
export default class Login extends Component {
  state = {
    email: "",
    password: "",
    isRegister: false
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

    this.state.isRegister
      ? usersStore.createUser(user, (err, userData) => {
          if (err) {
            //handle signup err
          } else {
            this.props.history.push("/");
          }
        })
      : usersStore.login(user, (err, userData) => {
          err ? console.log(err) : this.props.history.push("/");
        });
  };

  toggleIsRegister = e => {
    e.preventDefault();
    this.setState({ isRegister: !this.state.isRegister });
  };

  render() {
    return (
      <div className="Login uk-flex uk-flex-center uk-margin">
        <form onSubmit={this.submit}>
          <legend className="uk-legend">
            {this.state.isRegister ? "New Account" : "Login"}
          </legend>
          <div class="uk-margin">
            <input
              className="uk-input uk-form-width-medium"
              type="text"
              onChange={e => {
                this.setState({ email: e.target.value });
              }}
              placeholder="Email.."
            />
          </div>
          <div class="uk-margin">
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
            className="uk-button uk-button-default uk-form-width-medium"
            onClick={this.submit}
          >
            {this.state.isRegister ? "Register" : "Login"}
          </button>{" "}
          <br />
          <button
            className="uk-button uk-button-primary uk-margin-small uk-form-width-medium"
            onClick={this.toggleIsRegister}
          >
            {this.state.isRegister ? "Login" : "Register"}
          </button>
        </form>
      </div>
    );
  }
}
