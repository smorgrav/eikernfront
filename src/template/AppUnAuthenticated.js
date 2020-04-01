import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { FirebaseContext } from "src/firebase/FirebaseProvider";
import { LandingPage } from "src/pages/LandingPage";

const AppUnauthenticated = () => {
  const { authenticated, loading } = useContext(FirebaseContext);

  if (loading) return <LandingPage />;

  return (
    <Switch>
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

export { AppUnauthenticated };
