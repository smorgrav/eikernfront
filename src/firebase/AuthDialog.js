import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import Box from "@material-ui/core/Box/Box";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Hidden from "@material-ui/core/Hidden/Hidden";
import Button from "@material-ui/core/Button/Button";
import { useTranslation } from "react-i18next";
import { ChooseAuthMethod } from "src/firebase/ChooseAuthMethod";
import logo from "../assets/logo.png";
import { EmailForm } from "./EmailForm";
import { linkWithGoogle, signInGoogle } from "src/firebase/FirebaseProvider";

import Typography from "@material-ui/core/Typography";
import capitalize from "@material-ui/core/utils/capitalize";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  logo: {
    margin: "auto",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

/**
 *
 * @param close how to close dialog
 * @param intent sigin, signup or link
 * @return {*}
 * @constructor
 */
const AuthDialog = ({ close, orgIntent }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  // choose (provider), email (signin, reset, link, signup)
  const [mode, setMode] = useState(orgIntent === "rest" ? "email" : "choose");
  const [intent, setIntent] = useState(orgIntent);

  const handleClose = () => {
    close();
    setMode("choose");
  };

  return (
    <Dialog onClose={handleClose} open={true}>
      <DialogTitle id="signin-dialog">
        <Typography>{capitalize(intent)}</Typography>
        <Hidden xsDown>
          <Box mx="10px" className={classes.container}>
            <img alt="logo" src={logo} width="150px" />
          </Box>
        </Hidden>
      </DialogTitle>

      <DialogContent dividers>
        {mode === "choose" ? (
          <ChooseAuthMethod
            onEmail={() => setMode("email")}
            onGoogle={() => {
              handleClose();
              intent === "link" ? linkWithGoogle() : signInGoogle();
            }}
          />
        ) : (
          <EmailForm close={handleClose} mode={intent} />
        )}
      </DialogContent>

      <DialogActions>
        {mode !== "choose" && intent !== "link" ? (
          <>
            <Button
              color="primary"
              className={classes.button}
              onClick={() => setIntent("signup")}
            >
              {t("Signup")}
            </Button>
            <Button
              color="primary"
              className={classes.button}
              onClick={() => setIntent("reset")}
            >
              {t("Rest")}
            </Button>
            <Button
              color="primary"
              className={classes.button}
              onClick={() => {
                setIntent(orgIntent);
                setMode("choose");
              }}
            >
              t('Go back')
            </Button>
          </>
        ) : (
          <Button
            color="primary"
            className={classes.button}
            onClick={handleClose}
          >
            {t("Cancel")}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export { AuthDialog };
