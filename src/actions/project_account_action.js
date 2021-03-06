import {
  PROJECT_ACCOUNTS,
  ADD_ACCOUNT,
  UPDATE_ACCOUNT,
  DELETE_ACCOUNT,
} from "../utils/types";
import { PROJECTS_URL } from "../utils/url";
import axios from "axios";

const projectAccountsAction = (data) => {
  return { type: PROJECT_ACCOUNTS, payload: data };
};

const addAccountAction = (data) => {
  return { type: ADD_ACCOUNT, payload: data };
};

const updateAccountAction = (newData, oldData) => {
  return {
    type: UPDATE_ACCOUNT,
    payload: { newData: newData, oldData: oldData },
  };
};

const deleteAccountAction = (data) => {
  return { type: DELETE_ACCOUNT, payload: data };
};

export const getProjectAccounts = (projectId, firebase) => {
  const url = PROJECTS_URL + projectId + "/accounts";
  return (dispatch) => {
    firebase.idToken().then((idToken) => {
      axios
        .get(url, {
          headers: { Authorization: "Bearer " + idToken },
        })
        .then((response) => {
          dispatch(projectAccountsAction(response.data));
        })
        .catch((err) => {
          throw err;
        });
    });
  };
};

export const addAccount = (account, firebase, successCallback) => {
  const url = PROJECTS_URL + account.project + "/accounts";

  return (dispatch) => {
    firebase.idToken().then((idToken) => {
      axios
        .post(url, account, {
          headers: { Authorization: "Bearer " + idToken },
        })
        .then((response) => {
          successCallback();
          dispatch(addAccountAction(response.data));
        })
        .catch((err) => {
          throw err;
        });
    });
  };
};

export const updateAccount = (firebase, newData, oldData, resolve) => {
  const url = PROJECTS_URL + newData.project + "/accounts/";

  return (dispatch) => {
    firebase.idToken().then((idToken) => {
      axios
        .put(url + newData._id, newData, {
          headers: { Authorization: "Bearer " + idToken },
        })
        .then((response) => {
          resolve();
          dispatch(updateAccountAction(newData, oldData));
        })
        .catch((err) => {
          resolve();
          throw err;
        });
    });
  };
};

export const deleteAccount = (firebase, account, resolve) => {
  const url = PROJECTS_URL + account.project + "/accounts/";

  return (dispatch) => {
    firebase.idToken().then((idToken) => {
      axios
        .delete(url + account._id, {
          headers: { Authorization: "Bearer " + idToken },
        })
        .then((response) => {
          resolve();
          dispatch(deleteAccountAction(account));
        })
        .catch((err) => {
          resolve();
          throw err;
        });
    });
  };
};
