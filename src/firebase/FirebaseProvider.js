/**
 * This module initiates the firebase application and provides a context
 * for easy access to authentication and prime storage methods.
 *
 * There are a couple of reasons for this design
 *
 * 1. One place to initiate firebase
 * 2. One place to mock firebase - easier testing
 * 3. An dead simple pattern to follow
 */
import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { mockAuth } from "src/localbackend/mockAuth";
import { firebaseConfig } from "src/template/AppSettingsProvider";
import {
  errorMessage,
  successMessage,
  warningMessage,
} from "src/template/Notifications";

// Init firebase (TO add prod config - add config file and check on NODE_ENV which one to use here
const app = firebase.initializeApp(firebaseConfig());
const auth =
  process.env.REACT_APP_BACKEND === "local"
    ? mockAuth(window.location.search)
    : firebase.auth();
const firestore = app.firestore();
const storage = app.storage();

if (process.env.NODE_ENV === "local") {
  firestore.settings({
    host: "localhost:8080",
    ssl: false,
  });
}

// The context to to make the promises in the header
const FirebaseContext = React.createContext("");

// Default provider implementation
const FirebaseProvider = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const [inviteProcessed, setInviteProcessed] = useState(false);
  const [hasSignedIn, setHasSignIn] = useState(false);
  const authenticated = !!user;

  // Handle signin link
  if (!inviteProcessed && auth.isSignInWithEmailLink(window.location.href)) {
    signInIfEmailLink();
    setInviteProcessed(true);
  }

  // Setup user data subscriptions on first invocation
  if (user && !hasSignedIn) {
    console.log("First signup");
    setHasSignIn(true);
  }

  // Reset state when logged out
  if (!user && hasSignedIn) {
    setInviteProcessed(false);
    setHasSignIn(false);
  }

  if (error) {
    warningMessage(error);
  }

  return (
    <FirebaseContext.Provider
      value={{
        authenticated,
        user,
        loading,
        storage,
        firestore,
        auth,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

const actionCodeSettings = {
  url: "http://localhost:3000/invite",
  // This must be true.
  handleCodeInApp: true,
};

const signOut = async () => {
  return firebase.auth().signOut();
};

const sendInvite = (email) => {
  firebase
    .auth()
    .sendSignInLinkToEmail(email, actionCodeSettings)
    .then(() => {
      successMessage("Invite successfully sent");
      window.localStorage.setItem("emailForSignIn", email);
    })
    .catch(errorMessage);
};

const signInIfEmailLink = () => {
  console.log("Checking if url is a signin link");
  if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
    let email = window.localStorage.getItem("emailForSignIn");
    if (!email) {
      email = window.prompt("Please provide your email for confirmation");
    }
    firebase
      .auth()
      .signInWithEmailLink(email, window.location.href)
      .then(function (result) {
        window.localStorage.removeItem("emailForSignIn");
        successMessage("Authenticated with link");
      })
      .catch(errorMessage);
  }
};

const linkWithGoogle = () => {
  firebase
    .auth()
    .currentUser.linkWithPopup(new firebase.auth.GoogleAuthProvider())
    .then((result) => {
      successMessage("Account linked to" + result.user.uid);
    })
    .catch(errorMessage);
};

const linkWithEmail = (email, password) => {
  const credential = firebase.auth.EmailAuthProvider.credential(
    email,
    password
  );
  firebase
    .auth()
    .currentUser.linkWithCredential(credential)
    .then((result) => {
      successMessage("Account linked to" + result.user.uid);
    })
    .catch(errorMessage);
};

const signInEmail = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(errorMessage);
};

const signInGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).catch(errorMessage);
};

const resetPassword = (email) => {
  this.auth.sendPasswordResetEmail(email).then(() => {
    successMessage("Reset email sent");
  }, errorMessage);
};

const signUpEmail = (email, name, password) => {
  if (name.length < 4) {
    warningMessage("Name must be more than 3 characters long");
  } else {
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        successMessage("Hello " + user.displayName);
      })
      .catch(errorMessage);
  }
};

const signInCustom = (token) => {
  this.auth.signInWithCustomToken(token).catch(errorMessage);
};

export {
  FirebaseContext,
  FirebaseProvider,
  signOut,
  sendInvite,
  signInCustom,
  signInEmail,
  signInGoogle,
  resetPassword,
  signUpEmail,
  linkWithEmail,
  linkWithGoogle,
};
