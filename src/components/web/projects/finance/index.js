import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import { Grid } from "@material-ui/core";
import FinanceTab from "./finance_tab";
import { blueGrey, orange } from "@material-ui/core/colors";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
  },
}));

const FinancePage = (props) => {
  const classes = useStyle();
  useEffect(() => {
    props.setTitle("Finance of Project " + props.currentProject.name);
  }, []);
  return (
    <Grid container className={classes.root} alignItems="stretch">
      <Grid item container xs={1} style={{ backgroundColor: "black" }}></Grid>
      <Grid item container direction="column" xs={11} style={{}}>
        <FinanceTab />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(FinancePage);
