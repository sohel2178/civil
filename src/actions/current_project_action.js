import { CURRENT_PROJECT } from "../utils/types";

const currentProjectAction = (data) => {
  return { type: CURRENT_PROJECT, payload: data };
};

export const setCurrentProject = (project) => {
  return (dispatch) => {
    dispatch(currentProjectAction(project));
  };
};
