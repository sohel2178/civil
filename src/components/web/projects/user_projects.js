import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import DialogAddProject from "./dialog_add_project";
import { connect } from "react-redux";
import { withFirebase } from "../../firebase";
import { fetchUserProjects } from "../../../actions/user_projects.action";
import ProjectGrid from "./project_grid";
import { blueGrey, amber, orange } from "@material-ui/core/colors";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
  },
  leftContainer: {
    backgroundColor: blueGrey[500],
  },
  rightContainer: { backgroundColor: orange[500] },
}));

const UserProjectsPage = (props) => {
  const [openAddProjectDialog, setOpenAddProjectDialog] = useState(false);
  const classes = useStyle();

  useEffect(() => {
    if (props.userProjects.length <= 0) {
      props.fetchUserProjects(props.authUser.webuid, props.firebase);
    }
  }, []);

  const handleFabAddClick = () => {
    setOpenAddProjectDialog(true);
  };
  return (
    <Grid
      container
      justify="flex-start"
      alignItems="stretch"
      className={classes.root}
    >
      <Grid
        item
        container
        xs={1}
        className={classes.rightContainer}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid
          item
          style={{ width: "60%", height: "60%" }}
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Fab color="secondary" onClick={handleFabAddClick}>
            <Add />
          </Fab>
        </Grid>
      </Grid>

      <Grid
        item
        container
        xs={11}
        className={classes.leftContainer}
        justify="flex-end"
      >
        <ProjectGrid
          projects={props.userProjects}
          setSelected={props.setSelected}
        />
      </Grid>

      <DialogAddProject
        open={openAddProjectDialog}
        setOpen={setOpenAddProjectDialog}
      />
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserProjects: (uid, firebase) =>
      dispatch(fetchUserProjects(uid, firebase)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withFirebase(UserProjectsPage));
