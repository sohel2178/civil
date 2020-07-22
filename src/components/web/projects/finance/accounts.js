import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core";

const AccountPage = (props) => {
  console.log(props);
  return <div>Account Page</div>;
};

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

//   const mapDispatchToProps = (dispatch) => {
//     return {
//       fetchUserProjects: (uid, firebase) =>
//         dispatch(fetchUserProjects(uid, firebase)),
//     };
//   };

export default connect(mapStateToProps)(AccountPage);
