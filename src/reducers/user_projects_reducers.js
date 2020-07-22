import { FETCH_USER_PROJECTS, ADD_PROJECT } from "../utils/types";

const userProjectsReducer = (state = [], action) => {
  if (action.type === FETCH_USER_PROJECTS) {
    return action.payload;
  } else if (action.type === ADD_PROJECT) {
    let userProjects = [...state];
    userProjects.push(action.payload);
    return userProjects;
  } else {
    return state;
  }
};

export default userProjectsReducer;
