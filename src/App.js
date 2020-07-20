import React, { useEffect, useState } from "react";
import LoginPage from "./components/login";
import { withFirebase } from "./components/firebase";
import { withRouter, Switch, Route } from "react-router-dom";
import * as ROUTES from "./utils/routes";
import MainPage from "./components/main";
import SignupPage from "./components/signup";
import { Paper } from "@material-ui/core";

function App(props) {
  return (
    <Paper>
      <Switch>
        <Route path={ROUTES.MAIN} component={MainPage} exact />
        <Route path={ROUTES.SIGN_IN} component={LoginPage} exact />
        <Route path={ROUTES.SIGN_UP} component={SignupPage} exact />
      </Switch>
    </Paper>
  );
}

export default App;
