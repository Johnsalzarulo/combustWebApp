import friendsStore from "../stores/FriendsStore";
import chatStore from "../stores/ChatStore";
import followersStore from "../stores/FollowersStore";
import usersStore from "../stores/UsersStore";

const stores = {
  friendsStore,
  chatStore,
  followersStore
};

export function initializeStores() {
  for (let storeName in stores) {
    const store = stores[storeName];
    store.subscribeToEvents && store.subscribeToEvents();
  }
}
