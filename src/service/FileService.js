import firebase from "firebase";

export const uploadDocument = (file, path, callback) => {
  const pushId = firebase
    .database()
    .ref()
    .push().key;

  let docRef;
  try { //not yet configured
    docRef = firebase.storage().ref(`${path}/${pushId}`);
  } catch (err) {
    return callback(err);
  }

  docRef
    .put(file)
    .then(snapshot => {
      const response = {
        url: snapshot.downloadURL,
        id: pushId
      };
      callback(null, response);
    })
    .catch(err => {
      callback(err);
    });
};
