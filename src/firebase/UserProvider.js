import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "src/firebase/FirebaseProvider";
import { useBingo } from "src/template/useBingo";

const UserContext = React.createContext(null);

const emptyUserData = () => {
  return { userInfo: {} };
};

const UserProvider = ({ children }) => {
  const { user, authenticated } = useContext(FirebaseContext);
  const [userData, setUserData] = useState(emptyUserData());
  const [bingo] = useBingo(5000);

  const loading = !bingo;

  useEffect(() => {
    if (user) {
      console.log("Subscribe to user data");
    } else {
      setUserData(emptyUserData);
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ ...userData, loading, authenticated }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
