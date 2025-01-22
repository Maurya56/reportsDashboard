// components/Reports/Reports.tsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadCSVFiles } from '../../features/reports/reportsAPI';
import { setReports } from '../../features/reports/reportsSlice';

const Reports: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchReports = async () => {
      const reports = await loadCSVFiles('/path/to/folder');
      dispatch(setReports(reports));
    };
    fetchReports();
  }, [dispatch]);

  return <div>Reports Content</div>;
};

export default Reports;