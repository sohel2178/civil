import React, { useState } from "react";

import * as EmailValidator from "email-validator";
import { withRouter } from "react-router-dom";
import { SIGN_IN, SIGN_UP } from "../../utils/routes";
import { withFirebase } from "../firebase";

import { connect } from "react-redux";
import { registerUser } from "../../actions/user_action";

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
import { EmailRounded, LockRounded, Facebook } from "@material-ui/icons";
import MySnackBar from "../helpers/my_snacbar";

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

const SignupPage = (props) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [err, setErr] = useState({ error: false, message: "", fieldId: 0 });
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });
  const classes = useStyle();

  const handleSignup = (e) => {
    console.log(EmailValidator.validate("sohel.ahmed2178@gmail.com"));
    console.log(user);
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
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((result) => {
          props.firebase.doSendEmailVerification();
          let usr = {
            name: result.user.displayName,
            email: result.user.email,
            image: result.user.photoURL,
            contact: result.user.phoneNumber | "",
          };
          props.registerUser(usr, props.firebase);
        })
        .catch((err) => {
          setSnackbar({ open: true, message: err.message, severity: "error" });
        });
    }
  };

  const handleChange = (e) => {
    const bUser = { ...user };
    bUser[e.target.name] = e.target.value;
    setUser(bUser);
  };

  const handleLogin = (e) => {
    props.history.push(SIGN_IN);
  };

  const handleSnackbarClose = () => {
    setSnackbar({
      open: false,
      severity: "success",
      message: "",
    });
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
              <Typography
                variant="h6"
                style={{ textAlign: "center", textTransform: "uppercase" }}
                color="textSecondary"
              >
                Construction Manager signup
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
                    onClick={handleSignup}
                  >
                    Signup
                  </Button>

                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Typography>Already Have an Account??</Typography>
                    <Button color="secondary" onClick={handleLogin}>
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <MySnackBar snackbar={snackbar} handleClose={handleSnackbarClose} />
      </Grid>
    </Paper>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (user, firebase) => dispatch(registerUser(user, firebase)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withFirebase(SignupPage)));
