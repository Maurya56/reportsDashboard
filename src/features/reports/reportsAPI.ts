// features/reports/reportsAPI.ts
import axios from 'axios';
import Papa from 'papaparse';

export const loadCSVFiles = async (folderPath: string): Promise<any[]> => {
  const response = await axios.get(folderPath);
  const parsedData = Papa.parse(response.data, { header: true });
  return parsedData.data;
};