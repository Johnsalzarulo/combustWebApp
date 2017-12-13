import React, { Component } from "react";
import { observer } from "mobx-react";

import welcomeStore from "../../stores/WelcomeStore";
import SocialContacts from "./users/SocialContacts";
import Profile from "./users/Profile";

@observer
export default class Welcome extends Component {
  state = {};

  componentDidMount() {
    welcomeStore.isFirebaseConfigured();
    welcomeStore.isEmailAuthEnabled();
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
          Welcome to your Combust app
        </div>{" "}
        <h4> To get started:</h4>
        <dl className="uk-description-list">
          <ToDoItem completed={firebaseConfigured} title="Configure Firebase">
            <ul className="uk-list uk-list-bullet">
              <li>
                {" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://console.firebase.google.com/u/0/project/_/overview"
                >
                  Select your project and click "Add firebase to your webapp"
                </a>
              </li>
              <li>
                {" "}
                Apply the config object to the <code>firebaseConfig</code>{" "}
                object in <code>src/config.js</code>
              </li>
            </ul>
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
        <SocialContacts />
      </div>
    );
  }
}

const ToDoItem = ({ completed, title, children }) => {
  return (
    <div className="uk-margin-small-top">
      <dt
        style={completed ? doneStyle : pendingStyle}
        className="uk-margin-small-bottom"
      >
        {title}
        {completed && <span style={{ paddingLeft: "10px" }}>✓</span>}
      </dt>
      <dd>{children}</dd>
    </div>
  );
};

const doneStyle = {
  color: "green"
};
const pendingStyle = {};
