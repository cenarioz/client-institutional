import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import filterReducer from "./slices/filterSlice";
import postsReducer from "./slices/postSlice";
import searchReducer from "./slices/searchSlice";
import userReducer from "./slices/userSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedUser = persistReducer(persistConfig, userReducer);
const persistedSearch = persistReducer(persistConfig, searchReducer);
const persistedFilter = persistReducer(persistConfig, filterReducer);
const persistedPosts = persistReducer(persistConfig, postsReducer);

export const store = configureStore({
  reducer: { persistedUser, persistedSearch, persistedPosts, persistedFilter },
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);
