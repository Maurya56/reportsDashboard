export interface CsvFile {
    id: string;
    name: string;
    reports: Report[];
  }
  
  export interface Folder {
    id: string;
    name: string;
    csvFiles: CsvFile[];
  }
  
  export interface ReportsState {
    folders: Folder[];
    filters: {
      dateRange: { start: string; end: string };
      tags: string[];
      isActive: boolean | null;
    };
  }
  
  export interface Report {
    id: string;
    name: string;
    isActive: boolean;
    // other report fields
  }