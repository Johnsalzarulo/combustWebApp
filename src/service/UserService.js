import firebase from "firebase";

class UserService {
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
        debugger;
        let userObj = {
          public: {
            //globally readable, user-writeable
            email: user.email,
            online: true,
            iconUrl: this.getRandomProfilePic()
          },
          private: {
            //user-only-readable, user-writeable
            conversations: {},
            friends: {},
            notificationToken: null,
            notificationsEnabled: true
          },
          server: {
            //user-only-readable, server-only writes
            walletBalance: 0
          }
        };
        firebase
          .database()
          .ref("/users/" + res.uid)
          .set(userObj);
      })
      .catch(error => {
        let errorMessage = error.message;
        callback(errorMessage);
        console.log(errorMessage);
      });
  }

  getHttpToken() {
    return firebase.auth().currentUser.getToken(/* forceRefresh */ true);
  }

  listenForUserChanges(user, callback) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .database()
          .ref("users")
          .child(user.uid)
          .once("value", snapshot => {
            let data = snapshot.val();
            if (!data) {
              callback(null, null);
              return;
            }
            data.id = user.uid;
            callback(null, data);
          });
      } else {
        callback(null, null);
      }
    });
  }

  loadAndListenToFriends(friends, callback) {
    friends &&
      Object.keys(friends).forEach(friendId => {
        firebase
          .database()
          .ref("users/" + friendId + "/public")
          .on("value", snapshot => {
            let friend = snapshot.val();
            if (!friend) {
              callback(null, null);
            }
            friend.id = friendId;
            callback(null, friend);
          });
      });
  }

  listenToFriend(friendId, callback) {
    firebase
      .database()
      .ref("users/" + friendId + "/public")
      .on("value", snapshot => {
        let friend = snapshot.val();
        if (!friend) {
          callback(null, null);
        }
        friend.id = friendId;
        callback(null, friend);
      });
  }

  addFriend(friendId, uid) {
    let db = firebase.database();
    db.ref("users/" + uid + "/private/friends/" + friendId).set(true);
  }

  removeFriend(friendId, uid) {
    let db = firebase.database();
    db.ref("users/" + uid + "/private/friends/" + friendId).set(null);
  }

  login(user, callback) {
    let auth = firebase.auth();
    let db = firebase.database();
    auth.signInWithEmailAndPassword(user.email, user.password).then(
      res => {
        callback(null, res);
        db
          .ref("users")
          .child(res.uid)
          .child("public")
          .update({
            online: true
          });
      },
      err => {
        callback(err);
      }
    );
  }

  signout(user) {
    let auth = firebase.auth();
    user.online = false;
    this.updateFields(user, false, ["online"]);
    auth.signOut();
  }

  monitorOnlineStatus(user) {
    if (!user || !user.id) {
      return;
    }
    let amOnline = firebase.database().ref("/.info/connected");
    let userRef = firebase
      .database()
      .ref("/users/" + user.id + "/public/online");
    amOnline.on("value", snapshot => {
      if (snapshot.val()) {
        userRef.onDisconnect().set(false);
        userRef.set(true);
      }
    });
    userRef.on("value", snapshot => {
      window.setTimeout(() => {
        userRef.set(true);
      }, 2000);
    });
  }

  updateUser(user) {
    let db = firebase.database();
    db
      .ref("users/")
      .child(user.id)
      .update(user);
  }

  updateFields(user, isPrivate, fields) {
    let currentUser = firebase.auth().currentUser;
    if (!fields || !user || !currentUser) {
      return;
    }
    let subObj = isPrivate ? "private" : "public";
    let db = firebase.database();
    let ref = db.ref("users/" + currentUser.uid + "/" + subObj);

    ref.once(
      "value",
      snapshot => {
        let currentUserOnDb = snapshot.val();
        fields.forEach(field => {
          currentUserOnDb[field] = user[subObj][field];
        });
        ref.update(currentUserOnDb);
      },
      errorObject => {
        console.log(
          "The read in UserServicce.updateFields() failed: " + errorObject.code
        );
      }
    );
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

export let userService = new UserService();
