import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { UserProviderWrapper } from "./context/app.context";
import { OrganisationWrapper } from "./context/organisation.context";
import { FetchingUserWrapper } from "./context/fetchingUser.context";
import { MyOrgaWrapper } from "./context/myOrga.context";
import { ProjectWrapper } from "./context/project.context";
import { LandingWrapper } from "./context/landing.context";
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
              <MyOrgaWrapper>
                <LandingWrapper>
                  <ProjectWrapper>
                    <CssBaseline />
                    <App />
                  </ProjectWrapper>
                </LandingWrapper>
              </MyOrgaWrapper>
            </OrganisationWrapper>
          </FetchingUserWrapper>
        </UserProviderWrapper>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
