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

  @observable friendIdsMap = new Map();

  usersLoaded = false;
  getFriendsForUser(user) {
    if (this.usersLoaded) {
      return;
    }
    friendService.listenToFriends(user.id, (err, friend) => {
      debugger;
      err ? console.log(err) : this.storeFriend(friend.id, friend);
    });
    this.usersLoaded = true;
  }

  storeFriend(friendId, friend) {
    userStore.saveUserLocally(friendId, friend);
    this.friendIdsMap.set(friendId, true);
  }

  isFriend(userId) {
    return this.getFriend(userId) ? true : false;
  }

  getFriend(userId) {
    return userStore.getUserById(userId);
  }

  addFriend(userIdOfFriend) {
    friendService.addFriend(userIdOfFriend, userStore.userId);
  }

  @computed
  get friends() {
    let friends = {};
    Array.from(this.friendIdsMap.keys()).forEach(uid => {
      debugger;
      friends[uid] = userStore.getUserById(uid);
    });
    debugger;
    return friends;
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
    this.friendIdsMap.clear();
    this.usersLoaded = false;
  }
}

const friendStore = new FriendStore();
export default friendStore;
