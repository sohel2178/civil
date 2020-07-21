import { AUTH_USER } from "../utils/types";

const authUserReducers = (state = null, action) => {
  if (action.type === AUTH_USER) {
    return action.payload;
  } else {
    return state;
  }
};

export default authUserReducers;
