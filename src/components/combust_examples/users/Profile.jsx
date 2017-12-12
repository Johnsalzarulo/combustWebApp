import usersStore from "../../../stores/UsersStore";
import React, { Component } from "react";
import { observer } from "mobx-react";
import "./styles/Users.css";

@observer
export default class Profile extends Component {
  state = {};

  componentDidMount() {}

  openConversationWithUser = userId => {
    alert("combust install chat");
  };

  followUser(userId) {
    alert("combust install followers");
  }

  sendFriendRequest(userId) {
    alert("combust install friends");
  }

  render() {
    const userId = this.props.match.params.userId;
    const user = usersStore.getUserById(userId);
    const isMyProfile = userId === usersStore.userId;

    return (
      <div className="Profile" uk-height-viewport="true">
        <div>
          <div>
            <div
              className="uk-background-cover uk-height-medium uk-panel"
              style={{
                backgroundImage: 'url("https://lorempixel.com/600/200/nature")'
              }}
            >
              <div className="uk-text-large profile-name text-color-white">
                {user && user.email}
              </div>
            </div>
            <div className="uk-panel uk-flex uk-flex-center uk-flex-middle">
              <div className="uk-position-bottom uk-card-primary uk-flex uk-flex-left uk-padding-small">
                {userId && !isMyProfile ? (
                  <ul className="uk-iconnav nav-btns">
                    <li className="profile-nav-btn">
                      <a href="#" uk-icon="icon: comment" />
                      <span
                        className="uk-link"
                        onClick={e => {
                          this.openConversationWithUser(userId);
                        }}
                      >
                        Send Message
                      </span>
                    </li>
                    <li className="profile-nav-btn">
                      <a href="#" uk-icon="icon: user" />
                      <span
                        onClick={e => {
                          this.sendFriendRequest(userId);
                        }}
                        className="uk-link"
                      >
                        Friend Request
                      </span>
                    </li>{" "}
                    <li className="profile-nav-btn">
                      <a href="#" uk-icon="icon: star" />
                      <span
                        className="uk-link"
                        onClick={e => {
                          this.followUser(userId);
                        }}
                      >
                        Follow
                      </span>
                    </li>
                  </ul>
                ) : (
                  <ul className="uk-iconnav nav-btns">
                    <li className="profile-nav-btn">
                      <a href="#" uk-icon="icon: pencil" />
                      <span className="uk-link">Edit Profile</span>
                    </li>
                  </ul>
                )}
              </div>
              <div className="uk-position-bottom-left uk-margin-small-left uk-margin-small-bottom">
                {user &&
                  user.iconUrl && (
                    <img src={user.iconUrl} className="profile-pic" alt="" />
                  )}
              </div>
            </div>
          </div>
          <div
            className="uk-grid-collapse uk-child-width-1-2@s uk-flex-left"
            uk-grid="true"
          >
            <div className="uk-padding-large uk-background-muted">
              <div className="ActivityPosts uk-flex uk-flex-top uk-flex-wrap">
                {[0, 1, 2, 4, 5, 6, 7].map(i => {
                  return (
                    <div
                      key={i}
                      className="ActivityPost uk-card uk-card-default uk-width-1@m uk-margin-bottom"
                    >
                      <div className="uk-card-header">
                        <div
                          className="uk-grid-small uk-flex-middle"
                          uk-grid="true"
                        >
                          <div className="uk-width-auto">
                            {user &&
                              user.iconUrl && (
                                <img
                                  src={user.iconUrl}
                                  className="uk-border-circle"
                                  width="40"
                                  height="40"
                                />
                              )}
                          </div>
                          <div className="uk-width-expand">
                            <h3 className="uk-card-title uk-margin-remove-bottom">
                              Title
                            </h3>
                            <p className="uk-text-meta uk-margin-remove-top">
                              <time dateTime="2016-04-01T19:00">
                                April 01, 2016
                              </time>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="uk-card-body">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt.
                        </p>
                      </div>
                      <div className="uk-card-footer">
                        <a href="#" className="uk-button uk-button-text">
                          Read more
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="uk-padding-large">
              <h1>About me</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
