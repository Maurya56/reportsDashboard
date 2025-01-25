import React from "react";
import { useState } from "react";
import { DeleteOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { removeGroupedReports } from "../../features/reports/reportsSlice";
import { Button, Space, Typography } from "antd";
import GroupedGrid from "../Grids/GroupedGrid";
import { StyledCard } from "./GroupedReportStyles";
import { IndividualReportProps } from "./GroupedReportTypes";

const { Title } = Typography;

const GroupedReport: React.FC<IndividualReportProps> = ({ file, folderId }) => {
  const dispatch = useDispatch();
  const [hideReports, setHideReports] = useState<boolean>(false);

  const handleDeleteFile = () => {
    dispatch(removeGroupedReports({ folderId: folderId, id: file.id }));
  };

  return (
    <StyledCard
      title={<Title level={4}>{file.name}</Title>}
      extra={
        <Space>
          <Button
            icon={hideReports ? <DownOutlined /> : <UpOutlined />}
            onClick={() => setHideReports((prev) => !prev)}
          />
          <Button icon={<DeleteOutlined />} onClick={handleDeleteFile} danger />
        </Space>
      }
    >
      {!hideReports && (
        <>
          {file ? (
            <GroupedGrid rowData={file.rows} />
          ) : (
            <p>No reports available</p>
          )}
        </>
      )}
    </StyledCard>
  );
};

export default GroupedReport;
