import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Drawer, List, Grid, Avatar, Typography } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  drawer: {
    width: 300,
    height: "100vh",
  },
  avater: {
    width: 100,
    height: 100,
  },
}));

const WebDrawer = ({ open, handleClose, authUser }) => {
  console.log(authUser, "Auth User");
  const classes = useStyle();
  return (
    <Drawer anchor="left" open={open} onClose={handleClose}>
      <Grid container direction="column" className={classes.drawer}>
        <Grid
          item
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ padding: 20 }}
        >
          {authUser ? (
            <Avatar src={authUser.image} className={classes.avater} />
          ) : (
            <Avatar className={classes.avater}>A</Avatar>
          )}
          <Typography variant="body1">
            {authUser ? authUser.email : "not"}
          </Typography>
        </Grid>
        <Grid item>HHHHHH</Grid>
      </Grid>
    </Drawer>
  );
};

export default WebDrawer;
