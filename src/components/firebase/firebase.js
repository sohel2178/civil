import * as app from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC_WXrWuaakv3PkPvZLhMNLB6oY1CFPAY0",
  authDomain: "conman-82b27.firebaseapp.com",
  databaseURL: "https://conman-82b27.firebaseio.com",
  projectId: "conman-82b27",
  storageBucket: "conman-82b27.appspot.com",
  messagingSenderId: "136336671541",
  appId: "1:136336671541:web:617cc28b02287c1c58c27c",
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.database();
    this.provider = new app.auth.GoogleAuthProvider();
    this.provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

    // this.auth.onAuthStateChanged(user => {
    //   if (user) {
    //     console.log(user, "From Firebase");
    //   } else {
    //     console.log("user is Nulll");
    //   }
    // });

    // app.auth().sendSignInLinkToEmail();

    // app.auth().onAuthStateChanged;
  }

  createUserWithEmailAndPassword = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  };

  auth = () => {
    return this.auth;
  };

  doSignInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  };

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) => {
    return this.auth.currentUser.updatePassword(password);
  };

  currentUser = () => this.auth.currentUser;

  idToken = () => this.auth.currentUser.getIdToken(true);

  googleSignIn = () => this.auth.signInWithPopup(this.provider);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      //   url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
      url: "http://localhost:3000",
    });

  currentUserDevices = (uid) =>
    this.db.ref("devices").orderByChild("uid").equalTo(uid);

  singleDeviceRef = (id) => this.db.ref().child("devices").child(id);
}

export default Firebase;
