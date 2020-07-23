import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withFirebase } from "../../../firebase";
import { addAccount } from "../../../../actions/project_account_action";

import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  DialogContentText,
  DialogTitle,
  TextField,
  Slide,
  Select,
} from "@material-ui/core";

const ACCOUNT_TYPE_LIST = ["EXPENSE", "INCOME", "BOTH"];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const useStyle = makeStyles((theme) => ({
  textField: {
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
}));

const initialErrorState = { error: false, message: "", fieldId: 0 };
const initialAccountState = {
  name: "",
  type: 0,
  openning_balance: 0,
};

const DialogAddAccount = (props) => {
  const classes = useStyle();
  const [err, setErr] = useState(initialErrorState);
  const [account, setAccount] = useState(initialAccountState);

  const handleChange = (e) => {
    const bAccount = { ...account };
    bAccount[e.target.name] = e.target.value;
    setAccount(bAccount);
  };

  const alreadyExist = (acc) => {
    return props.projectAccounts.filter(
      (account) => account.name === acc.name.trim()
    )[0];
  };

  const successCallback = () => {
    props.setOpen(false);
    setAccount(initialAccountState);
  };

  const handleSave = (e) => {
    if (account.name === "") {
      setErr({
        error: true,
        message: "Empty Field is not Allowed",
        fieldId: 1,
      });
    } else if (alreadyExist(account)) {
      setErr({
        error: true,
        message: "Account Name Already Exist",
        fieldId: 1,
      });
    } else if (Number(account.openning_balance) === NaN) {
      setErr({
        error: true,
        message: "Opening Balance Should be a Number",
        fieldId: 3,
      });
    } else {
      setErr(initialErrorState);
      const acc = { ...account };
      acc["project"] = props.currentProject._id;
      props.addAccount(acc, props.firebase, successCallback);
    }
  };
  return (
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
        Add New Account
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ textTransform: "uppercase" }}>
          To create a <b>New Account </b> fill up the Following Form Properly
        </DialogContentText>
        <TextField
          error={err.error && err.fieldId === 1}
          label={err.error && err.fieldId === 1 ? err.message : "Account Name"}
          name="name"
          onChange={handleChange}
          value={account.name}
          fullWidth
          className={classes.textField}
          required
        />

        <Select
          label="Account Type"
          style={{ marginTop: 10 }}
          native
          value={account.type}
          onChange={handleChange}
          inputProps={{
            name: "type",
            id: "type",
          }}
          fullWidth
        >
          {ACCOUNT_TYPE_LIST.map((ref, index) => (
            <option key={index} value={index}>
              {ref}
            </option>
          ))}
        </Select>

        <TextField
          error={err.error && err.fieldId === 3}
          label={
            err.error && err.fieldId === 3 ? err.message : "Openning Balance"
          }
          name="openning_balance"
          onChange={handleChange}
          value={account.openning_balance}
          fullWidth
          className={classes.textField}
          required
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
  );
};

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addAccount: (project, firebase, successCallback) =>
      dispatch(addAccount(project, firebase, successCallback)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withFirebase(DialogAddAccount));
