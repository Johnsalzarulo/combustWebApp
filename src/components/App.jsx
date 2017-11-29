import React, { Component } from "react";
import Routes from "./Routes";
import Navbar from "./Navbar";
import { observer } from "mobx-react";
import userStore from "../stores/UserStore";

@observer
export default class App extends Component {
  componentDidMount() {
    userStore.listenToUser();
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="uk-container">
          <Routes {...this.props} />
        </div>
      </div>
    );
  }
}
