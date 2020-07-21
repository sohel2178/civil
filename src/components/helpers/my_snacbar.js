import React from "react";

import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const MySnackBar = ({ snackbar, handleClose }) => {
  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
    >
      <Alert onClose={handleClose} severity={snackbar.severity}>
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default MySnackBar;
