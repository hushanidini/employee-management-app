import { configureStore } from "@reduxjs/toolkit";
import {
  counterSlice,
  employeeSlice
} from "./features";

export const store = configureStore({
  reducer: {
    counterReducer: counterSlice,
    employeeReducer: employeeSlice
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
