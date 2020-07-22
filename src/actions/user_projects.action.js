import axios from "axios";

import { ADD_PROJECT, FETCH_USER_PROJECTS } from "../utils/types";
import { PROJECTS_URL } from "../utils/url";

const addProjectAction = (data) => {
  return { type: ADD_PROJECT, payload: data };
};

const fetchUserProjectsAction = (data) => {
  return { type: FETCH_USER_PROJECTS, payload: data };
};

export const addProject = (project, firebase, successCallback) => {
  return (dispatch) => {
    firebase.idToken().then((idToken) => {
      return axios
        .post(PROJECTS_URL, project, {
          headers: { Authorization: "Bearer " + idToken },
        })
        .then((response) => {
          dispatch(addProjectAction(response.data));
          successCallback();
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
    });
  };
};

export const fetchUserProjects = (uid, firebase) => {
  return (dispatch) => {
    firebase.idToken().then((idToken) => {
      return axios
        .get(PROJECTS_URL + uid, {
          headers: { Authorization: "Bearer " + idToken },
        })
        .then((response) => {
          dispatch(fetchUserProjectsAction(response.data));
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
    });
  };
};
