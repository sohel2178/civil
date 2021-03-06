import React, { useState, useEffect } from "react";
import WebAppBar from "./web_app_bar";
import WebDrawer from "./web_drawer";

import { connect } from "react-redux";
import { withFirebase } from "../firebase";
import { withRouter } from "react-router-dom";

import { getAuthUser } from "../../actions/auth_user_action";

import { MAIN } from "../../utils/routes";
import UserProjectsPage from "./projects/user_projects";
import ProfilePage from "./profile";
import FinancePage from "./projects/finance";

const WebPage = (props) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectItem, setSelectedItem] = useState(0);
  const [title, setTitle] = useState("Project List");

  const stopListener = (listener) => listener();

  useEffect(() => {
    const listener = props.firebase.auth.onAuthStateChanged((user) => {
      if (user) {
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
        return <UserProjectsPage setSelected={setSelectedItem} />;
      case 1:
        return <ProfilePage />;
      case 2:
        return <FinancePage setTitle={setTitle} />;
      default:
        return <UserProjectsPage />;
    }
  };
  return (
    <div style={{ display: "flex", flexFlow: "column", height: "100vh" }}>
      <WebAppBar menuClick={menuClick} selected={selectItem} title={title} />
      {props.authUser ? (
        <div style={{ flex: "1 1 auto" }}>{loadComponent()}</div>
      ) : null}
      <WebDrawer
        open={drawerOpen}
        handleClose={closeDrawer}
        authUser={props.authUser}
        handleItemClick={setSelectedItem}
        selected={selectItem}
        setTitle={setTitle}
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
