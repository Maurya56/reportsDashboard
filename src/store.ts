// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { reportsReducer } from './features/reports/reportsSlice';


export const store = configureStore({
  reducer: {
    reports: reportsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;