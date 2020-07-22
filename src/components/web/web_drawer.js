import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  Drawer,
  List,
  Grid,
  Avatar,
  Typography,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@material-ui/core";
import { Home, Person } from "@material-ui/icons";

const drawerList = [
  { label: "Home", icon: Home },
  { label: "Profile", icon: Person },
];

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

const WebDrawer = ({
  open,
  handleClose,
  authUser,
  handleItemClick,
  selected,
  setTitle,
}) => {
  const classes = useStyle();
  const handleClick = (index) => {
    handleItemClick(index);
    switch (index) {
      case 0:
        setTitle("Project List");
        break;

      case 1:
        setTitle("User Profile");
        break;
      default:
        setTitle("Project List");
    }
  };
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
        <List>
          {drawerList.map((item, index) => (
            <ListItem
              button
              key={index}
              divider
              onClick={() => handleClick(index)}
              selected={selected === index}
            >
              <ListItemIcon>{<item.icon color="primary" />}</ListItemIcon>
              <ListItemText>{item.label}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Drawer>
  );
};

export default WebDrawer;
