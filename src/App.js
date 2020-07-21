import React from "react";
import LoginPage from "./components/login";
import { Switch, Route } from "react-router-dom";
import * as ROUTES from "./utils/routes";
import MainPage from "./components/main";
import SignupPage from "./components/signup";
import { Paper } from "@material-ui/core";
import WebPage from "./components/web";

function App(props) {
  return (
    <Paper style={{ minHeight: "100vh" }}>
      <Switch>
        <Route path={ROUTES.MAIN} component={MainPage} exact />
        <Route path={ROUTES.SIGN_IN} component={LoginPage} exact />
        <Route path={ROUTES.SIGN_UP} component={SignupPage} exact />
        <Route path={ROUTES.WEB} component={WebPage} exact />
      </Switch>
    </Paper>
  );
}

export default App;
