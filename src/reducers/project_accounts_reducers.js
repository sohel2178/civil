import {
  PROJECT_ACCOUNTS,
  ADD_ACCOUNT,
  UPDATE_ACCOUNT,
  DELETE_ACCOUNT,
} from "../utils/types";

const projectAccountsReducer = (state = [], action) => {
  if (action.type === PROJECT_ACCOUNTS) {
    return action.payload;
  } else if (action.type === ADD_ACCOUNT) {
    return [...state, action.payload];
  } else if (action.type === UPDATE_ACCOUNT) {
    let accounts = [...state];
    accounts[accounts.indexOf(action.payload.oldData)] = action.payload.newData;
    return accounts;
  } else if (action.type === DELETE_ACCOUNT) {
    return [...state].filter((account) => account._id != action.payload._id);
  } else {
    return state;
  }
};

export default projectAccountsReducer;
