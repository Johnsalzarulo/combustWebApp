import React, { Component } from "react";
import { observer } from "mobx-react";

import userStore from "../stores/UserStore";

@observer
export default class Login extends Component {
  state = {
    email: "",
    password: "",
    isRegister: false
  };

  componentWillUpdate(nextProps) {
    if (userStore.user) {
      this.props.history.push("/");
    }
  }

  submit = () => {
    let user = {
      email: this.state.email,
      password: this.state.password
    };

    this.state.isRegister
      ? userStore.createUser(user, (err, userData) => {
          if (err) {
            //handle signup err
          } else {
            this.props.history.push("/");
          }
        })
      : userStore.login(user, (err, userData) => {
          err ? console.log(err) : this.props.history.push("/");
        });
  };

  render() {
    return (
      <div>
        {this.state.isRegister ? (
          <button
            onClick={e => {
              this.setState({ isRegister: false });
            }}
          >
            Login instead
          </button>
        ) : (
          <button
            onClick={e => {
              this.setState({ isRegister: true });
            }}
          >
            Don't have an account? Register
          </button>
        )}
        <br />
        <br />
        <input
          type="text"
          onChange={e => {
            this.setState({ email: e.target.value });
          }}
          placeholder="Email.."
        />
        <input
          type="password"
          onChange={e => {
            this.setState({ password: e.target.value });
          }}
          placeholder="Password"
        />
        <button onClick={this.submit}>
          {this.state.isRegister ? "Create Account" : "Login"}
        </button>
      </div>
    );
  }
}
