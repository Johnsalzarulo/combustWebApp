import React, { Component } from "react";
import { observer } from "mobx-react";
import chatStore from "../../stores/ChatStore";
import userStore from "../../stores/UserStore";

@observer
export default class Chatbox extends Component {
  state = {
    message: ""
  };

  handleMessageChange = e => {
    this.setState({ message: e.target.value });
  };

  handleMessageSubmit = e => {
    chatStore.sendMessage(this.props.conversationId, this.state.message);
    this.setState({ message: "" });
  };

  detectEnterKey = e => {
    if (e.key === "Enter") {
      this.handleMessageSubmit();
      e.stopPropagation();
    }
  };

  render() {
    const { conversationId } = this.props;
    const messages = chatStore.getMessages(conversationId);
    const convoTitle = chatStore.getConvoTitle(conversationId);
    debugger;
    return (
      <div className="Chatbox">
        <div className="chat-header uk-background-primary uk-light uk-flex uk-flex-between">
          <div className="convo-title">{convoTitle}</div>
          <button
            type="button"
            uk-close="true"
            onClick={e => chatStore.markConvoAsClosed(conversationId)}
          />
        </div>
        <div className="chat-messages">
          <div className="chat-messages-scrollable">
            {messages &&
              messages.map(m => (
                <RenderMessageBubble
                  message={m}
                  isIncoming={m.sentBy === userStore.userId}
                />
              ))}
              </div>
        </div>
        <div className="message-input">
          <span uk-icon="icon: comment" onClick={this.handleMessageSubmit} />
          <input
            type="text"
            value={this.state.message}
            onChange={this.handleMessageChange}
            onKeyPress={this.detectEnterKey}
          />
        </div>
      </div>
    );
  }
}

const RenderMessageBubble = ({ message, isIncoming }) => {
  return (
    <div
      className={
        "RenderMessageBubble " +
        (isIncoming
          ? "uk-text-primary uk-background-secondary incomingMsg"
          : "uk-background-primary outgoingMsg")
      }
    >
      {message.body}
    </div>
  );
};
