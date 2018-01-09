import usersStore from "../stores/UsersStore";
import { firebaseConfig } from "./config";

export const stores = {
  usersStore
};

export function initializeStores() {
  if (!firebaseConfig) {
    throw "Firebase must be configured before initializing Combust stores";
    return;
  }

  //todo create onInit system for stores
  usersStore.listenToUser();

  for (let storeName in stores) {
    const store = stores[storeName];
    store.subscribeToEvents && store.subscribeToEvents();
  }
}
