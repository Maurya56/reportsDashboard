import styled from "styled-components";

interface SidebarContainerProps {
  showSidebar: boolean;
}

export const SidebarContainer = styled.div<SidebarContainerProps>`
  width: ${(props) => (props.showSidebar ? '250px' : '30px')};
  background-color: #f0f2f5;
  padding: 16px;
  transition: width 0.3s, left 0.3s;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
 

  @media (max-width: 768px) {
    width: ${(props) => (props.showSidebar ? '250px' : '30px')};
    z-index: 1000;
  }
`;

export  const FlexColumnDivStyle = styled.div<{ $gap?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.$gap || '0'};
`;

export  const FlexRowDivStyle = styled.div<{ $gap?: string }>`
  display: flex;
  flex-direction: row;
  gap: ${(props) => props.$gap || '0'};
  align-items: center;
  justify-content: space-between;
`;