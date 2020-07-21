import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import MoreVertIcon from "@material-ui/icons/MoreVert";

import { withFirebase } from "../firebase";

import {
  AppBar,
  Typography,
  Toolbar,
  Grid,
  Button,
  Avatar,
  IconButton,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";

import * as ROUTES from "../../utils/routes";

import { connect } from "react-redux";

const useStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  typo: {
    flex: 1,
  },
}));

const MyAppBar = ({ branding, history, authUser, firebase }) => {
  const classes = useStyle();

  const handleLogin = (e) => {
    history.push(ROUTES.SIGN_IN);
  };

  const handleSignup = (e) => {
    history.push(ROUTES.SIGN_UP);
  };

  const handleLogout = () => {
    firebase.doSignOut();
  };

  const handleWebClick = () => {
    history.push(ROUTES.WEB);
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

          {authUser ? (
            <Grid
              item
              xs={3}
              container
              direction="row-reverse"
              alignItems="center"
            >
              <IconButton>
                <MoreVertIcon fontSize="large" style={{ color: "#fff" }} />
              </IconButton>
              <Avatar src={authUser.image} />
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
              <Button color="inherit" onClick={handleWebClick}>
                Web
              </Button>
            </Grid>
          ) : (
            <Grid item xs={3} container direction="row-reverse">
              <Button color="inherit" onClick={handleLogin}>
                Login
              </Button>
              <Button color="inherit" onClick={handleSignup}>
                Signup
              </Button>
            </Grid>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(withRouter(withFirebase(MyAppBar)));
