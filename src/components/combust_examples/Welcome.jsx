import React, { Component } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

import welcomeStore from "../../stores/WelcomeStore";
import usersStore from "../../stores/UsersStore";
import { stores } from "../../.combust/init";
import SocialContacts from "./users/SocialContacts";
import Profile from "./users/Profile";
const availApps = require("../../.combust/availApps.json");

@observer
export default class Welcome extends Component {
  state = {
    modalText: null
  };

  componentDidMount() {
    welcomeStore.isFirebaseConfigured();
    welcomeStore.isEmailAuthEnabled();
  }

  setModalText = modalText => {
    this.setState({ modalText });
  };

  render() {
    let {
      firebaseConfigured,
      emailAuthEnabled,
      projectId,
      friendsAdded
    } = welcomeStore;

    const user = usersStore.user;
    const adminConfigured =
      user && usersStore.serverInfo && usersStore.serverInfo.isAdmin;

    return (
      <div className="Welcome uk-container uk-margin-medium-top">
        <div className="uk-heading-primary"> Welcome to your Combust app!</div>{" "}
        <h4>To get going:</h4>
        <hr className="uk-divider-icon" />
        <ul uk-accordion="multiple: true">
          <RenderDropdown
            completed={firebaseConfigured}
            title="Configure Firebase"
          >
            {availApps && availApps.length > 0 ? (
              <div>
                <div>Select a Firebase project to link to this app</div>
                <table className="uk-table uk-table-small uk-table-striped uk-table-hover">
                  <caption>Your current apps</caption>
                  <thead>
                    <tr>
                      <th>Project Name</th>
                      <th>Project ID</th>
                      <th>Permissions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {availApps.map(app => {
                      return (
                        <tr
                          key={app.id}
                          uk-toggle="target: #my-id"
                          onClick={e => {
                            this.setModalText(
                              <span>
                                Execute from your terminal: <br />
                                <br />
                                <code>combust configure {app.id}</code>
                              </span>
                            );
                          }}
                        >
                          <td>{app.name}</td>
                          <td>{app.id}</td>
                          <td>{app.role}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <hr className="uk-divider-small" />
                Or:{" "}
                <a
                  href="https://console.firebase.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Create a new Firebase project
                </a>{" "}
                then run <code>combust configure</code>
              </div>
            ) : (
              <div>
                {" "}
                You may do this in the terminal with:{" "}
                <code>combust configure</code>
                <hr className="uk-divider-small" />
                Or apply the firebase config manually.{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://console.firebase.google.com/u/0/project/_/overview"
                >
                  Select your project and click "Add firebase to your webapp".
                </a>{" "}
                <br />
                Apply the JSON object to <code>firebaseConfig</code> in{" "}
                <code>src/.combust/config.js</code>
              </div>
            )}
          </RenderDropdown>

          {firebaseConfigured && (
            <RenderDropdown
              completed={emailAuthEnabled}
              title="Enable Authentication"
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://console.firebase.google.com/u/0/project/${projectId}/authentication/providers`}
              >
                Enable Email/Password authentication in Firebase
              </a>
            </RenderDropdown>
          )}
          {firebaseConfigured &&
            emailAuthEnabled && (
              <RenderDropdown
                completed={
                  user && usersStore.serverInfo && usersStore.serverInfo.isAdmin
                }
                title="Create a User"
              >
                <ToDoItem completed={user}>
                  <Link
                    to="/register"
                    onClick={e => {
                      if (user) {
                        e.preventDefault();
                        alert("You did that, silly");
                      }
                    }}
                  >
                    Create your first user account
                  </Link>
                </ToDoItem>
                <ToDoItem completed={adminConfigured}>
                  Mark the account as an admin by executing{" "}
                  <code>
                    combust admin {user ? user.email : "your_email@abc.com"}
                  </code>
                </ToDoItem>
              </RenderDropdown>
            )}

          {firebaseConfigured &&
            emailAuthEnabled &&
            adminConfigured && (
              <RenderDropdown
                completed={
                  stores.chatStore &&
                  stores.friendsStore &&
                  stores.followersStore
                }
                title="Install Combust Modules"
              >
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
              </RenderDropdown>
            )}
        </ul>
        <SocialContacts />
        <div id="my-id" uk-modal="true">
          <div className="uk-modal-dialog uk-modal-body">
            <h2 className="uk-modal-title" />
            <button
              className="uk-modal-close-default"
              type="button"
              uk-close="true"
              title="Close"
              uk-tooltip="true"
            />{" "}
            {this.state.modalText}
          </div>
        </div>
      </div>
    );
  }
}

const RenderDropdown = ({ completed, title, children }) => {
  return (
    <li className={completed ? null : "uk-open"}>
      <h3
        className="uk-accordion-title"
        style={completed ? doneStyle : pendingStyle}
      >
        {title}
        {completed && <span style={{ paddingLeft: "10px" }}>✓</span>}
      </h3>
      <div className="uk-accordion-content">{children}</div>
    </li>
  );
};

const ToDoItem = ({ completed, children }) => {
  return (
    <div style={completed ? doneStyle : null}>
      {completed && (
        <span className="uk-margin-small-right" style={doneStyle}>
          ✓
        </span>
      )}
      {children}
    </div>
  );
};

const doneStyle = {
  color: "green"
};
const pendingStyle = {
  color: "#1e87f0"
};
