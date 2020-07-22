import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Menu } from "@material-ui/icons";

const useStyles = makeStyles((thene) => ({
  typo: {
    marginLeft: 10,
  },
}));

const WebAppBar = ({ menuClick, selected, title }) => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton onClick={menuClick}>
          <Menu style={{ color: "#fff" }} />
        </IconButton>
        <Typography className={classes.typo}>{title}</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default WebAppBar;
