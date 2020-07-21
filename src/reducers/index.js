import { combineReducers } from "redux";
import userReducer from "./user_reducer";
import authUserReducers from "./auth_user_reducer";

export default combineReducers({
  users: userReducer,
  authUser: authUserReducers,
});
