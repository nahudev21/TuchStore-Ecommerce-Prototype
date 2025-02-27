import { configureStore } from "@reduxjs/toolkit";
import sessionStorage from "redux-persist/es/storage/session";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../store/slices/userSlice";
import cartReducer from "../store/slices/cartSlice";

const persistConfig = {
  key: "root",
  storage: sessionStorage,
  whitelist: ["user", "cart"],
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
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
