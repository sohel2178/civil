import axios from "axios";

import { ADD_USER } from "../utils/types";
import { USERS_URL } from "../utils/url";

const addUserAction = (data) => {
  return { type: ADD_USER, payload: data };
};

export const registerUser = (user, firebase) => {
  return (dispatch) => {
    firebase.idToken().then((idToken) => {
      return axios
        .post(USERS_URL, user, {
          headers: { Authorization: "Bearer " + idToken },
        })
        .then((response) => {
          dispatch(addUserAction(response.data));
        })
        .catch((err) => {
          throw err;
        });
    });
  };
};
