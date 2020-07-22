import React, { useState } from "react";
import * as EmailValidator from "email-validator";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../firebase";
import { SIGN_UP, MAIN } from "../../utils/routes";

import {
  Grid,
  Card,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Avatar,
  Divider,
  IconButton,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { orange, blue, red } from "@material-ui/core/colors";
import {
  EmailRounded,
  LockRounded,
  Facebook,
  GTranslateRounded,
} from "@material-ui/icons";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100vh",
    overflow: "hidden",
  },
  card: {
    backgroundColor: orange[500],
    padding: 20,
  },

  inputContainer: {
    backgroundColor: "#fff",
    padding: 10,
    marginTop: 20,
  },
  textField: {
    padding: 10,
    marginTop: 10,
  },
  blue: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
  },
  red: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
  },
}));

const initialErrorState = { error: false, message: "", fieldId: 0 };

const LoginPage = (props) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [err, setErr] = useState(initialErrorState);
  const classes = useStyle();

  const handleLogin = (e) => {
    if (user.email === "") {
      setErr({
        error: true,
        message: "Empty Field is not Allowed",
        fieldId: 1,
      });
    } else if (!EmailValidator.validate(user.email)) {
      setErr({
        error: true,
        message: "Please Enter a Valid Email Address",
        fieldId: 1,
      });
    } else if (user.password.length < 8) {
      setErr({
        error: true,
        message: "Password should atleast 8 character long",
        fieldId: 2,
      });
    } else {
      console.log("Called Else");
      setErr({ error: false, message: "", fieldId: 0 });

      props.firebase
        .doSignInWithEmailAndPassword(user.email, user.password)
        .then((user) => props.history.push(MAIN))
        .catch((err) => console.log(err));
    }
  };

  const handleChange = (e) => {
    const bUser = { ...user };
    bUser[e.target.name] = e.target.value;
    setUser(bUser);
  };

  const handleSignup = (e) => {
    console.log(props);
    props.history.push(SIGN_UP);
  };
  return (
    <Paper>
      <Grid
        className={classes.root}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={6}>
          <Card className={classes.card}>
            <Grid container direction="column">
              <Typography variant="h6" style={{ textAlign: "center" }}>
                Welcome to Construction Manager
              </Typography>

              <Grid item className={classes.inputContainer}>
                <Grid container>
                  <TextField
                    error={err.error && err.fieldId === 1}
                    className={classes.textField}
                    fullWidth
                    variant="outlined"
                    placeholder="Email...."
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailRounded color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    value={user.email}
                    onChange={handleChange}
                    required
                    label={
                      err.error && err.fieldId === 1 ? err.message : "Email"
                    }
                    type="email"
                    name="email"
                  />
                  <TextField
                    error={err.error && err.fieldId === 2}
                    required
                    label={
                      err.error && err.fieldId === 2 ? err.message : "Password"
                    }
                    type="password"
                    name="password"
                    variant="outlined"
                    className={classes.textField}
                    fullWidth
                    placeholder="Password...."
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockRounded color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    value={user.password}
                    onChange={handleChange}
                  />

                  <Button
                    color="secondary"
                    variant="outlined"
                    fullWidth
                    style={{ margin: 10 }}
                    onClick={handleLogin}
                  >
                    Login
                  </Button>

                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Typography>Don't have an account??</Typography>
                    <Button color="secondary" onClick={handleSignup}>
                      Signup
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Divider />

              <Grid
                container
                direction="column"
                style={{ padding: 10, backgroundColor: "#fff" }}
              >
                <Typography style={{ textAlign: "center" }} color="primary">
                  SOCIAL MEDIA LOGIN
                </Typography>

                <Grid container direction="row" justify="center">
                  <IconButton size="medium">
                    <Facebook color="primary" />
                  </IconButton>

                  <IconButton size="medium"></IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default withRouter(withFirebase(LoginPage));
