import React, { useContext, useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { DrawerContext } from "src/template/AppDrawer";
import { ThemeContext } from "src/template/ThemeProvider";
import {
  FirebaseContext,
  sendInvite,
  signOut,
} from "src/firebase/FirebaseProvider";
import { UrlQueryAuto } from "../template/UrlQueryAuto";
import { useCollection } from "react-firebase-hooks/firestore";
import Box from "@material-ui/core/Box";
import {
  infoMessage,
  successMessage,
  warningMessage,
} from "src/template/Notifications";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthDialog } from "../firebase/AuthDialog";

const LandingPage = () => {
  const firebase = useContext(FirebaseContext);
  const drawer = useContext(DrawerContext);
  const theme = useContext(ThemeContext);
  const [show, setShow] = useState("na");
  const [value, loading, error] = useCollection(
    firebase.firestore.collection("test")
  );
  const { t } = useTranslation();

  const addDoc = () => {
    firebase.firestore
      .collection("test")
      .doc("2")
      .set({
        name: "Number Two",
        title: "Captain",
      })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  return (
    <>
      <Container maxWidth="sm" style={{ textAlign: "center" }}>
        <h2>
          {t("Welcome")}{" "}
          {firebase.user ? firebase.user.displayName : t("Stranger") + "!"}
        </h2>
        <UrlQueryAuto
          autoOptions={["Hard rock", "Jazz"]}
          label={"search"}
          placeholder={"E.g artist~adele"}
        />
        <Paper>
          <Grid container spacing={3}>
            <Grid item xs>
              <Button
                onClick={() => {
                  setShow("signin");
                }}
              >
                Sign in
              </Button>
            </Grid>
            <Grid item xs>
              <Button onClick={() => signOut()}>Sign out</Button>
            </Grid>
            <Grid item xs>
              <Button onClick={() => setShow("rest")}>Reset password</Button>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs>
              <Button onClick={() => setShow("link")}>Link Account</Button>
            </Grid>
            <Grid item xs>
              <Button onClick={() => sendInvite("isak@smorgrav.org")}>
                Invite isak
              </Button>
            </Grid>
            <Grid item xs>
              <Link to={"/something"}>Navigate</Link>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs>
              <Button onClick={drawer.toggleDrawer("left")}>
                Toggle left drawer
              </Button>
            </Grid>
            <Grid item xs>
              <Button onClick={drawer.toggleDrawer("right")}>
                Toggle right drawer
              </Button>
            </Grid>
            <Grid item xs>
              <Button onClick={() => theme.toggle()}>Toggle theme</Button>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs>
              <Button
                onClick={() => {
                  successMessage("You won!");
                }}
              >
                Success message
              </Button>
            </Grid>
            <Grid item xs>
              <Button
                onClick={() => {
                  warningMessage("Watch out");
                }}
              >
                Warning message
              </Button>
            </Grid>
            <Grid item xs>
              <Button
                onClick={() => {
                  infoMessage("Climate change is real");
                }}
              >
                Info message
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs>
              <Button onClick={addDoc}>Add Document</Button>
            </Grid>
            <Grid item xs>
              <Button onClick={() => sendInvite("isak@smorgrav.org")}>
                Invite isak
              </Button>
            </Grid>
            <Grid item xs>
              <Link to={"/something"}>Navigate </Link>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      <Box mt={5}>
        <Container maxWidth="sm" style={{ textAlign: "center" }}>
          {error && <strong>Error: {JSON.stringify(error)}</strong>}
          {loading && <span>Collection: Loading...</span>}
          {value && (
            <span>
              Collection:{" "}
              {value.docs.map((doc) => (
                <React.Fragment key={doc.id}>
                  {JSON.stringify(doc.data())},{" "}
                </React.Fragment>
              ))}
            </span>
          )}
          {show !== "na" ? (
            <AuthDialog close={() => setShow("na")} orgIntent={show} />
          ) : null}
        </Container>
      </Box>
    </>
  );
};

export { LandingPage };
