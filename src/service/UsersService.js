import firebase from "firebase";

class UsersService {
  createUser(user, callback) {
    if (!user || !user.email || !user.password) {
      throw new Error(
        `UserService.create(): requires a user object with an email && password`
      );
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(res => {
        let userDataByPrivacy = {
          publicInfo: this.getPublicUserObject(user.email),
          privateInfo: this.getPrivateUserObject(),
          serverInfo: this.getServerUserObject()
        };

        this.saveToUsersCollection(res.uid, userDataByPrivacy);
        userDataByPrivacy.id = res.uid;
        return callback(null, userDataByPrivacy);
      })
      .catch(error => {
        callback(error);
        console.log(error.message);
      });
  }

  saveToUsersCollection(uid, userDataByPrivacy) {
    if (!uid) {
      return;
    }
    ["publicInfo", "privateInfo", "serverInfo"].forEach(privacy => {
      const data = userDataByPrivacy[privacy];
      if (data) {
        firebase
          .database()
          .ref("/users/" + privacy)
          .child(uid)
          .update(data);
      }
    });
  }

  getPublicUserObject(email) {
    return {
      //globally readable, user-writeable
      email: email,
      isOnline: true,
      iconUrl: this.getRandomProfilePic()
    };
  }
  getPrivateUserObject() {
    return {
      //user-only-readable, user-writeable
      conversations: {},
      friends: {},
      notificationToken: null,
      notificationsEnabled: true
    };
  }
  getServerUserObject() {
    return {
      //user-only-readable, server-only writeable
      walletBalance: 0,
      isAdmin: false
    };
  }

  getHttpToken() {
    return firebase.auth().currentUser.getToken(/* forceRefresh */ true);
  }

  listenForUserChanges(callback) {
    const that = this;
    let db = firebase.database();
    firebase.auth().onAuthStateChanged(userAuth => {
      console.log("authStateChange, user:", userAuth);
      if (userAuth) {
        let userRef = db.ref("users/publicInfo/" + userAuth.uid);
        userRef.once("value").then(snap => {
          let userData = snap.val();
          if (userData) {
            userRef.child("lastOnline").update(new Date());
            that.listenToUser(userAuth.uid, (err, data) => {
              if (err) return callback(err);
              data.id = userAuth.uid;
              callback(null, data);
            });
          }
        });
      } else {
        callback(null, null);
      }
    });
  }

  listenToUser(uid, callback) {
    if (!uid) {
      throw new Error("no uid provided to listenToUser()");
    }
    ["publicInfo", "privateInfo", "serverInfo"].forEach(privacy => {
      firebase
        .database()
        .ref("users")
        .child(privacy)
        .child(uid)
        .on("value", snap => {
          let userData = snap.val();
          if (!userData) {
            callback("No user data found");
          } else {
            userData.id = uid;
          }
          callback(null, {
            id: uid,
            [privacy]: userData
          });
        });
    });

    this.monitorOnlineStatus();
  }

  listenToPublicUserData(userId, callback) {
    firebase
      .database()
      .ref("users/publicInfo/" + userId)
      .on("value", snapshot => {
        let friend = snapshot.val();
        if (!friend) {
          return callback(null, null);
        }
        friend.id = userId;
        callback(null, friend);
      });
  }

  login(user, callback) {
    let auth = firebase.auth();
    let db = firebase.database();
    auth.signInWithEmailAndPassword(user.email, user.password).then(
      res => {
        callback(null, res);
        db
          .ref("users/publicInfo")
          .child(res.uid)
          .update({
            isOnline: true
          });
      },
      err => {
        callback(err);
      }
    );
    this.monitorOnlineStatus();
  }

  logout(user) {
    let auth = firebase.auth();
    if (!auth.currentUser) {
      return;
    }

    if (!user) {
      throw new Error("No user provided to logout");
    }
    firebase
      .database()
      .ref("users/publicInfo")
      .child(user.id)
      .update({ isOnline: false });
    auth.signOut();
  }

  monitorOnlineStatus() {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser || !currentUser.uid) {
      return;
    }
    const uid = currentUser.uid;
    let amOnline = firebase.database().ref("/.info/connected");
    let userRef = firebase
      .database()
      .ref("/users/publicInfo/" + uid + "/isOnline");
    amOnline.on("value", snapshot => {
      if (snapshot.val()) {
        userRef.onDisconnect().set(false);
        userRef.set(true);
      }
    });
    userRef.on("value", snapshot => {
      window.setTimeout(() => {
        if (firebase.auth().currentUser) {
          userRef.set(true);
        }
      }, 2000);
    });
  }

  getRandomProfilePic() {
    const profilePics = [
      "https://firebasestorage.googleapis.com/v0/b/textable-92f65.appspot.com/o/dog1.jpeg?alt=media&token=320085e5-59a5-445e-a146-5411980e7a56",
      "https://firebasestorage.googleapis.com/v0/b/textable-92f65.appspot.com/o/dog2.jpeg?alt=media&token=54717b55-bbad-459e-8fb4-2dbf9caf76dd",
      "https://firebasestorage.googleapis.com/v0/b/textable-92f65.appspot.com/o/dog3.jpeg?alt=media&token=283db004-83d8-4857-84b4-7b0a61dc172f",
      "https://firebasestorage.googleapis.com/v0/b/textable-92f65.appspot.com/o/dog5.jpeg?alt=media&token=f3ce9b3d-34de-4124-aed2-67354220b9aa",
      "https://firebasestorage.googleapis.com/v0/b/textable-92f65.appspot.com/o/dog4.jpeg?alt=media&token=c7504834-c5e3-4081-8177-f013d8683f8d"
    ];

    return profilePics[Math.floor(Math.random() * profilePics.length)];
  }
}

const usersService = new UsersService();
export default usersService;
