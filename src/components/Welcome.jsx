import React, { Component } from "react";
import firebase from "firebase";

export default class Welcome extends Component {
  state = {
    firebaseInitialized: false,
    emailAuthEnabled: false,
    projectId: null
  };

  componentWillMount() {
    const that = this;
    try {
      firebase.database();
      let projectId = firebase.app().options.projectId;
      this.setState({ firebaseInitialized: true, projectId });
    } catch (err) {
      that.setState({ firebaseInitialized: false });
    }
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          "firesparktestuser@firespark.com",
          "sparky"
        )
        .then(() => {
          that.setState({ emailAuthEnabled: true });
        })
        .catch(error => {
          let emailAuthEnabled = error.code === "auth/email-already-in-use";
          that.setState({ emailAuthEnabled });
        });
    } catch (err) {
      that.setState({ emailAuthEnabled: false });
    }
  }

  render() {
    let { firebaseInitialized, emailAuthEnabled } = this.state;
    return (
      <div>
        <h2> Welcome to your firespark app</h2>
        <ol>
          {" "}
          <h4> To get started:</h4>
          <li>
            <ToDoItem completed={firebaseInitialized}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://console.firebase.google.com/u/0/project/_/overview"
              >
                Select your project and click "Add firebase to your webapp"
              </a>
            </ToDoItem>
          </li>
          <li>
            <ToDoItem completed={firebaseInitialized}>
              Apply the config object to the <code>firebaseConfig</code> object
              in <code>src/config.js</code>
            </ToDoItem>
          </li>
          {firebaseInitialized && (
            <li>
              <ToDoItem completed={emailAuthEnabled}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://console.firebase.google.com/u/0/project/${this
                    .state.projectId}/authentication/providers`}
                >
                  Enable Email/Password authentication in firebase
                </a>
              </ToDoItem>
            </li>
          )}
        </ol>
      </div>
    );
  }
}

const ToDoItem = ({ completed, children }) => {
  return (
    <div style={completed ? doneStyle : null}>
      {children}
      {completed && <span style={{ paddingLeft: "10px" }}>✓</span>}
    </div>
  );
};

const doneStyle = {
  color: "green",
  fontWeight: "bold"
};
