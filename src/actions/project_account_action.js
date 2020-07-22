import { PROJECT_ACCOUNTS } from "../utils/types";
import axios from "axios";

const projectAccountAction = (data) => {
  return { type: PROJECT_ACCOUNTS, payload: data };
};

export const getProjectAccounts = (projectId, firebase) => {
  return (dispatch) => {
    dispatch(currentProjectAction(project));
  };
};
