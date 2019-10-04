import { combineReducers } from "redux";
import types from "./types";

const profile = (
  // state = null,
  state = { id: "test" },
  action
) => {
  switch (action.type) {
    case types.SET_USER_PROFILE:
      return {
        ...state,
        ...action
      };
    default:
      return state;
  }
};
const studentsList = (state = [], action) => {
  switch (action.type) {
    case types.SET_STUDENTS_LIST:
      return action.payload;
    default:
      return state;
  }
};
const trackingSessionResponse = (state = "", action) => {
  switch (action.type) {
    case types.NEW_TRACKING_SESSION_RESPONSE:
      return action.payload;
    default:
      return state;
  }
};

export const reducers = combineReducers({
  profile,
  studentsList,
  trackingSessionResponse
});
