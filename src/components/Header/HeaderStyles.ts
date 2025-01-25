import styled from "styled-components";
import { Button } from "antd";

export const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  background-color: #f0f2f5;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }

  .title-group {
    margin-bottom: 16px;
    text-align: center;

    @media (min-width: 768px) {
      margin-bottom: 0;
      text-align: left;
    }
  }

  .header-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: flex-end;
      width: auto;
    }

    & > * {
      margin: 8px 0;

      @media (min-width: 768px) {
        margin: 0 0 0 16px;
      }
    }
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: #1890ff;
  margin: 0;
`;

export const Subtitle = styled.h2`
  font-size: 1rem;
  color: #8c8c8c;
  margin: 8px 0 0;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    width: auto;
  }

  & > * {
    margin: 8px 0;

    @media (min-width: 768px) {
      margin: 0 0 0 16px;
    }
  }
`;

export const StyledButton = styled(Button)`
  &.ant-btn-primary {
    background-color: #1890ff;
    border-color: #1890ff;

    &:hover,
    &:focus {
      background-color: #40a9ff;
      border-color: #40a9ff;
    }

    &:active {
      background-color: #096dd9;
      border-color: #096dd9;
    }

    &[disabled] {
      background-color: #d9d9d9;
      border-color: #d9d9d9;
    }
  }

  &.ant-btn {
    &:hover,
    &:focus {
      color: #40a9ff;
      border-color: #40a9ff;
    }

    &:active {
      color: #096dd9;
      border-color: #096dd9;
    }
  }
`;
