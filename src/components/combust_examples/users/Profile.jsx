import usersStore from "../../../stores/UsersStore";
import React, { Component } from "react";
import { observer } from "mobx-react";

import "./styles/Users.css";
import UserPosts from "../posts/UserPosts";
import CreatePost from "../posts/CreatePost";

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
                backgroundImage: 'url("https://static.pexels.com/photos/459225/pexels-photo-459225.jpeg")'
              }}
            >
              <div className="uk-text-large profile-name text-color-white">
                {user && user.email}
              </div>
            </div>
            <div className="uk-panel uk-flex uk-flex-center uk-flex-middle">
              <div className="uk-position-bottom uk-card-primary uk-flex uk-flex-left uk-padding-small uk-box-shadow-large">
                {userId && !isMyProfile ? (
                  <ul className="uk-iconnav nav-btns">
                    <li className="profile-nav-btn">
                      <Icon type="comment" />
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
                      <Icon type="user" />

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
                      <Icon type="star" />
                      <span
                        onClick={e => {
                          this.followUser(userId);
                        }}
                        className="uk-link"
                      >
                        Follow
                      </span>
                    </li>
                  </ul>
                ) : (
                  <ul className="uk-iconnav nav-btns">
                    <li
                      className="profile-nav-btn"
                      onClick={e => alert("combust install profile-details")}
                    >
                      <Icon type="pencil" />
                      <span className="uk-link">Edit Profile</span>
                    </li>
                  </ul>
                )}
              </div>
              <div className="uk-position-bottom-left uk-margin-small-left uk-margin-small-bottom">
                {user &&
                  user.iconUrl && (
                    <img
                      src={user.iconUrl}
                      className="profile-pic"
                      alt="profile"
                    />
                  )}
              </div>
            </div>
          </div>
          <div className="uk-background-muted uk-flex uk-flex-center">
            <div
              className="ProfileContent uk-grid-collapse uk-width-auto uk-child-width-1-2@s uk-flex-left"
              uk-grid="true"
            >
              <div className="uk-padding-large uk-background-muted">
                {isMyProfile && <CreatePost />}
                <UserPosts user={user} />
              </div>
              <div className="AboutMe uk-padding-large">
                <h1>About me</h1>
                <p>
                  Run <code>combust install profile-details</code> to make this
                  editable :D
                </p>
                {[1, 2, 3, 4].map(() => {
                  return (
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const Icon = ({ type }) => {
  //eslint-disable-next-line
  return <a uk-icon={"icon: " + type} />;
};
