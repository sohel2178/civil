import { combineReducers } from "redux";
import userReducer from "./user_reducer";
import authUserReducers from "./auth_user_reducer";
import userProjectsReducer from "./user_projects_reducers";
import currentProjectReducer from "./current_project_reducers";
import projectAccountsReducer from "./project_accounts_reducers";
import projectTransactionsReducer from "./project_transactions_reducers";

export default combineReducers({
  users: userReducer,
  authUser: authUserReducers,
  userProjects: userProjectsReducer,
  currentProject: currentProjectReducer,
  projectAccounts: projectAccountsReducer,
  projectTransactions: projectTransactionsReducer,
});
