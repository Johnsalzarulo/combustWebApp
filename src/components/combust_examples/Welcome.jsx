import React, { Component } from "react";
import { observer } from "mobx-react";

import welcomeStore from "../../stores/WelcomeStore";
import SocialContacts from "./SocialContacts";
// import Chatboxes from "./Chatboxes";
import "./styles/Welcome.css";
import Profile from "./Profile";

@observer
export default class Welcome extends Component {
  state = {};

  componentDidMount() {
    welcomeStore.isFirebaseConfigured();
    // welcomeStore.isEmailAuthEnabled();
  }

  render() {
    let {
      firebaseConfigured,
      emailAuthEnabled,
      projectId,
      friendsAdded
    } = welcomeStore;

    return (
      <div className="Welcome uk-container uk-margin-medium-top">
        <div className="uk-heading-primary">
          {" "}
          Welcome to your combust app
        </div>{" "}
        <h4> To get started:</h4>
        <dl className="uk-description-list">
          <ToDoItem completed={firebaseConfigured} title="Configure Firebase">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://console.firebase.google.com/u/0/project/_/overview"
            >
              Select your project and click "Add firebase to your webapp"
            </a>
          </ToDoItem>
          <ToDoItem
            completed={firebaseConfigured}
            title="Apply Config in /src/config"
          >
            Apply the config object to the <code>firebaseConfig</code> object in{" "}
            <code>src/config.js</code>
          </ToDoItem>
          {firebaseConfigured && (
            <ToDoItem
              completed={emailAuthEnabled}
              title="Enable Authentication"
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://console.firebase.google.com/u/0/project/${projectId}/authentication/providers`}
              >
                Enable Email/Password authentication in firebase
              </a>
            </ToDoItem>
          )}
          {firebaseConfigured && (
            <span>
              <ToDoItem
                completed={friendsAdded}
                title="Install Combust Modules"
              >
                Add <b>friends</b> functionality from the terminal w/ the
                command: <code>combust install friends</code>
              </ToDoItem>

              <ToDoItem completed={friendsAdded}>
                Add <b>messaging</b> w/ the command:{" "}
                <code>combust install chat</code>
              </ToDoItem>

              <ToDoItem completed={friendsAdded}>
                Add <b>posts and feed</b> w/ the command:{" "}
                <code>combust install feed</code>
              </ToDoItem>
            </span>
          )}
        </dl>
        {/* <Chatboxes /> */}
        <SocialContacts />
      </div>
    );
  }
}

const ToDoItem = ({ completed, title, children }) => {
  return (
    <div>
      <dt>{title}</dt>
      <div style={completed ? doneStyle : null}>
        <dd>
          {children}
          {completed && <span style={{ paddingLeft: "10px" }}>✓</span>}
        </dd>
      </div>
    </div>
  );
};

const doneStyle = {
  color: "green"
};
