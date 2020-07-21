import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
} from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const useStyle = makeStyles((theme) => ({
  datePicker: {
    width: "100% !important",
    backgroundColor: "green",
    display: "block",
  },
}));

const DialogAddProject = ({ open, setOpen }) => {
  const classes = useStyle();
  const [project, setProject] = useState({
    name: "",
    description: "",
    location: "",
    start_date: new Date(),
    completion_date: new Date(),
  });

  const handleStartDateChange = (date) => {
    console.log("Calllll");
    setProject({ start_date: date });
  };
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
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
        <DialogContentText>
          To create a <b>new Project</b> fill up the Following Form Properly
        </DialogContentText>

        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
        />
        <DatePicker
          selected={project.start_date}
          onChange={handleStartDateChange}
          className={classes.datePicker}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={() => setOpen(false)} color="primary">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogAddProject;
