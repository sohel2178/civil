import React, { useState, useEffect } from "react";
import WebAppBar from "./web_app_bar";
import WebDrawer from "./web_drawer";

import { connect } from "react-redux";
import { withFirebase } from "../firebase";
import { withRouter, Switch, Route } from "react-router-dom";

import { getAuthUser } from "../../actions/auth_user_action";

import { MAIN, WEB, PROFILE } from "../../utils/routes";
import UserProjectsPage from "./projects/user_projects";
import ProfilePage from "./profile";

const WebPage = (props) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectItem, setSelectedItem] = useState(0);

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

  const loadComponent = () => {
    switch (selectItem) {
      case 0:
        return <UserProjectsPage />;
      case 1:
        return <ProfilePage />;
      default:
        return <UserProjectsPage />;
    }
  };
  return (
    <div>
      <WebAppBar menuClick={menuClick} selected={selectItem} />
      <div style={{ height: "100vh" }}>{loadComponent()}</div>
      <WebDrawer
        open={drawerOpen}
        handleClose={closeDrawer}
        authUser={props.authUser}
        handleItemClick={setSelectedItem}
        selected={selectItem}
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
