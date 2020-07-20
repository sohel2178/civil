import {
  FETCH_USERS,
  UPDATE_USER,
  ADD_USER,
  SEARCH_USER
} from "../utils/types";

const userReducer = (state = [], action) => {
  if (action.type === FETCH_USERS) {
    return action.payload;
  } else if (action.type === UPDATE_USER) {
    let users = [...state];
    users[users.indexOf(action.payload.oldData)] = action.payload.newData;
    return users;
  } else if (action.type === ADD_USER) {
    let users = [...state];
    users.push(action.payload.newData);
    return users;
  } else if (action.type === SEARCH_USER) {
    let users = [...state];
    if (action.payload === "") {
      return users;
    }
    return users.filter(user => user.email.startsWith(action.payload));
  } else {
    return state;
  }
};

export default userReducer;
