export const groupReportsByDate = (reports: Report[]) => {
    return reports.reduce((acc, report) => {
      const key = report.date;
      if (!acc[key]) acc[key] = [];
      acc[key].push(report);
      return acc;
    }, {} as { [key: string]: Report[] });
  };