import { configureStore } from "@reduxjs/toolkit";
import sessionStorage from "redux-persist/es/storage/session";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../store/slices/userSlice";

const persistConfig = {
  key: "root",
  storage: sessionStorage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
      },
    }),
});

export default store;
