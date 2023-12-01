import { createStore,compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import rootReducer from "./reducers";

const ce = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const config = {
  key: "movies",
  storage,
  blacklist: ["movies"],
};

const persistedReducer = persistReducer(
  config,
  rootReducer
);

export const store = createStore(persistedReducer, ce(applyMiddleware(thunk)));
export const persistor = persistStore(store);

// import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
// import rootReducer from "./reducers";
//
// const store = createStore(
//   // moviesReducer,
//   rootReducer,
//   composeWithDevTools( applyMiddleware( thunk ) )
// );
//
// export default store;