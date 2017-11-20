import React from "react";
import { render } from "react-dom";
import createBrowserHistory from "history/createBrowserHistory";
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import firebase from "firebase";

import registerServiceWorker from "./helpers/registerServiceWorker";
import { firebaseConfig } from "./config";
import "./assets/styles/App.css";
import App from "./components/App";

firebase.initializeApp(firebaseConfig);

const browserHistory = createBrowserHistory();
const AppWrapper = withRouter(App);

render(
  <Router history={browserHistory}>
    <AppWrapper />
  </Router>,
  document.getElementById("root")
);

registerServiceWorker();
