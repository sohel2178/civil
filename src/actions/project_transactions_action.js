import {
  PROJECT_TRANSACTION,
  ADD_TRANSACTION,
  UPDATE_TRANSACTION,
  DELETE_TRANSACTION,
} from "../utils/types";
import { PROJECTS_URL } from "../utils/url";
import axios from "axios";

const projectTransactionsAction = (data) => {
  return { type: PROJECT_TRANSACTION, payload: data };
};

const addTransactionAction = (data) => {
  return { type: ADD_TRANSACTION, payload: data };
};

const updateTransactionAction = (newData, oldData) => {
  return {
    type: UPDATE_TRANSACTION,
    payload: { newData: newData, oldData: oldData },
  };
};

const deleteTransactionAction = (data) => {
  return { type: DELETE_TRANSACTION, payload: data };
};

export const getProjectTransactions = (projectId, firebase) => {
  const url = PROJECTS_URL + projectId + "/transactions/";
  return (dispatch) => {
    firebase.idToken().then((idToken) => {
      axios
        .get(url, {
          headers: { Authorization: "Bearer " + idToken },
        })
        .then((response) => {
          dispatch(projectTransactionsAction(response.data));
        })
        .catch((err) => {
          throw err;
        });
    });
  };
};

export const addTransaction = (account, firebase, successCallback) => {
  const url = PROJECTS_URL + account.project + "/transactions/";

  return (dispatch) => {
    firebase.idToken().then((idToken) => {
      axios
        .post(url, account, {
          headers: { Authorization: "Bearer " + idToken },
        })
        .then((response) => {
          successCallback();
          dispatch(addTransactionAction(response.data));
        })
        .catch((err) => {
          throw err;
        });
    });
  };
};

export const updateTransaction = (firebase, newData, oldData, resolve) => {
  const url = PROJECTS_URL + newData.project + "/transactions/";

  return (dispatch) => {
    firebase.idToken().then((idToken) => {
      axios
        .put(url + newData._id, newData, {
          headers: { Authorization: "Bearer " + idToken },
        })
        .then((response) => {
          resolve();
          dispatch(updateTransactionAction(newData, oldData));
        })
        .catch((err) => {
          resolve();
          throw err;
        });
    });
  };
};

export const deleteTransaction = (firebase, account, resolve) => {
  const url = PROJECTS_URL + account.project + "/transactions/";

  return (dispatch) => {
    firebase.idToken().then((idToken) => {
      axios
        .delete(url + account._id, {
          headers: { Authorization: "Bearer " + idToken },
        })
        .then((response) => {
          resolve();
          dispatch(deleteTransactionAction(account));
        })
        .catch((err) => {
          resolve();
          throw err;
        });
    });
  };
};
