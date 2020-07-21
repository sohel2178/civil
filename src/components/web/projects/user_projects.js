import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import DialogAddProject from "./dialog_add_project";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100vh",
  },
}));

const UserProjectsPage = () => {
  const [openAddProjectDialog, setOpenAddProjectDialog] = useState(false);
  const classes = useStyle();

  const handleFabAddClick = () => {
    setOpenAddProjectDialog(true);
  };
  return (
    <Grid
      container
      justify="flex-start"
      alignItems="flex-start"
      className={classes.root}
      direction="column"
    >
      <Grid
        item
        container
        justify="center"
        style={{ width: "100%", height: "100vh" }}
      >
        <Grid
          item
          xs={10}
          style={{ height: "100vh", backgroundColor: "green" }}
        ></Grid>
      </Grid>
      <Grid
        item
        container
        justify="flex-end"
        style={{
          marginTop: "-100vh",
          height: "100vh",
        }}
      >
        <Grid item container xs={1} justify="center" alignItems="center">
          <Grid
            item
            style={{ width: "60%", height: "60vh" }}
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
      </Grid>

      {/* <Grid xs={10} item container direction="column">
        <Grid item container justify="flex-end">
          <Button>Add Project</Button>
        </Grid>
      </Grid> */}
      <DialogAddProject
        open={openAddProjectDialog}
        setOpen={setOpenAddProjectDialog}
      />
    </Grid>
  );
};

export default UserProjectsPage;
