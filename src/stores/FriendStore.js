import { observable, computed } from "mobx";
import friendService from "../service/FriendService";

//DEPENDENCIES
import userStore from "./UserStore";

class FriendStore {
  subscribeToEvents() {
    //must be inline functions, or use .bind(this)
    userStore.onLogin(this.getFriendsForUser.bind(this));
    userStore.onLogout(this.onUserLogout.bind(this));
  }

  @observable friendsMap = new Map();
  usersLoaded = false;
  getFriendsForUser(user) {
    if (this.usersLoaded) {
      return;
    }
    friendService.listenToFriends(user.id, (err, friend) => {
      err ? console.log(err) : this.friendsMap.set(friend.id, friend);
    });
    this.usersLoaded = true;
  }

  isFriend(userId) {
    return this.friendsMap.has(userId);
  }

  getFriend(userId) {
    return this.friendsMap.get(userId);
  }

  loadFriends(friendIds) {
    friendService.loadAndListenToFriends(friendIds, (err, friend) => {
      err ? console.log(err) : this.users.set(friend.id, friend);
    });
  }

  addFriend(userId) {
    friendService.addFriend(userId);
  }

  @computed
  get friends() {
    return this.friendsMap.toJS();
  }

  onFriendClickedTriggers = [];
  onFriendClicked = func => {
    this.onFriendClickedTriggers.push(func);
  };

  handleFriendClick(friend) {
    this.onFriendClickedTriggers.length > 0
      ? this.onFriendClickedTriggers.forEach(event => {
          event(friend);
        })
      : alert(
          "Friend clicked, add the chat module or create your own handler.\n\nie: \nfriendStore.onFriendClicked(friend =>{\n\talert('do stuff'))\n}"
        );

    //if chat enabled -> open chat
    //else if profiles -> open profile
  }

  onUserLogout(user) {
    this.friendsMap.clear();
    this.usersLoaded = false;
  }
}

const friendStore = new FriendStore();
export default friendStore;
