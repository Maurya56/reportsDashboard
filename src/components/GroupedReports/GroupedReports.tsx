// // components/GroupedReports/GroupedReports.tsx
// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { groupReportsByDate } from '../../utils/groupReports';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../store';

// const GroupContainer = styled.div`
//   margin-bottom: 20px;
// `;

// const GroupHeader = styled.h3`
//   cursor: pointer;
//   display: flex;
//   align-items: center;
// `;

// const GroupedReports: React.FC = () => {
//   const reports = useSelector((state: RootState) => state.reports.reports);
//   const groupedByDate = groupReportsByDate(reports);
//   const [expandedGroups, setExpandedGroups] = useState<{ [key: string]: boolean }>({});

//   const toggleGroup = (date: string) => {
//     setExpandedGroups(prev => ({
//       ...prev,
//       [date]: !prev[date],
//     }));
//   };

//   return (
//     <div>
//       {Object.entries(groupedByDate).map(([date, reports]) => (
//         <GroupContainer key={date}>
//           <GroupHeader onClick={() => toggleGroup(date)}>
//             {date} {expandedGroups[date] ? '▼' : '▶'}
//           </GroupHeader>
//           {expandedGroups[date] && (
//             <ul>
//               {reports.map(report => (
//                 <li key={report.id}>{report.id}</li>
//               ))}
//             </ul>
//           )}
//         </GroupContainer>
//       ))}
//     </div>
//   );
// };

// export default GroupedReports;