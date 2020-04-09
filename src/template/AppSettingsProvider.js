import React from "react";

const AppSettingsContext = React.createContext(null);

const firebaseConfig = () => {
  const devConfig = {
    apiKey: "AIzaSyC4IXP-FZh1tOed4cjsyED0O3iBYHLMvws",
    authDomain: "eikern.firebaseapp.com",
    databaseURL: "https://eikern.firebaseio.com",
    projectId: "eikern",
    storageBucket: "eikern.appspot.com",
    messagingSenderId: "502019781694",
    appId: "1:502019781694:web:d68b7c9df8480eecf08d6f",
    measurementId: "G-DFZK907K08",
  };

  const localConfig = {
    projectId: "eikern",
  };

  return process.env.REACT_APP_BACKEND === "local" ? localConfig : devConfig;
};

const AppSettingsProvider = ({ children }) => {
  return (
    <AppSettingsContext.Provider
      value={{
        firebaseConfig: firebaseConfig(),
      }}
    >
      {children}
    </AppSettingsContext.Provider>
  );
};

export { AppSettingsContext, AppSettingsProvider, firebaseConfig };
