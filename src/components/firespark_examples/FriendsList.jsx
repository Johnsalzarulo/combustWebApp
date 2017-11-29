import React, { Component } from "react";
import { observer } from "mobx-react";
import friendStore from "../../stores/FriendStore";

//FRIENDS_DEPENDENCIES

@observer
export default class FriendsList extends Component {
  state = {
    options: [{ value: "one", label: "One" }, { value: "two", label: "Two" }]
  };

  logChange = val => {
    console.log("Selected: ", val);
  };

  handleFriendClick = friend => {
    friendStore.handleFriendClick(friend);
  };

  render() {
    const friends = friendStore.friends;
    const hasZeroFriends = !friends || Object.keys(friends).length === 0;
    return (
      <div className="FriendsList uk-position-right">
        <h4 className="uk-heading-line">
          <span>Friends:</span>
        </h4>

        {/* Friends List: */}
        {!hasZeroFriends ? (
          Object.keys(friends).map((friendId, i) => {
            const friend = friends[friendId];
            return (
              <div
                key={i}
                onClick={e => this.handleFriendClick(friend)}
                className="Friend uk-flex uk-flex-around uk-flex-middle"
              >
                <img className="avatar" src={friend.iconUrl} alt="" />
                <span>{friend.email}</span>
                <span
                  className={
                    "isOnline " + (friend.online ? "online" : "offline")
                  }
                />
              </div>
            );
          })
        ) : (
          <div>no friends!</div>
        )}
      </div>
    );
  }
}
