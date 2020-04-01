import * as React from "react";
import { useState } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core";

const themeProvider = createMuiTheme({
  palette: {
    primary: {
      light: "#becdd4",
      main: "#2874a0",
      dark: "#3d526b",
    },
    secondary: {
      light: "#eeeeee",
      main: "#eaeff1",
      dark: "#888888",
    },
    background: {
      default: "#f0f0f0",
      paper: "#f0f0f0",
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

const defaultTheme = createMuiTheme({
  palette: {
    primary: {
      light: "#becdd4",
      main: "#2874a0",
      dark: "#3d526b",
    },
    secondary: {
      light: "#eeeeee",
      main: "#eaeff1",
      dark: "#888888",
    },
    background: {
      default: "#f04429",
      paper: "#f0f0f0",
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

const altTheme = {
  ...themeProvider,
  overrides: {
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: "#404854",
      },
    },
  },
};

const ThemeContext = React.createContext(defaultTheme);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(defaultTheme);

  const toggle = () => {
    setTheme((oldTheme) =>
      oldTheme === defaultTheme ? altTheme : defaultTheme
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
