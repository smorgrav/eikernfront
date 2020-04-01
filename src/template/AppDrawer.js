import React, { useContext, useState } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

const DrawerContext = React.createContext();

const DrawerProvider = ({ children }) => {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (side) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState((prevState) => {
      return { ...prevState, [side]: !prevState[side] };
    });
  };

  return (
    <DrawerContext.Provider value={{ ...state, toggleDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};

const AppDrawer = ({ anchor, children }) => {
  const drawerState = useContext(DrawerContext);

  return (
    <SwipeableDrawer
      anchor={anchor}
      open={drawerState[anchor]}
      onClose={drawerState.toggleDrawer(anchor, false)}
      onOpen={drawerState.toggleDrawer(anchor, true)}
    >
      {children}
    </SwipeableDrawer>
  );
};

export { AppDrawer, DrawerProvider, DrawerContext };
