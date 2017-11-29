import React, { Component } from "react";
import { observer } from "mobx-react";
import chatStore from "../../stores/ChatStore";
import userStore from "../../stores/UserStore";

@observer
export default class Chatbox extends Component {
  state = {
    message: ""
  };

  messageLength = 0;
  shouldScroll = false;

  componentDidUpdate = props => {
    if (this.shouldScroll) {
      this.shouldScroll = false;
      this.scrollToBottom();
    }
  };

  handleMessageChange = e => {
    this.setState({ message: e.target.value });
    this.toggleUserTyping(true);
  };

  handleMessageSubmit = e => {
    chatStore.sendMessage(this.props.conversationId, this.state.message);
    this.setState({ message: "" });
    this.toggleUserTyping(false);
  };

  detectEnterKey = e => {
    if (e.key === "Enter") {
      this.handleMessageSubmit();
      e.stopPropagation();
    }
  };

  scrollToBottom = e => {
    var objDiv = document.getElementById(
      "messagebox-convoId-" + this.props.conversationId
    );
    objDiv.scrollTop = objDiv.scrollHeight;
  };

  toggleUserTyping(isTyping) {
    const { conversationId } = this.props;
    clearTimeout(this.currentTimeout);
    chatStore.toggleUserTyping(conversationId, isTyping);
    if (isTyping) {
      this.currentTimeout = setTimeout(e => {
        chatStore.toggleUserTyping(conversationId, false);
      }, 3000);
    }
  }

  render() {
    const { conversationId } = this.props;
    const messages = chatStore.getMessages(conversationId);
    const usersTyping = chatStore.getUsersTyping(conversationId);
    if (messages.length !== this.messageLength) {
      //new message
      this.shouldScroll = true;
    }
    this.messageLength = messages.length;
    const convoTitle = chatStore.getConvoTitle(conversationId);
    return (
      <div className="Chatbox">
        <div className="chat-header uk-light uk-flex uk-flex-between">
          <div className="convo-title">{convoTitle}</div>
          <button
            type="button"
            uk-close="true"
            onClick={e => chatStore.markConvoAsClosed(conversationId)}
          />
        </div>
        <div className="chat-messages">
          <div
            className="chat-messages-scrollable"
            id={"messagebox-convoId-" + conversationId}
          >
            {messages &&
              messages.map((m, i) => (
                <RenderMessageBubble
                  key={i}
                  message={m}
                  isIncoming={m.sentBy === userStore.userId}
                />
              ))}
            { usersTyping.length>0 &&
              usersTyping.map(email => {
                return <span>{email} is typing..</span>
              })

            }
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
