import firebase from 'firebase/app';
import '@firebase/auth';
import '@firebase/firestore';
import config from './config';

const firebaseApp = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  const auth = firebase.auth();
  const users = firebase.firestore().collection('users');
  const contents = firebase.firestore().collection('contents');
  return [auth, users, contents];
};

export default firebaseApp;
