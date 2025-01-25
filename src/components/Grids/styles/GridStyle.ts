import styled from "styled-components"

export const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
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
      border-top: 1px solid #ccc;
      font-size: 10px;
    }
  }
`

export const ResponsiveGridContainer = styled(GridContainer)`
  height: 400px;
  
  @media (max-width: 768px) {
    height: 400px;
  }
`

export const GridWrapper = styled.div`
  padding: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`

