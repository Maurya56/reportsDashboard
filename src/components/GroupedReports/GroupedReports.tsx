// components/GroupedReports/GroupedReports.tsx
import React, { useState } from 'react';
import { groupReportsByDate } from '../../utils/groupReports';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const GroupedReports: React.FC = () => {
  const reports = useSelector((state: RootState) => state.reports.reports);
  const groupedByDate = groupReportsByDate(reports);
  const [expandedGroups, setExpandedGroups] = useState<{ [key: string]: boolean }>({});

  const toggleGroup = (date: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [date]: !prev[date],
    }));
  };

  return (
    <div>
      {Object.entries(groupedByDate).map(([date, reports]) => (
        <div key={date}>
          <h3 onClick={() => toggleGroup(date)}>{date} {expandedGroups[date] ? '▼' : '▶'}</h3>
          {expandedGroups[date] && (
            <ul>
              {reports.map(report => (
                <li key={report.id}>{report.id}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default GroupedReports;