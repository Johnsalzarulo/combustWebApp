import { observable, computed } from "mobx";
import usersService from "../service/UsersService";
//DEPENDENCIES - none

class UsersStore {
  clientUserEstablished = false;

  @observable userId = null;
  @observable usersMap = new Map();

  @observable privateInfo = null; //only reads/writes by user
  @observable serverInfo = null; //only user reads, only server writes

  onLoginTriggers = [];
  onLogoutTriggers = [];
  onLogin = func => {
    this.onLoginTriggers.push(func);
  };
  onLogout = func => {
    this.onLogoutTriggers.push(func);
  };

  listenToUser() {
    usersService.listenForUserChanges((err, userData) => {
      if (err) {
        debugger;
        return;
      } else if (!userData) {
        //user logged out
        if (this.userId) {
          this.handleUserLogout();
        }
        this.userId = null;
      } else {
        //new data
        let shouldExecEstablished = !this.user && userData.publicInfo;
        this.saveClientUserLocally(userData);
        if (shouldExecEstablished) {
          this.handleUserEstablished();
        }
      }
    });
  }

  @computed
  get user() {
    return this.usersMap.get(this.userId);
  }

  @computed
  get fullUser() {
    return {
      id: this.userId,
      public: this.user,
      private: this.privateInfo,
      server: this.serverInfo
    };
  }

  getUserById(userId) {
    const user = this.usersMap.get(userId);
    if (!user) {
      this.listenToPublicUserData(userId);
    }
    return user;
  }

  listenToPublicUserData(userId) {
    usersService.listenToPublicUserData(userId, (err, user) => {
      this.usersMap.set(userId, user);
    });
  }

  saveUserLocally(userId, user) {
    if (!user) {
      return;
    }
    user.id = userId;
    this.usersMap.set(userId, user);
  }

  logout() {
    usersService.logout(this.user);
  }

  createUser(user, callback) {
    if (!user || !user.email || !user.password) {
      return callback({
        message: "You must provide an email and password"
      });
    }

    usersService.createUser(user, (err, userDataByPrivacy) => {
      if (err) return callback(err);
      this.saveClientUserLocally(userDataByPrivacy);
      callback(err, userDataByPrivacy);
    });
  }

  login(user, callback) {
    usersService.login(user, callback);
  }

  handleUserEstablished() {
    const user = this.fullUser;

    //module hook
    try {
      // friendStore.getFriendsForUser(user);
      this.onLoginTriggers.forEach(event => {
        event(user);
      });
    } catch (err) {
      console.log(err);
    }
  }

  saveClientUserLocally(userDataByPrivacy) {
    const { id, publicInfo, privateInfo, serverInfo } = userDataByPrivacy;
    if (publicInfo) {
      this.usersMap.set(id, publicInfo);
    }
    if (privateInfo) {
      this.privateInfo = privateInfo;
    }
    if (serverInfo) {
      this.serverInfo = serverInfo;
    }
    this.userId = id;
  }

  searchFromLocalUsersByField(field, query) {
    let results = [];
    this.usersMap.entries().forEach(([uid, user]) => {
      if (
        user &&
        typeof user[field] === "string" &&
        user[field].toUpperCase().includes(query.toUpperCase())
      ) {
        results.push(user);
      }
    });
    return results;
  }

  handleUserLogout() {
    //module hook
    const user = this.fullUser;

    try {
      this.onLogoutTriggers.forEach(event => {
        event(user);
      });
    } catch (err) {
      debugger;
    }
  }
}

const usersStore = new UsersStore();
export default usersStore;
