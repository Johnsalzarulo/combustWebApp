import { observable } from "mobx";
import firebase from "firebase";

class WelcomeStore {
  @observable firebaseConfigured = false;
  @observable emailAuthEnabled = false;
  @observable friendsAdded = false;
  @observable projectId = null;
  @observable currentStep = 1;

  isFirebaseConfigured() {
    try {
      firebase.database();
      const projectId = firebase.app().options.projectId;
      this.firebaseConfigured = true;
      this.projectId = projectId;
      this.currentStep = 2;
    } catch (err) {
      this.firebaseConfigured = false;
    }
  }

  isEmailAuthEnabled() {
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          "firesparktests@firespark.com",
          "sparky"
        )
        .then(() => {
          this.emailAuthEnabled = true;
          this.currentStep = 4;
        })
        .catch(error => {
          this.emailAuthEnabled = error.code === "auth/email-already-in-use";
          this.currentStep = this.emailAuthEnabled ? 3 : 2;
        });
    } catch (err) {
      this.emailAuthEnabled = false;
    }
  }
}

const welcomeStore = new WelcomeStore();

export default welcomeStore;
