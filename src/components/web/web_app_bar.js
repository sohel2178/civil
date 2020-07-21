import React from "react";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";

import { Menu } from "@material-ui/icons";

const WebAppBar = ({ menuClick }) => {
  return (
    <AppBar>
      <Toolbar>
        <IconButton onClick={menuClick}>
          <Menu style={{ color: "#fff" }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default WebAppBar;
