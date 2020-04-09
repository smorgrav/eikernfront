import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useContext } from "react";
import { DrawerContext } from "src/template/AppDrawer";
import logo from "src/assets/logo.png";
import { signOut } from "src/firebase/FirebaseProvider";
import { UserContext } from "src/firebase/UserProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const AppToolbar = () => {
  const classes = useStyles();
  const { authenticated } = useContext(UserContext);
  const { toggleDrawer } = useContext(DrawerContext);

  if (!authenticated) return null;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={toggleDrawer("left")}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon style={{ fontSize: "35px" }} />
          </IconButton>
          <img
            src={logo}
            height="35px"
            style={{ marginRight: "10px" }}
            alt="Logo"
          />
          <div
            style={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "row-reverse",
            }}
          >
            <Button
              style={{ fontSize: "16px" }}
              color="inherit"
              onClick={signOut}
            >
              Sign out
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export { AppToolbar };
