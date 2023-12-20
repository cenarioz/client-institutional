import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import filterReducer from "./slices/filterSlice";
import postsReducer from "./slices/postSlice";
import searchReducer from "./slices/searchSlice";
import userReducer from "./slices/userSlice";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window === "undefined" ? createNoopStorage() : createWebStorage('local');


const persistConfig = {
  key: "root",
  storage,
};

const reducers = {
  persistedUser: persistReducer(persistConfig, userReducer),
  persistedSearch: persistReducer(persistConfig, searchReducer),
  persistedFilter: persistReducer(persistConfig, filterReducer),
  persistedPosts: persistReducer(persistConfig, postsReducer),
};

export const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);
