import React, { Component } from "react";
import { observer } from "mobx-react";

import Navbar from "./Navbar";
import Routes from "./Routes";
import usersStore from "../stores/UsersStore";
import Chatboxes from "./combust_examples/chat/Chatboxes";
import "./styles/App.css";

@observer
export default class App extends Component {
  componentDidMount() {
    usersStore.listenToUser();
  }

  render() {
    return (
      <div>
        <Navbar {...this.props} />
        <Routes {...this.props} />
        <Chatboxes />
      </div>
    );
  }
}
