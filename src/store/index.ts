import { createStore, compose } from "redux";

import { reducers } from "./reducers";

const store = createStore(
  reducers,
  compose(
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
