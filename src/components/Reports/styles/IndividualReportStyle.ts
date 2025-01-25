import { Card } from "antd";
import styled from "styled-components";

export const StyledCard = styled(Card)`
  margin-bottom: 16px;
  .ant-card-head {
    background-color: #f0f2f5;
  }
`;

export const ControlsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const GridContainer = styled.div`
  margin-top: 16px;
`;
