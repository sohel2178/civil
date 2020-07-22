import React, { Fragment } from "react";

import { Tab, Tabs, Box, Typography } from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import AccountPage from "./accounts";
import TransactionPage from "./transactions";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const FinanceTab = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Fragment>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="inherit"
        variant="fullWidth"
        aria-label="full width tabs example"
        style={{ backgroundColor: orange[500] }}
      >
        <Tab label="Accounts" {...a11yProps(0)} />
        <Tab label="Transactions" {...a11yProps(1)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <AccountPage />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TransactionPage />
      </TabPanel>
    </Fragment>
  );
};

export default FinanceTab;
