import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  linkWithEmail,
  resetPassword,
  signInEmail,
  signUpEmail,
} from "src/firebase/FirebaseProvider";
import TextField from "@material-ui/core/TextField/TextField";
import Box from "@material-ui/core/Box/Box";
import Button from "@material-ui/core/Button/Button";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

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

const EmailForm = ({ mode, action, close }) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation();

  const actionFunction = () => {
    switch (mode) {
      case "signin":
        signInEmail(email, password);
        close();
        break;
      case "reset":
        resetPassword(email);
        close();
        break;
      case "signup":
        signUpEmail(email, name, password);
        close();
        break;
      case "link":
        linkWithEmail(email, password);
        close();
        break;
      default:
        throw Error("Unknown mode: " + mode);
    }
  };

  const buttonText = () => {
    switch (mode) {
      case "link":
        return t("Link");
      case "signin":
        return t("Signin");
      case "reset":
        return t("Reset");
      case "signup":
        return t("Signup");
      default:
        throw Error("Unknown mode: " + mode);
    }
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        label={t("Email")}
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        margin="normal"
      />
      {mode !== "reset" ? (
        <TextField
          label={t("Password")}
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          margin="normal"
        />
      ) : null}
      {mode === "signup" ? (
        <TextField
          label={t("Name")}
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          margin="normal"
        />
      ) : null}
      <Box mt={2} />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={actionFunction}
      >
        {buttonText()}
      </Button>
    </form>
  );
};

export { EmailForm };
