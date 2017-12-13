import React, { Component } from "react";
import { observer } from "mobx-react";

import Navbar from "./Navbar";
import Routes from "./Routes";
import usersStore from "../stores/UsersStore";
import "./styles/App.css";

@observer
export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar {...this.props} />
        <Routes {...this.props} />
      </div>
    );
  }
}
