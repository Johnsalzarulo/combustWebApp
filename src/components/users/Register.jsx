import React, { Component } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

import userStore from "../../stores/UserStore";

const fields = {
  //legal data types: string, text, number
  email: "string",
  password: "string"
};

@observer
export default class Register extends Component {
  state = {
    errMessage: ""
  };

  componentDidUpdate(nextProps) {
    if (userStore.user) {
      this.props.history.push("/");
    }
  }

  submit = e => {
    e.preventDefault();
    let user = {};
    Object.keys(fields).forEach(field => {
      let val = this.state[field];
      if (val) {
        val = fields[field] === "number" ? parseInt(val, 0) : val;
        user[camelCase(field)] = val;
      }
    });

    userStore.createUser(user, (err, userData) => {
      if (err) {
        this.setState({ errMessage: err.message });
      } else {
        this.props.history.push("/");
      }
    });
  };

  render() {
    const user = userStore.user;

    return (
      <div className="Register uk-flex uk-flex-center uk-margin">
        {user && <div>You already have an account.</div>}
        <form onSubmit={this.submit} className="uk-width-medium">
          <legend className="uk-legend">New Account</legend>
          {fields &&
            Object.keys(fields).map(field => {
              const type = fields[field];
              return (
                <div className="uk-margin">
                  {type === "text" ? (
                    <textarea
                      className="uk-textarea uk-form-width-large"
                      onChange={e => {
                        this.setState({ [field]: e.target.value });
                      }}
                      value={this.state[field] != null ? this.state[field] : ""}
                      placeholder={field}
                    />
                  ) : (
                    <input
                      className="uk-input uk-form-width-medium"
                      onChange={e => {
                        this.setState({ [field]: e.target.value });
                      }}
                      placeholder={
                        field.charAt(0).toUpperCase() + field.substring(1)
                      }
                      type={
                        field === "password"
                          ? field
                          : type === "string" ? "text" : "number"
                      }
                    />
                  )}
                </div>
              );
            })}
          <button
            className="uk-button uk-button-default uk-form-width-medium uk-margin-small-bottom"
            onClick={this.submit}
          >
            Sign Up
          </button>{" "}
          <br />
          <Link to="/login">Login instead</Link>
          <div className="uk-text-danger uk-text-break uk-margin-small-top">
            {this.state.errMessage}
          </div>
        </form>
      </div>
    );
  }
}

const camelCase = str => {
  let string = str
    .toLowerCase()
    .replace(/[^A-Za-z0-9]/g, " ")
    .split(" ")
    .reduce((result, word) => result + capitalize(word.toLowerCase()));
  return string.charAt(0).toLowerCase() + string.slice(1);
};

const capitalize = str =>
  str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
