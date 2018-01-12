import firebase from "firebase";

export const uploadDocument = (file, path, callback) => {
  const pushId = firebase
    .database()
    .ref()
    .push().key;

  const docRef = firebase.storage().ref(`${path}/${pushId}`);

  docRef.put(file).then(snapshot => {
    const response = {
      url: snapshot.downloadURL,
      id: pushId
    };
    callback(null, response);
  });
};
