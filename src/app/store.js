import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { thunk } from "redux-thunk";

import storage from "redux-persist/lib/storage";

import userSlice from "./slices/userSlice";
import postDetailSlice from "./slices/postDetailSlice";
import profileDetailSlice from "./slices/profileDetailSlice";
import searchUserSlice from "./slices/searchUserSlice";


const reducers = combineReducers({
  user: userSlice,
  postDetail:postDetailSlice,
  profileDetail:profileDetailSlice,
  searchUser:searchUserSlice
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});