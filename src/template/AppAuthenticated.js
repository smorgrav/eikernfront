import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { FirebaseContext } from "src/firebase/FirebaseProvider";
import { LandingPage } from "src/pages/LandingPage";
import { Http404Page } from "src/template/Errors";

const AppAuthenticated = () => {
  const { authenticated } = useContext(FirebaseContext);

  if (!authenticated) return null;

  return (
    <>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="*">
          <Http404Page />
        </Route>
      </Switch>
    </>
  );
};

export { AppAuthenticated };
