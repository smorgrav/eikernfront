import React from "react";
import Button from "@material-ui/core/Button/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const ChooseAuthMethod = ({ onEmail, onGoogle }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={onEmail}
      >
        {t("Email")}
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={onGoogle}
      >
        {t("Google")}
      </Button>
    </form>
  );
};

export { ChooseAuthMethod };
