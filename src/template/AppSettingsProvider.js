import React, { useContext, useEffect, useState } from "react";

const AppSettingsContext = React.createContext(null);

const firebaseConfig = () => {
  const devConfig = {
    apiKey: "AIzaSyDczNc4Cyo8W5n7rFpcbA0NI0mR3vWZrks",
    authDomain: "playchat-e1a51.firebaseapp.com",
    databaseURL: "https://playchat-e1a51.firebaseio.com",
    projectId: "playchat-e1a51",
    storageBucket: "playchat-e1a51.appspot.com",
    messagingSenderId: "534812422817",
    appId: "1:534812422817:web:4ddcf672b8b15d3ffef6e0",
  };

  const localConfig = {
    databaseURL: "http://localhost:9000?ns=playchat-e1a51",
  };

  return process.env.REACT_APP_BACKEND === "local" ? localConfig : devConfig;
};

const endpoint = () => {
  return process.env.REACT_APP_BACKEND === "dev"
    ? "playchat-e1a51.appspot.com"
    : "test.endpoint";
};

const AppSettingsProvider = ({ children }) => {
  return (
    <AppSettingsContext.Provider
      value={{
        firebaseConfig: firebaseConfig(),
        endpoint: endpoint(),
      }}
    >
      {children}
    </AppSettingsContext.Provider>
  );
};

export { AppSettingsContext, AppSettingsProvider, firebaseConfig };
