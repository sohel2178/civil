import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { AppBar, Typography, Toolbar, Grid, Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";

import * as ROUTES from "../../utils/routes";

const useStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  typo: {
    flex: 1,
  },
}));

const MyAppBar = ({ branding, history }) => {
  const classes = useStyle();

  const handleLogin = (e) => {
    history.push(ROUTES.SIGN_IN);
  };

  const handleSignup = (e) => {
    history.push(ROUTES.SIGN_UP);
  };
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography className={classes.typo}>{branding}</Typography>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={9}>
            <Button color="inherit">About</Button>
            <Button color="inherit">Contact</Button>
            <Button color="inherit">BBB</Button>
          </Grid>

          <Grid item xs={3} container direction="row-reverse">
            <Button color="inherit" onClick={handleLogin}>
              Login
            </Button>
            <Button color="inherit" onClick={handleSignup}>
              Signup
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(MyAppBar);
