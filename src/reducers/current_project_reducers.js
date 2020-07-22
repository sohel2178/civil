import { CURRENT_PROJECT } from "../utils/types";

const currentProjectReducer = (state = null, action) => {
  if (action.type === CURRENT_PROJECT) {
    return action.payload;
  } else {
    return state;
  }
};

export default currentProjectReducer;
