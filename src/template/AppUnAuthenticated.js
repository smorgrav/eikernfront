import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { FirebaseContext } from "src/firebase/FirebaseProvider";
import { AdminPage } from "src/pages/admin/AdminPage";
import { LandingPage } from "src/pages/LandingPage";

const AppUnauthenticated = () => {
  const { loading } = useContext(FirebaseContext);

  if (loading) return <LandingPage />;

  return (
    <Switch>
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route exact path="/admin">
        <AdminPage />
      </Route>
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

export { AppUnauthenticated };
