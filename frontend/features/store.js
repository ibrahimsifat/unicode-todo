import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./auth/authSlice";
import paginationReducer from "./pagination/paginationSlice";
import tasksSliceReducer from "./task/tasksSlice";
import userReducer from "./user/userSlice";
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    tasks: tasksSliceReducer,
    user: userReducer,
    auth: authReducer,
    pagination: paginationReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});