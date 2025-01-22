// components/Dashboard/Dashboard.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Reports from '../Reports/Reports';

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MainContent = styled.div<{ showSidebar: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
 

`;
// transition: margin-left 0.3s;
// margin-left: ${(props) => (props.showSidebar ? '250px' : '50px')};ia (max-width: 768px) {
//   margin-left: ${(props) => (props.showSidebar ? '50px' : '50px')};
// }

const Dashboard: React.FC = () => {
    const [showSidebar, setShowSidebar] = useState<boolean>(false);
  return (
    <DashboardContainer >
      {/* <Sidebar  showSidebar={showSidebar} setShowSidebar={setShowSidebar}/> */}
      <MainContent showSidebar={showSidebar}>
        <Header />
        <Reports />
      </MainContent>
     
    </DashboardContainer>
  );
};

export default Dashboard;