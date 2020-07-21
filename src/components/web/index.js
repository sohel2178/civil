import React, { useState, useEffect } from "react";
import WebAppBar from "./web_app_bar";
import WebDrawer from "./web_drawer";

import { connect } from "react-redux";
import { withFirebase } from "../firebase";
import { withRouter } from "react-router-dom";

import { getAuthUser } from "../../actions/auth_user_action";

import { MAIN } from "../../utils/routes";

const WebPage = (props) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const stopListener = (listener) => listener();

  useEffect(() => {
    const listener = props.firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        if (user.emailVerified) {
          props.getAuthUser(user, props.firebase);
        } else {
        }
      } else {
        props.getAuthUser(null, props.firebase);
        props.history.push(MAIN);
      }
    });

    return () => stopListener(listener);
  }, []);
  const menuClick = () => {
    setDrawerOpen(!drawerOpen);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };
  return (
    <div>
      <WebAppBar menuClick={menuClick} />
      <WebDrawer
        open={drawerOpen}
        handleClose={closeDrawer}
        authUser={props.authUser}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAuthUser: (user, firebase) => dispatch(getAuthUser(user, firebase)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withFirebase(WebPage)));
