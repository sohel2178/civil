import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withFirebase } from "../../../firebase";
import { addTransaction } from "../../../../actions/project_transactions_action";

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
  FormControl,
  InputLabel,
} from "@material-ui/core";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

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
const initialTransactionState = {
  date: new Date(),
  from: 0,
  to: 0,
  purpose: "",
  amount: 0,
};

const DialogAddTransaction = (props) => {
  const classes = useStyle();
  const [err, setErr] = useState(initialErrorState);
  const [transaction, setTransaction] = useState(initialTransactionState);

  const handleChange = (e) => {
    const bTransaction = { ...transaction };
    bTransaction[e.target.name] = e.target.value;
    setTransaction(bTransaction);
  };

  const alreadyExist = (acc) => {
    /*  return props.projectAccounts.filter(
      (account) => account.name === acc.name.trim()
    )[0]; */
  };

  const successCallback = () => {
    /*  props.setOpen(false);
    setAccount(initialAccountState); */
  };

  const handleDateChange = (date) => {
    const bTransaction = { ...transaction };
    bTransaction["date"] = date;
    setTransaction(bTransaction);
  };

  const handleSave = (e) => {
    /* if (account.name === "") {
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
    } */
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Dialog
        open={props.open}
        onClose={() => props.setOpen(false)}
        aria-labelledby="form-dialog-title"
        TransitionComponent={Transition}
        style={{ minWidth: 300 }}
      >
        <DialogTitle
          id="form-dialog-title"
          style={{ textTransform: "uppercase" }}
        >
          Add New Transaction
        </DialogTitle>
        <DialogContent>
          <KeyboardDatePicker
            label="Transaction Date"
            name="date"
            margin="normal"
            format="dd-MMM-yyyy"
            value={transaction.date}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            fullWidth
            className={classes.textField}
          />

          <InputLabel>From Account</InputLabel>

          <Select
            className={classes.textField}
            native
            value={transaction.from}
            onChange={handleChange}
            inputProps={{
              name: "from",
              id: "from",
            }}
            fullWidth
          >
            {props.projectAccounts.map((ref, index) => (
              <option key={index} value={index}>
                {ref.name}
              </option>
            ))}
          </Select>

          <InputLabel style={{ marginTop: 10 }}>To Account</InputLabel>

          <Select
            className={classes.textField}
            native
            value={transaction.to}
            onChange={handleChange}
            inputProps={{
              name: "to",
              id: "to",
            }}
            fullWidth
          >
            {props.projectAccounts.map((ref, index) => (
              <option key={index} value={index}>
                {ref.name}
              </option>
            ))}
          </Select>

          <TextField
            error={err.error && err.fieldId === 1}
            label={err.error && err.fieldId === 1 ? err.message : "Purpose"}
            name="purpose"
            onChange={handleChange}
            value={transaction.purpose}
            fullWidth
            className={classes.textField}
            required
          />

          <TextField
            error={err.error && err.fieldId === 2}
            label={err.error && err.fieldId === 2 ? err.message : "Amount"}
            name="amount"
            onChange={handleChange}
            value={transaction.amount}
            fullWidth
            className={classes.textField}
            required
          />

          {/* <TextField
            error={err.error && err.fieldId === 1}
            label={
              err.error && err.fieldId === 1 ? err.message : "Account Name"
            }
            name="name"
            onChange={handleChange}
            value={account.name}
            fullWidth
            className={classes.textField}
            required
          />

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
          /> */}
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
    addTransaction: (project, firebase, successCallback) =>
      dispatch(addTransaction(project, firebase, successCallback)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withFirebase(DialogAddTransaction));
