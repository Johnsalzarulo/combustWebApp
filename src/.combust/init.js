import usersStore from "../stores/UsersStore";

export const stores = {
  usersStore
};

export function initializeStores() {
  for (let storeName in stores) {
    const store = stores[storeName];
    store.subscribeToEvents && store.subscribeToEvents();
  }
}
