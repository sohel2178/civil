import { combineReducers } from "redux";
import userReducer from "./user_reducer";
import authUserReducers from "./auth_user_reducer";
import userProjectsReducer from "./user_projects_reducers";

export default combineReducers({
  users: userReducer,
  authUser: authUserReducers,
  userProjects: userProjectsReducer,
});
