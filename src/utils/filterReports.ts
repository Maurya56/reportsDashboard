// utils/filterReports.ts
export const filterReportsByDateRange = (reports: Report[], startDate: string, endDate: string) => {
    return reports.filter(report => {
      const reportDate = new Date(report.date);
      return reportDate >= new Date(startDate) && reportDate <= new Date(endDate);
    });
  };