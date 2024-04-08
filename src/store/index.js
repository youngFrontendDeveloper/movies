import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { moviesApi } from "../services/moviesApi";

export const store = configureStore( {
    reducer: {
      [ moviesApi.reducerPath ]: moviesApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat( moviesApi.middleware ),
    devTools: true,
  }
);
setupListeners( store.dispatch );