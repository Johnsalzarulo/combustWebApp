import React, { Component } from "react";
import { observer } from "mobx-react";

import welcomeStore from "../../stores/WelcomeStore";
import SocialContacts from "./users/SocialContacts";
import { stores } from "../../.combust/init";
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
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://console.firebase.google.com/u/0/project/_/overview"
            >
              Select your project and click "Add firebase to your webapp"
            </a>{" "}
            <br />
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
          {firebaseConfigured &&
            emailAuthEnabled && (
              <span>
                <ToDoItem
                  completed={
                    stores.chatStore &&
                    stores.friendsStore &&
                    stores.followersStore
                  }
                  title="Install Combust Modules"
                />
                <ToDoItem completed={stores.chatStore}>
                  Add <b>messaging</b> from the terminal w/ the command:{" "}
                  <code>combust install chat</code>
                </ToDoItem>
                <ToDoItem completed={stores.friendsStore}>
                  Add <b>friends</b> functionality w/ the command:{" "}
                  <code>combust install friends</code>
                </ToDoItem>
                <ToDoItem completed={stores.followersStore}>
                  Add <b>followers</b> functionality w/ the command:{" "}
                  <code>combust install followers</code>
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
      {title && (
        <dt
          style={completed ? doneStyle : pendingStyle}
          className="uk-margin-small-bottom"
        >
          {title}
          {completed && <span style={{ paddingLeft: "10px" }}>✓</span>}
        </dt>
      )}
      <dd className="uk-margin-small-left">
        {!title &&
          completed && (
            <span className="uk-margin-small-right" style={doneStyle}>
              ✓
            </span>
          )}
        {children}
      </dd>
    </div>
  );
};

const doneStyle = {
  color: "green"
};
const pendingStyle = {};
