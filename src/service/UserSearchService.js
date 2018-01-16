import firebase from "firebase";
import userStore from "../stores/UserStore";

class UserSearchService {
  loaded = false;
  users = [];

  getUserData = () => {
    this.loaded = true;
    firebase
      .database()
      .ref("users/publicInfo")
      .once("value")
      .then(snap => {
        let userData = snap.val();
        let users = [];
        userData &&
          Object.keys(userData).forEach(uid => {
            let user = userData[uid];
            if (uid === userStore.userId || !user) {
              return;
            }
            user.id = uid;
            users.push(user);
          });
        this.users = users;
      });
  };

  searchByField(query, field) {
    if (!this.loaded) {
      this.getUserData();
    }
    if (!query) {
      return [];
    }
    return this.users.filter(user => {
      return (
        !user[field] || user[field].toUpperCase().includes(query.toUpperCase())
      );
    });
  }
}

const userSearchService = new UserSearchService();

export default userSearchService;
