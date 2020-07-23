import {
  PROJECT_TRANSACTION,
  ADD_TRANSACTION,
  UPDATE_TRANSACTION,
  DELETE_TRANSACTION,
} from "../utils/types";

const projectTransactionsReducer = (state = [], action) => {
  if (action.type === PROJECT_TRANSACTION) {
    return action.payload;
  } else if (action.type === ADD_TRANSACTION) {
    return [...state, action.payload];
  } else if (action.type === UPDATE_TRANSACTION) {
    let accounts = [...state];
    accounts[accounts.indexOf(action.payload.oldData)] = action.payload.newData;
    return accounts;
  } else if (action.type === DELETE_TRANSACTION) {
    return [...state].filter((account) => account._id != action.payload._id);
  } else {
    return state;
  }
};

export default projectTransactionsReducer;
