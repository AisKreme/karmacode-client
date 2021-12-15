import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { UserProviderWrapper } from "./context/app.context";
import { OrganisationWrapper } from "./context/organisation.context";
import { FetchingUserWrapper } from "./context/fetchingUser.context";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "./components/utilities/Baseline/darkTheme";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <UserProviderWrapper>
          <FetchingUserWrapper>
            <OrganisationWrapper>
              <CssBaseline />
              <App />
            </OrganisationWrapper>
          </FetchingUserWrapper>
        </UserProviderWrapper>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
