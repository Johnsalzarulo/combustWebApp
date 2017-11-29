import React from "react";
import { observer } from "mobx-react";
import chatStore from "../../stores/ChatStore";

const Chatbox = observer(({ conversationId }) => {
  const messages = chatStore.getMessages(conversationId);
  const convoTitle = chatStore.getConvoTitle(conversationId);
  debugger;
  return (
    <div className="Chatbox">
      <div className="chat-header uk-background-primary uk-light uk-flex uk-flex-between">
        <h4>{convoTitle}</h4>
        <button
          type="button"
          uk-close="true"
          onClick={e => chatStore.markConvoAsClosed(conversationId)}
        />
      </div>
      <div className="chat-messages">
        {messages &&
          messages.map(m => {
            return <div>{m.body}</div>;
          })}
      </div>
    </div>
  );
});

export default Chatbox;
