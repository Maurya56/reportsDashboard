import React from "react";
import { useCallback, useEffect, useState } from "react";
import { CsvFile } from "../../features/reports/reportsTypes";
import Grid from "../Grids/Grid";
import { DeleteOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  removeCsvFile,
  setVisibilityStateForNormalReports,
} from "../../features/reports/reportsSlice";
import {
  Button,
  Select,
  Switch,
  Typography,
  Space,
  Tooltip,
  Popconfirm,
} from "antd";
import { GridContainer } from "../Grids/styles/GridStyle";
import { StyledCard, ControlsContainer } from "./styles/IndividualReportStyle";
import { IndividualReportProps } from "./types/IndividualReportTypes";

const { Option } = Select;
const { Title } = Typography;

const IndividualReport: React.FC<IndividualReportProps> = ({
  csvFile,
  folderId,
}) => {
  const dispatch = useDispatch();
  const [hideReports, setHideReports] = useState<boolean>(false);
  const [reportKeys, setReportKeys] = useState<string[]>([]);
  const [displayCollapseButton, setDisplayCollapseButton] =
    useState<boolean>(true);
  const [selectTag, setSelectedTag] = useState<string>("");

  useEffect(() => {
    if (csvFile?.reports.length > 0) {
      if (reportKeys.length < 1) {
        const findKeys: string[] = Object.keys(csvFile.reports[0]);
        setReportKeys(findKeys);
      }
    }
  }, [csvFile, reportKeys.length]);

  const handleToggle = useCallback(() => {
    dispatch(
      setVisibilityStateForNormalReports({
        folderId,
        csvFileId: csvFile.id,
        isActive: !csvFile.isActive,
      })
    );
  }, [dispatch, folderId, csvFile.id, csvFile.isActive]);

  useEffect(() => {
    setHideReports(csvFile.isActive);
    setDisplayCollapseButton(!csvFile.isActive);
  }, [csvFile.isActive]);

  const handleDeleteFile = () => {
    dispatch(removeCsvFile({ folderId, csvFileId: csvFile.id }));
  };

  return (
    <>
      <StyledCard
        title={<Title level={4}>{csvFile.name}</Title>}
        extra={
          <Space>
            <Tooltip title={csvFile.isActive ? "Active" : "InActive"}>
              <Switch checked={!csvFile.isActive} onChange={handleToggle} />
            </Tooltip>
            <Popconfirm
              title="Are you sure you want to delete this file?"
              onConfirm={handleDeleteFile}
              okText="Yes"
              cancelText="No"
            >
              <Tooltip title="Delete file">
                <Button icon={<DeleteOutlined />} danger />
              </Tooltip>
            </Popconfirm>
          </Space>
        }
      >
        <ControlsContainer>
          <Select
            placeholder="Select Tag"
            style={{ width: "100%", maxWidth: 200 }}
            onChange={setSelectedTag}
            value={selectTag}
          >
            {reportKeys.map((tag, index) => (
              <Option key={index} value={tag}>
                {tag}
              </Option>
            ))}
          </Select>
          <Button
            onClick={() => setSelectedTag("")}
            disabled={selectTag === ""}
          >
            Clear Tags
          </Button>
          {displayCollapseButton && (
            <Tooltip title={hideReports ? "Show reports" : "Hide reports"}>
              <Button
                icon={hideReports ? <DownOutlined /> : <UpOutlined />}
                onClick={() => setHideReports((prev) => !prev)}
              />
            </Tooltip>
          )}
        </ControlsContainer>
      </StyledCard>
      {!hideReports && (
        <GridContainer>
          {csvFile.reports.length > 0 ? (
            <Grid rowData={csvFile.reports} rowGroup={selectTag} />
          ) : (
            <p>No reports available</p>
          )}
        </GridContainer>
      )}
    </>
  );
};

export default IndividualReport;
