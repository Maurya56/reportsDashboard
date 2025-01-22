import styled from "styled-components";


export const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px; // Ensure the container takes full height
  width: 100%;

  @media (max-width: 768px) {
    .ag-paging-panel {
      position: sticky;
      bottom: 0;
      background: white;
      z-index: 1;
      height: 70px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #ccc; // Add a top border for separation
      font-size: 10px;
    }
  }
`;
