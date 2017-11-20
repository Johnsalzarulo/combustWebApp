import React, { Component } from "react";
import { userService } from "../service/UserService";
import { withRouter } from "react-router";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    isRegister: false
  };

  submit = () => {
    let user = {
      email: this.state.email,
      password: this.state.password
    };
    this.state.isRegister
      ? userService.createUser(user, (err, userData) => {
          debugger;
          if (err) {
            //handle signup err
          } else {
            // this.props.listenToUser(userData);
            this.props.history.push("/");
          }
        })
      : userService.login(user, (err, userData) => {
          // this.props.listenToUser(userData);
          this.props.history.push("/");

          console.log("logged in");
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
