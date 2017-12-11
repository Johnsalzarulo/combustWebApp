import React, { Component } from "react";
import { observer } from "mobx-react";
import chatStore from "../../stores/ChatStore";
import friendsStore from "../../stores/FriendsStore";
import followersStore from "../../stores/FollowersStore";

import Chatbox from "./Chatbox";

@observer
export default class Chatboxes extends Component {
  state = {};

  componentWillMount() {
    const openConversation = friend => {
      chatStore.openConversationWithUser(friend.id);
    };

    followersStore.onFollowerClicked(openConversation);
    friendsStore.onFriendClicked(openConversation);
  }

  render() {
    const convoIds = chatStore.openConversationIds;

    return (
      <div className="Chatboxes">
        {convoIds &&
          convoIds.map((convoId, i) => {
            return <Chatbox key={i} conversationId={convoId} />;
          })}
      </div>
    );
  }
}
