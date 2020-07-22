import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withFirebase } from "../../firebase";
import { addProject } from "../../../actions/user_projects.action";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  DialogContentText,
  DialogTitle,
  TextField,
  Slide,
  Grid,
  FormGroup,
  InputLabel,
} from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const useStyle = makeStyles((theme) => ({
  datePicker: {
    width: "100% !important",
    backgroundColor: "green",
    display: "block",
  },
  textField: {
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
}));

const initialErrorState = { error: false, message: "", fieldId: 0 };
const initialProjectState = {
  name: "",
  description: "",
  location: "",
  start_date: new Date(),
  completion_date: new Date(),
};

const DialogAddProject = (props) => {
  const classes = useStyle();
  const [err, setErr] = useState(initialErrorState);
  const [project, setProject] = useState(initialProjectState);

  const handleChange = (e) => {
    const bProject = { ...project };
    bProject[e.target.name] = e.target.value;
    setProject(bProject);
  };

  const handleStartDateChange = (date) => {
    const bProject = { ...project };
    bProject["start_date"] = date;
    setProject(bProject);
  };

  const handleCompletionDateChange = (date) => {
    const bProject = { ...project };
    bProject["completion_date"] = date;
    setProject(bProject);
  };

  const successCallback = () => {
    props.setOpen(false);
    setProject(initialProjectState);
  };

  const handleSave = (e) => {
    if (project.name === "") {
      setErr({
        error: true,
        message: "Empty Field is not Allowed",
        fieldId: 1,
      });
    } else if (project.description === "") {
      setErr({
        error: true,
        message: "Empty Field is not Allowed",
        fieldId: 2,
      });
    } else if (project.location === "") {
      setErr({
        error: true,
        message: "Empty Field is not Allowed",
        fieldId: 3,
      });
    } else if (
      project.start_date.getTime() >= project.completion_date.getTime()
    ) {
      setErr({
        error: true,
        message: "Start Date Must before Completion Date",
        fieldId: 4,
      });
    } else {
      setErr(initialErrorState);
      // Add Project

      // console.log(props);
      const pp = { ...project };
      pp["user"] = props.authUser.webuid;
      props.addProject(pp, props.firebase, successCallback);
    }
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Dialog
        open={props.open}
        onClose={() => props.setOpen(false)}
        aria-labelledby="form-dialog-title"
        TransitionComponent={Transition}
      >
        <DialogTitle
          id="form-dialog-title"
          style={{ textTransform: "uppercase" }}
        >
          Add New Project
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ textTransform: "uppercase" }}>
            To create a <b>New Project </b> fill up the Following Form Properly
          </DialogContentText>

          <TextField
            error={err.error && err.fieldId === 1}
            label={
              err.error && err.fieldId === 1 ? err.message : "Project Name"
            }
            name="name"
            onChange={handleChange}
            value={project.name}
            fullWidth
            className={classes.textField}
            required
          />

          <TextField
            error={err.error && err.fieldId === 2}
            label={
              err.error && err.fieldId === 2
                ? err.message
                : "Project Description"
            }
            name="description"
            onChange={handleChange}
            value={project.description}
            fullWidth
            className={classes.textField}
            required
          />

          <TextField
            error={err.error && err.fieldId === 3}
            label={
              err.error && err.fieldId === 3 ? err.message : "Project Location"
            }
            name="location"
            onChange={handleChange}
            value={project.location}
            fullWidth
            className={classes.textField}
            required
          />

          <KeyboardDatePicker
            error={err.error && err.fieldId === 4}
            label={
              err.error && err.fieldId === 4
                ? err.message
                : "Project Start Date"
            }
            name="start_date"
            margin="normal"
            format="dd-MMM-yyyy"
            value={project.start_date}
            onChange={handleStartDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            fullWidth
            className={classes.textField}
          />

          <KeyboardDatePicker
            name="completion_date"
            margin="normal"
            format="dd-MMM-yyyy"
            value={project.completion_date}
            label="Project Completion Date"
            onChange={handleCompletionDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            fullWidth
            className={classes.textField}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </MuiPickersUtilsProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProject: (project, firebase, successCallback) =>
      dispatch(addProject(project, firebase, successCallback)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withFirebase(DialogAddProject));
