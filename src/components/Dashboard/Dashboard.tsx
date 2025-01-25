// components/Dashboard/Dashboard.tsx
import React from 'react';
import Header from '../Header/Header';
import Reports from '../Reports/Reports';
import { DashboardContainer, MainContent } from './DashBoardStyles';

const Dashboard: React.FC = () => {
  return (
    <DashboardContainer >
      <MainContent>
        <Header />
        <Reports />
      </MainContent>
     
    </DashboardContainer>
  );
};

export default Dashboard;