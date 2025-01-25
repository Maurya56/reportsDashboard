import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReportsState, CsvFile, Folder } from "./reportsTypes";

const initialState: ReportsState = {
  folders: [],
};

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    setReports: (
      state,
      action: PayloadAction<{
        folderId: string;
        csvFileId: string;
        reports: any;
      }>
    ) => {
      const folder = state.folders.find(
        (f) => f.id === action.payload.folderId
      );
      if (folder) {
        const csvFile = folder.csvFiles.find(
          (file) => file.id === action.payload.csvFileId
        );
        if (csvFile) {
          csvFile.reports = action.payload.reports;
        }
      }
    },
    toggleActiveReport: (
      state,
      action: PayloadAction<{
        folderId: string;
        csvFileId: string;
        reportId: string;
      }>
    ) => {
      const folder = state.folders.find(
        (f) => f.id === action.payload.folderId
      );
      if (folder) {
        const csvFile = folder.csvFiles.find(
          (file) => file.id === action.payload.csvFileId
        );
        if (csvFile) {
          const report = csvFile.reports.find(
            (r) => r.id === action.payload.reportId
          );
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
      state.folders = state.folders.filter(
        (folder) => folder.id !== action.payload
      );
    },
    addCsvFile: (
      state,
      action: PayloadAction<{ folderId: string; csvFile: CsvFile }>
    ) => {
      const folder = state.folders.find(
        (f) => f.id === action.payload.folderId
      );
      if (folder) {
        folder.csvFiles.push(action.payload.csvFile);
      }
    },
    removeCsvFile: (
      state,
      action: PayloadAction<{ folderId: string; csvFileId: string }>
    ) => {
      const folder = state.folders.find(
        (f) => f.id === action.payload.folderId
      );
      if (folder) {
        folder.csvFiles = folder.csvFiles.filter(
          (file) => file.id !== action.payload.csvFileId
        );
      }
    },
    setGroupedReports: (
      state,
      action: PayloadAction<{
        folderId: string;
        groupedReports: { id: string; name: string; tag: string; rows: any }[];
      }>
    ) => {
      const folder = state.folders.find(
        (f) => f.id === action.payload.folderId
      );
      if (folder) {
        if (!folder.groupedReports) {
          folder.groupedReports = [];
        }
        folder.groupedReports.push(...action.payload.groupedReports);
      }
    },
    removeGroupedReports: (
      state,
      action: PayloadAction<{ folderId: string; id: string }>
    ) => {
      const folder = state.folders.find(
        (f) => f.id === action.payload.folderId
      );
      if (folder && folder.groupedReports) {
        folder.groupedReports = folder.groupedReports.filter(
          (report) => report.id !== action.payload.id
        );
      }
    },
    setVisibilityStateForNormalReports: (
      state,
      action: PayloadAction<{
        folderId: String;
        csvFileId: String;
        isActive: boolean;
      }>
    ) => {
      const folder = state.folders.find(
        (f) => f.id === action.payload.folderId
      );
      if (folder && folder.csvFiles) {
        const csvFile = folder.csvFiles.find(
          (file) => file.id === action.payload.csvFileId
        );
        if (csvFile) {
          csvFile.isActive = action.payload.isActive;
        }
      }
    },
  },
});

export const reportsReducer = reportsSlice.reducer;
export const {
  setReports,
  toggleActiveReport,
  addCsvFile,
  addFolder,
  removeCsvFile,
  removeFolder,
  setGroupedReports,
  removeGroupedReports,
  setVisibilityStateForNormalReports,
} = reportsSlice.actions;
export default reportsSlice;
