import React, { Component } from "react";
import { observer } from "mobx-react";
import chatStore from "../../stores/ChatStore";
import friendStore from "../../stores/FriendStore";
import followerStore from "../../stores/FollowerStore";

import Chatbox from "./Chatbox";

@observer
export default class Chatboxes extends Component {
  state = {};

  componentWillMount() {
    const openConversation = friend => {
      chatStore.openConversationWithUser(friend.id);
    }

    followerStore.onFollowerClicked(openConversation);
    friendStore.onFriendClicked(openConversation);
  }

  render() {
    const convoIds = chatStore.openConversationIds;

    return (
      <div className="Chatboxes uk-position-bottom">
        {convoIds &&
          convoIds.map((convoId, i) => {
            return <Chatbox key={i} conversationId={convoId} />;
          })}
      </div>
    );
  }
}
