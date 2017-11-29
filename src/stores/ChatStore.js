import { observable, action } from "mobx";
import chatService from "../service/ChatService";
import userStore from "./UserStore";
import friendStore from "./FriendStore";

//DEPENDENCIES: Users, Friends

class ChatStore {
  subscribeToEvents() {
    //must be inline functions, or use .bind(this)
    userStore.onLogin(this.loadConversationsForUser.bind(this));
  }

  @observable openConversationIds = [];
  @observable conversationMap = new Map();
  @observable messagesByConversation = new Map();
  @observable messageMap = new Map();

  @action
  loadMessagesForConversation(convoId, predefinedMessages) {
    if (this.messagesByConversation.get(convoId)) {
      //redundant call
      debugger;
      return;
    }

    this.messagesByConversation.set(convoId, {});
    this.listenToConversation(convoId);
    chatService.listenForNewMessages(convoId, msg => {
      let messages = this.messagesByConversation.get(convoId);
      messages[msg.id] = msg;
      this.messagesByConversation.set(convoId);
    });
  }

  @action
  loadConversationsForUser = user => {
    chatService.listenToUsersConversationIds(user.id, (err, convoId) => {
      err ? console.log(err) : this.listenToConversation(convoId);
    });
  };

  @action
  listenToConversation = cid => {
    chatService.listenToConversation(cid, convo => {
      this.conversationMap.set(cid, convo);
    });
  };

  @action
  findExistingConversationWithUser(friendId) {
    let conversation = null;
    this.conversationMap.forEach(convo => {
      if (convo.participants) {
        const participants = Object.keys(convo.participants);
        if (participants.length === 2 && participants.includes(friendId)) {
          conversation = convo;
        }
      }
    });
    return conversation;
  }

  openConversationWithUser(friendId) {
    const existingConvo = this.findExistingConversationWithUser(friendId);
    if (existingConvo) {
      this.markConvoAsOpen(existingConvo.id);
      this.loadMessagesForConversation(existingConvo.id);
    } else {
      chatService.createConversation(
        [friendId, userStore.userId],
        (err, convoId) => {
          this.markConvoAsOpen(convoId);
          this.loadMessagesForConversation(convoId);
        }
      );
    }
  }

  markConvoAsOpen(convoId) {
    if (!this.openConversationIds.includes(convoId)) {
      this.openConversationIds.push(convoId);
    } else {
      //redudant call for some reason..
      debugger;
    }
  }

  markConvoAsClosed(convoId) {
    let i = this.openConversationIds.findIndex(iteratorId => {
      return convoId === iteratorId;
    });
    debugger;
    i >= 0 && this.openConversationIds.splice(i, 1);
  }

  getConversation(convoId) {
    this.conversationMap.get(convoId);
  }

  getMessages(convoId) {
    let messages = [];
    let msgsObj = this.messagesByConversation.get(convoId);
    msgsObj &&
      Object.keys(msgsObj).forEach(msgId => {
        messages.push(msgsObj[msgId]);
      });
    return messages;

    //   return this.messagesByConversation.get()
    // let convo = this.conversationMap.get(convoId);
    // return convo && convo.messages
    //   ? Object.keys(convo.messages).map(msgId => {
    //       return this.messageMap.get(msgId);
    //     })
    //   : [];
  }

  getConvoTitle(convoId) {
    let currentConvo = this.conversationMap.get(convoId);
    if (!currentConvo) {
      return "Chat";
    }
    let friendsInChat = [];
    debugger;
    for (let uid in currentConvo.participants) {
      if (uid !== userStore.userId) {
        friendsInChat.push(friendStore.getFriend(uid));
      }
    }
    let title = "";
    friendsInChat.forEach((f, i) => {
      title += f.email + (i < friendsInChat.length - 1 ? "," : "");
    });
    return title;
  }
}

const chatStore = new ChatStore();

export default chatStore;
