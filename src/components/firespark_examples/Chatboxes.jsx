import React, { Component } from "react";
import { observer } from "mobx-react";
import chatStore from "../../stores/ChatStore";
import friendStore from "../../stores/FriendStore";
import Chatbox from "./Chatbox";

@observer
export default class Chatboxes extends Component {
  state = {};

  componentWillMount() {
    friendStore.onFriendClicked(friend => {
      chatStore.openConversationWithUser(friend.id);
    });
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
