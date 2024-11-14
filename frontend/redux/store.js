import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authReducer from "../features/auth/authSlice";
import tasksSliceReducer from "../features/task/tasksSlice";
import paginationReducer from "./slices/paginationSlice";
import userReducer from "./slices/userSlice";
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
