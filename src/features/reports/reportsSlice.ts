// features/reports/reportsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReportsState ,Report, CsvFile, Folder  } from './reportsTypes';



const initialState: ReportsState = {
  folders: [],
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
    setReports: (state, action: PayloadAction<{ folderId: string, csvFileId: string, reports: Report[] }>) => {
      const folder = state.folders.find(f => f.id === action.payload.folderId);
      if (folder) {
        const csvFile = folder.csvFiles.find(file => file.id === action.payload.csvFileId);
        if (csvFile) {
          csvFile.reports = action.payload.reports;
        }
      }
    },
    setFilters: (state, action: PayloadAction<ReportsState['filters']>) => {
      state.filters = action.payload;
    },
    toggleActiveReport: (state, action: PayloadAction<{ folderId: string, csvFileId: string, reportId: string }>) => {
      const folder = state.folders.find(f => f.id === action.payload.folderId);
      if (folder) {
        const csvFile = folder.csvFiles.find(file => file.id === action.payload.csvFileId);
        if (csvFile) {
          const report = csvFile.reports.find(r => r.id === action.payload.reportId);
          if (report) {
            report.isActive = !report.isActive;
          }
        }
      }
    },
    addFolder: (state, action: PayloadAction<Folder>) => {
      state.folders.push(action.payload);
    },
    removeFolder: (state, action: PayloadAction<string>) => {
      state.folders = state.folders.filter(folder => folder.id !== action.payload);
    },
    addCsvFile: (state, action: PayloadAction<{ folderId: string, csvFile: CsvFile }>) => {
      const folder = state.folders.find(f => f.id === action.payload.folderId);
      if (folder) {
        folder.csvFiles.push(action.payload.csvFile);
      }
    },
    removeCsvFile: (state, action: PayloadAction<{ folderId: string, csvFileId: string }>) => {
      const folder = state.folders.find(f => f.id === action.payload.folderId);
      if (folder) {
        folder.csvFiles = folder.csvFiles.filter(file => file.id !== action.payload.csvFileId);
      }
    },

  },
});

export const reportsReducer =reportsSlice.reducer
export const { setReports, setFilters, toggleActiveReport,addCsvFile,addFolder,removeCsvFile,removeFolder } = reportsSlice.actions;
export default reportsSlice