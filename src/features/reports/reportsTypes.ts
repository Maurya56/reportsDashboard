export interface CsvFile {
  id: string;
  name: string;
  reports: any;
  isActive?: boolean | null;
}

export interface Folder {
  id: string;
  name: string;
  csvFiles: CsvFile[];
  groupedReports?: {
    id: string;
    name: string;
    tag: string;
    rows: any;
    isActive?: boolean | null;
  }[]; 
}

export interface ReportsState {
  folders: Folder[];
}

// export interface Report {
//   id: string;
//   name: string;
//   isActive: boolean;

//   // other report fields
// }
