// features/reports/reportsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Report {
  id: string;
  date: string;
  tags: string[];
  data: any[];
  isActive: boolean;
}

interface ReportsState {
  reports: Report[];
  filters: {
    dateRange: { start: string; end: string };
    tags: string[];
    isActive: boolean | null;
  };
}

const initialState: ReportsState = {
  reports: [],
  filters: {
    dateRange: { start: '', end: '' },
    tags: [],
    isActive: null,
  },
};

const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    setReports: (state, action: PayloadAction<Report[]>) => {
      state.reports = action.payload;
    },
    setFilters: (state, action: PayloadAction<ReportsState['filters']>) => {
      state.filters = action.payload;
    },
    toggleActiveReport: (state, action: PayloadAction<string>) => {
      const report = state.reports.find((r) => r.id === action.payload);
      if (report) {
        report.isActive = !report.isActive;
      }
    },
  },
});

export const reportsReducer =reportsSlice.reducer
export const { setReports, setFilters, toggleActiveReport } = reportsSlice.actions;
export default reportsSlice