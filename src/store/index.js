import { createStore, compose } from "redux";
// import { createLogger } from "redux-logger";

import { reducers } from "./reducers";

// const logger = createLogger({
//   collapsed: (getState, action, logEntry) => !logEntry.error
// });

const store = createStore(
  reducers,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
);

export default store;
