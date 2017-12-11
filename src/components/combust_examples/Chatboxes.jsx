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
    const openConversation = user => {
      chatStore.openConversationWithUser(user.id);
    };
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
