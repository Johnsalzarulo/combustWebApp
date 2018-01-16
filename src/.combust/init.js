import userStore from "../stores/UserStore";
import { firebaseConfig } from "./config";

export const stores = {
  userStore
};

export function initializeStores() {
  if (!firebaseConfig) {
    throw "Firebase must be configured before initializing Combust stores";
    return;
  }

  for (let storeName in stores) {
    const store = stores[storeName];
    store.init && store.init();
  }
}
