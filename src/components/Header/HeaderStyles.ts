import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background-color: #f0f2f5;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }

  h1 {
    margin: 0 0 16px 0;

    @media (min-width: 768px) {
      margin: 0;
    }
  }

  .header-actions {
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 768px) {
      flex-direction: row;
  
    }

    & > * {
      margin: 8px 0;

      @media (min-width: 768px) {
        margin: 0 8px;
      }
    }
  }
`;