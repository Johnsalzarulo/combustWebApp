import React, { Component } from "react";
import { observer } from "mobx-react";

import Navbar from "./Navbar";
import Routes from "./Routes";
import "../assets/styles/GlobalStyles.scss";

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
