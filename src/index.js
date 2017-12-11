import React from "react";
import { render } from "react-dom";
import createBrowserHistory from "history/createBrowserHistory";
import { Router, withRouter } from "react-router-dom";
import firebase from "firebase";
import registerServiceWorker from "./helpers/registerServiceWorker";
import { firebaseConfig } from "./.combust/config";
import "./assets/styles/App.css";
import App from "./components/App";
import uicss from "uikit/dist/css/uikit.css";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";

import friendsStore from "./stores/FriendsStore";
import chatStore from "./stores/ChatStore";
import followersStore from "./stores/FollowersStore";
// UIkit.notification("Hello world.");
UIkit.use(Icons);
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

// import installedStores from config;
// installedStores.forEach(store => {
//   store.subscribeToEvents();
// })

friendsStore.subscribeToEvents();
chatStore.subscribeToEvents();
followersStore.subscribeToEvents();
