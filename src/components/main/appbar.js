import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { AppBar, Typography, Toolbar } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const MyAppBar = ({ branding }) => {
  const classes = useStyle();
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography>{branding}</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
