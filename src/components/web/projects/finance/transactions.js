import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core";
import {
  getProjectTransactions,
  updateTransaction,
  deleteTransaction,
} from "../../../../actions/project_transactions_action";
import { withFirebase } from "../../../firebase";
import MaterialTable from "material-table";
import { TableIcons } from "../../../data_table";
import { Grid } from "@material-ui/core";
import DialogAddTransaction from "./transaction_dialog";

const columns = [
  { title: "Date", field: "date" },
  { title: "Purpose", field: "purpose" },
  {
    title: "From",
    field: "from",
    render: (rawData) => <div>{rawData.from.name}</div>,
  },
  {
    title: "To",
    field: "to",
    render: (rawData) => <div>{rawData.to.name}</div>,
  },
  { title: "Amount", field: "amount" },
];

const TransactionPage = (props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (
      props.projectTransactions.length === 0 ||
      props.projectTransactions[0].project != props.currentProject._id
    ) {
      props.getProjectTransactions(props.currentProject._id, props.firebase);
    }
  }, []);

  const openTransactionDialog = () => {
    setOpen(true);
  };
  return (
    <Grid container justify="center">
      <Grid item xs={10} style={{ marginTop: 10 }}>
        <MaterialTable
          title="Transaction List"
          icons={TableIcons}
          columns={columns}
          data={props.projectTransactions}
          options={{
            actionsColumnIndex: -1,
          }}
          actions={[
            {
              icon: TableIcons.Add,
              tooltip: "Add Account",
              isFreeAction: true,
              onClick: (event) => openTransactionDialog(),
            },

            /* (rawData) => ({
          icon: TableIcons.AttachFile,
          tooltip: "Assign Device",
          // onClick: (event) => this.openUserDialog(rawData),
          //disabled: rawData.uid != null,
        }),
        (rawData) => ({
          icon: TableIcons.Clear,
          tooltip: "UN-Assign Device",
          // onClick: (event) => this.props.unAssignDevice(rawData),
          //disabled: rawData.uid == null,
        }), */
          ]}
          editable={{
            onRowUpdate: (newData, oldData) => {
              return new Promise((resolve) => {
                props.updateAccount(props.firebase, newData, oldData, resolve);
              });
            },
            onRowDelete: (oldData) => {
              return new Promise((resolve) => {
                props.deleteAccount(props.firebase, oldData, resolve);
              });
            },
          }}
        />
      </Grid>

      <DialogAddTransaction open={open} setOpen={setOpen} />
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
    getProjectTransactions: (projectId, firebase) =>
      dispatch(getProjectTransactions(projectId, firebase)),
    updateTransaction: (firebase, newData, OldData, resolve) =>
      dispatch(updateTransaction(firebase, newData, OldData, resolve)),

    deleteTransaction: (firebase, account, resolve) =>
      dispatch(deleteTransaction(firebase, account, resolve)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withFirebase(TransactionPage));
