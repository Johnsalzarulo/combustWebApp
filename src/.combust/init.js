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

  for (let storeName in stores) {
    const store = stores[storeName];
    store.init && store.init();
    //TODO: refactor subscribeToEvents to init() in modules
    store.subscribeToEvents && store.subscribeToEvents();
  }
}
