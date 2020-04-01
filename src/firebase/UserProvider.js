import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "src/firebase/FirebaseProvider";
import { useBingo } from "src/template/useBingo";

const UserContext = React.createContext(null);
const queries = { cameras: {}, groups: {} };

const emptyUserData = () => {
  return { userInfo: {} };
};

const subPrivate = (setUserData, database, uid, addTiles, checkTile) => {
  if (!queries.private) {
    addTiles("privateInfo");
    console.log("Get private data for: %o", uid);
    const query = database.ref("private").child(uid);
    queries.private = query;
    query.on("value", (snapshot) => {
      if (snapshot.val()) {
        console.log("Update private data for: %o", uid);
        setUserData((userData) => {
          return { ...userData, privateInfo: snapshot.val() };
        });
      }
      checkTile("privateInfo");
    });
  } else {
    console.log("Already subscribing to private data");
  }
};

const UserProvider = ({ children }) => {
  const { user, database, authenticated } = useContext(FirebaseContext);
  const [userData, setUserData] = useState(emptyUserData());
  const [bingo, { checkTile, addTiles }] = useBingo(5000);

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
