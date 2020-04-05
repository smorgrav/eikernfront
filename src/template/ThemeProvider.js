import * as React from "react";
import { useState } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core";

const defaultTheme = createMuiTheme({
  overrides: {
    MuiFilledInput: {
      root: {
        // Some CSS
        backgroundColor: "primary",
      },
    },
  },
});

const ThemeContext = React.createContext(defaultTheme);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(defaultTheme);

  return (
    <ThemeContext.Provider value={{ theme }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
