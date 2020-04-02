const mockAuth = (locationSearch) => {
  const mockUser = {
    uid: "user1",
    displayName: "User 1",
  };

  let subscribers = [];
  let currentUser = locationSearch?.includes("user1") ? mockUser : null;

  const notifySubscribers = (subscribers, currentUser) => {
    console.log("Notify subscribers with user %o", currentUser);
    subscribers.forEach((subscriber) => subscriber(currentUser));
  };

  return {
    subscribers: subscribers,
    currentUser: currentUser,
    isSignInWithEmailLink: () => {
      return false;
    },
    signInWithEmailAndPassword: async () => {
      console.log("Logging in to mock");
      currentUser = mockUser;
      notifySubscribers(subscribers, currentUser);
      return Promise.resolve(true);
    },
    onAuthStateChanged: (subscriber) => {
      const len = subscribers.push(subscriber);
      console.log(
        "Added subscriber to auth changes %o - current user is: %o",
        subscriber,
        currentUser
      );
      subscriber(currentUser);
      return () =>
        (subscribers = subscribers.filter((val, index) => index !== len - 1));
    },
    signOut: () => {
      console.log("Logging out from mock");
      currentUser = null;
      subscribers = [];
      return Promise.resolve();
    },
    signIn: () => {
      console.log("Logging in to mock");
      currentUser = mockUser;
      notifySubscribers(subscribers, currentUser);
    },
  };
};

export { mockAuth };
