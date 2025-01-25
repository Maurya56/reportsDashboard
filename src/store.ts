// store.ts
import { configureStore } from "@reduxjs/toolkit";
import { reportsReducer } from "./features/reports/reportsSlice";
import { combineReducers } from "redux";

export const store = configureStore({
  reducer: combineReducers({
    reports: reportsReducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
