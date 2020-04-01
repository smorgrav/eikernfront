import CssBaseline from "@material-ui/core/CssBaseline";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { FirebaseProvider } from "src/firebase/FirebaseProvider";
import { UserProvider } from "src/firebase/UserProvider";
import { AppAuthenticated } from "src/template/AppAuthenticated";
import { AppDrawer, DrawerProvider } from "src/template/AppDrawer";
import { AppSettingsProvider } from "src/template/AppSettingsProvider";
import { AppToolbar } from "src/template/AppToolbar";
import { AppUnauthenticated } from "src/template/AppUnAuthenticated";
import { ErrorBoundary } from "src/template/ErrorBoundary";
import { ThemeProvider } from "src/template/ThemeProvider";
import "src/i18n";

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AppSettingsProvider>
          <ThemeProvider>
            <CssBaseline>
              <FirebaseProvider>
                <UserProvider>
                  <DrawerProvider>
                    <AppToolbar />
                    <AppDrawer anchor="left">
                      <h2>Left drawer</h2>
                    </AppDrawer>
                    <AppDrawer anchor="right">
                      <h2>Right drawer</h2>
                    </AppDrawer>
                    <AppAuthenticated />
                    <AppUnauthenticated />
                  </DrawerProvider>
                </UserProvider>
              </FirebaseProvider>
            </CssBaseline>
          </ThemeProvider>
        </AppSettingsProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
