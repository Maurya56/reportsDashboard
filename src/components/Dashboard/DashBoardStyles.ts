import styled from "styled-components";

export const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;
