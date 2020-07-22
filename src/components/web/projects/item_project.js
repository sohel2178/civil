import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { setCurrentProject } from "../../../actions/current_project_action";

import {
  CardHeader,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Grid as SGrid,
  Typography,
  Divider,
  Fab,
  Button,
} from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    minWidth: "95%",
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "2%",
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  typo: {
    fontSize: "0.9rem",
    padding: 4,
  },
  fab: {
    marginRight: 8,
  },
}));

const ProjectCard = (props) => {
  const classes = useStyle();

  const handleFinanceClick = (e) => {
    props.setCurrentProject(props.project);
    props.setSelected(2);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="driver_photo" className={classes.avatar}>
            P
          </Avatar>
        }
        title={props.project.name}
        subheader={
          "Created at " + new Date(props.project.created_at).toDateString()
        }
      />
      <Divider />

      <CardContent>
        <SGrid container direction="column">
          <SGrid item container justify="space-between">
            <Typography className={classes.typo}>Start Date</Typography>
            <Typography className={classes.typo}>
              {new Date(props.project.start_date).toDateString()}
            </Typography>
          </SGrid>

          <SGrid item container justify="space-between">
            <Typography className={classes.typo}>Completion Date</Typography>
            <Typography className={classes.typo}>
              {new Date(props.project.completion_date).toDateString()}
            </Typography>
          </SGrid>

          <SGrid item container justify="space-between">
            <Typography className={classes.typo}>Project Location</Typography>
            <Typography className={classes.typo}>
              {props.project.location}
            </Typography>
          </SGrid>

          <SGrid item container justify="space-between">
            <Typography className={classes.typo}>
              Project Description
            </Typography>
            <Typography className={classes.typo}>
              {props.project.description}
            </Typography>
          </SGrid>
        </SGrid>
      </CardContent>
      <Divider />
      <CardActions>
        <SGrid container direction="column">
          <SGrid item container justify="center">
            <Fab color="secondary" size="small" className={classes.fab} />
            <Fab color="secondary" size="small" className={classes.fab} />
            <Fab color="secondary" size="small" className={classes.fab} />
            <Fab color="secondary" size="small" className={classes.fab} />
          </SGrid>
          <Typography
            variant="body1"
            style={{ textAlign: "center", padding: 8 }}
          >
            Actions
          </Typography>

          <SGrid item container justify="space-between">
            <Button variant="outlined" style={{ fontSize: "0.7rem" }}>
              Task
            </Button>
            <Button
              variant="outlined"
              style={{ fontSize: "0.7rem" }}
              onClick={handleFinanceClick}
            >
              FINANCE
            </Button>
            <Button variant="outlined" style={{ fontSize: "0.7rem" }}>
              STOTE
            </Button>
            <Button variant="outlined" style={{ fontSize: "0.7rem" }}>
              EMPLOYEE
            </Button>
          </SGrid>
        </SGrid>
      </CardActions>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentProject: (project) => dispatch(setCurrentProject(project)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCard);
