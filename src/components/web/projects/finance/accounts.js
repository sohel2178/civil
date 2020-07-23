import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core";
import {
  getProjectAccounts,
  updateAccount,
  deleteAccount,
} from "../../../../actions/project_account_action";
import { withFirebase } from "../../../firebase";
import MaterialTable from "material-table";
import { TableIcons } from "../../../data_table";
import { Grid } from "@material-ui/core";
import DialogAddAccount from "./account_dialog";

const types = ["Expense", "Income", "Both"];

const columns = [
  { title: "Name", field: "name" },
  {
    title: "Type",
    field: "type",
    render: (rawData) => <div>{types[rawData.type]}</div>,
  },
  { title: "Opening Balance", field: "opening_balance" },
];
const AccountPage = (props) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (
      props.projectAccounts.length === 0 ||
      props.projectAccounts[0].project != props.currentProject._id
    ) {
      props.getProjectAccounts(props.currentProject._id, props.firebase);
    }
  }, []);

  const openAccountDialog = () => {
    setOpen(true);
  };

  return (
    <Grid container justify="center">
      <Grid item xs={10} style={{ marginTop: 10 }}>
        <MaterialTable
          title="Account List"
          icons={TableIcons}
          columns={columns}
          data={props.projectAccounts}
          options={{
            actionsColumnIndex: -1,
            headerStyle: {
              backgroundColor: "#01579b",
              color: "#FFF",
            },
          }}
          actions={[
            {
              icon: TableIcons.Add,
              tooltip: "Add Account",
              isFreeAction: true,
              onClick: (event) => openAccountDialog(),
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

      <DialogAddAccount open={open} setOpen={setOpen} />
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
    getProjectAccounts: (projectId, firebase) =>
      dispatch(getProjectAccounts(projectId, firebase)),
    updateAccount: (firebase, newData, OldData, resolve) =>
      dispatch(updateAccount(firebase, newData, OldData, resolve)),

    deleteAccount: (firebase, account, resolve) =>
      dispatch(deleteAccount(firebase, account, resolve)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withFirebase(AccountPage));
