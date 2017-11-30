import React, { Component } from "react";
import { observer } from "mobx-react";

//Programattically add to these lines when component is npm installed
import FriendsList from "./FriendsList";
import FollowersList from "./FollowersList";
const componentsByMode = {
  Friends: <FriendsList />,
  Followers: <FollowersList displayFollowers />,
  Following: <FollowersList displayFollowing />
};

@observer
export default class SocialContacts extends Component {
  state = {
    mode: Object.keys(componentsByMode)[0]
  };

  setMode = mode => {
    this.setState({ mode });
  };

  render() {
    return (
      <div className="SocialContacts uk-position-right">
        <div className="uk-inline">
          <h4>
            {this.state.mode}
            <span uk-icon="icon: triangle-down"> </span>
          </h4>
          <div uk-dropdown="pos: bottom-justify">
            <ul className="uk-nav uk-dropdown-nav">
              {Object.keys(componentsByMode).map((mode, i) => {
                return mode !== this.state.mode ? (
                  <li key={i}>
                    <a
                      onClick={e => {
                        this.setMode(mode);
                      }}
                      href="#"
                    >
                      {mode}
                    </a>
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        </div>
        {componentsByMode[this.state.mode]}
      </div>
    );
  }
}
