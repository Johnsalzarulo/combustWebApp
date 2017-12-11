import React, { Component } from "react";
import Routes from "./Routes";
import Navbar from "./Navbar";
import { observer } from "mobx-react";
import userStore from "../stores/UserStore";
import Chatboxes from "./combust_examples/Chatboxes";

@observer
export default class App extends Component {
  componentDidMount() {
    userStore.listenToUser();
  }

  render() {
    return (
      <div>
        <Navbar {...this.props} />
        <Chatboxes />
        <Routes {...this.props} />
      </div>
    );
  }
}
