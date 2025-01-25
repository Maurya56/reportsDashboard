import React from "react";
import { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  List,
  Modal,
  Select,
  Tabs,
  Typography,
  Empty,
  Card,
  Space,
  Input,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import IndividualReport from "./IndividualReport";
import { ReportsState } from "../../features/reports/reportsTypes";
import { v4 as uuidv4 } from "uuid";
import {
  removeFolder,
  setGroupedReports,
} from "../../features/reports/reportsSlice";
import GroupedReport from "../GroupedReports/GroupedReports";
import { toast } from "react-toastify";
import {
  CloseOutlined,
  FolderOutlined,
  GroupOutlined,
} from "@ant-design/icons";
import { StyledCard } from "./styles/IndividualReportStyle";
import { ReportsContainer } from "./styles/ReportsStyle";

const { TabPane } = Tabs;
const { Title, Text } = Typography;
const { Option } = Select;

const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState("0");
  const reportsState = useSelector((state: RootState) => state.reports);
  const [csvReports, setCSVReports] = useState<ReportsState>(reportsState);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFolderFiles, setSelectedFolderFiles] = useState([]);
  const [groupedName, setGroupedName] = useState<string>("");
  const [displayDeleteFolder, setDisplayDeleteFolder] =
    useState<boolean>(false);
  const [deleteFolderId, setDeleteFolderId] = useState<string>("");

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [rowData, setRowData] = useState([]);
  const [commonTags, setCommonTags] = useState([]);
  const [selectTag, setSelectedTag] = useState("");
  const dispatch = useDispatch();

  const handleGroupReport = () => {
    const tabIndex = Number.parseInt(activeTab, 10);
    if (isNaN(tabIndex)) {
      console.error("Invalid tab index:", activeTab);
      return;
    }

    const selectedFolder = csvReports.folders[tabIndex];
    if (selectedFolder) {
      const updatedFiles = selectedFolder.csvFiles.filter(
        (file) => file.isActive !== true
      );
      setSelectedFolderFiles(updatedFiles);
      setIsModalVisible(true);
    } else {
      console.error("No folder found for tab index:", tabIndex);
    }
  };

  const handleCancel = () => {

     // Clear fields
  setSelectedFiles([]);
  setCheckedItems({});
  setGroupedName("");
  setSelectedTag("");
  setCommonTags([]);
  
    setIsModalVisible(false);
  };

  const updateTags = (selectedFiles) => {
    if (selectedFiles.length === 0) {
      setCommonTags([]);
      return;
    }

    let newTags = new Set(Object.keys(selectedFiles[0].reports[0] || {}));

    selectedFiles.forEach((file) => {
      if (file.reports && file.reports.length > 0) {
        const fileTags = new Set();
        file.reports.forEach((report) => {
          Object.keys(report).forEach((key) => {
            fileTags.add(key);
          });
        });
        newTags = new Set([...newTags].filter((tag) => fileTags.has(tag)));
      }
    });

    setCommonTags(Array.from(newTags));
  };

  const handleCheckboxChange = (file, checked) => {
    setCheckedItems((prev) => ({
      ...prev,
      [file.name]: checked,
    }));

    if (checked) {
      setSelectedFiles((prev) => {
        const updatedFiles = [...prev, file];
        updateTags(updatedFiles);
        return updatedFiles;
      });
    } else {
      setSelectedFiles((prev) => {
        const updatedFiles = prev.filter((f) => f !== file);
        updateTags(updatedFiles);
        return updatedFiles;
      });
    }
  };

  const formatDataForAGGrid = (groupedData) => {
    return Object.keys(groupedData).map((key) => ({
      key: key,
      rows: groupedData[key],
    }));
  };

  const handleSelectedFiles = () => {
    if (groupedName === "") {
      toast.error("Enter the file name");
      return;
    }
    if (selectedFiles.length > 1 && selectTag !== "") {
      try {
        const fileDataArray = selectedFiles.map((file) => file.reports);
        const combinedData = fileDataArray.flat();

        const groupedData = groupDataByTag(combinedData, selectTag);
        console.log(groupedData,'groupedData')
        const formattedValue = formatDataForAGGrid(groupedData);

        setRowData(formattedValue);
        console.log(formattedValue,'formattedValue')
        dispatch(
          setGroupedReports({
            folderId: csvReports.folders[Number.parseInt(activeTab)].id,
            groupedReports: [
              {
                id: uuidv4(),
                name: groupedName,
                tag: selectTag,
                rows: formattedValue,
              },
            ],
          })
        );
      } catch (error) {
        console.error("Error processing files:", error);
      }
    }

      // Clear fields
  setSelectedFiles([]);
  setCheckedItems({});
  setGroupedName("");
  setSelectedTag("");
  setCommonTags([]);

    setIsModalVisible(false);
  };

  const groupDataByTag = (data, tagKey) => {
    return data.reduce((grouped, row) => {
      const tag = row[tagKey];
      if (!grouped[tag]) {
        grouped[tag] = [];
      }
      grouped[tag].push(row);
      return grouped;
    }, {});
  };

  useEffect(() => {
    setCSVReports(reportsState);
  }, [reportsState]);

  useEffect(() => {
    setSelectedTag("");
    setSelectedFiles([]);
    setCommonTags([]);
    setCheckedItems({});
  }, [activeTab]);

  const handleDeleteFolder = (id: string) => {
    setDisplayDeleteFolder(true);
    setDeleteFolderId(id);
  };

  return (
    <ReportsContainer>
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        {csvReports.folders.map((folder, folderIndex) => (
          <TabPane
            tab={
              <span>
                <FolderOutlined /> {folder.name}
                <Button
                  type="text"
                  icon={<CloseOutlined />}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteFolder(folder.id);
                  }}
                  style={{ marginLeft: 8 }}
                />
              </span>
            }
            key={folderIndex.toString()}
          >
            <StyledCard>
              {folder.csvFiles.length > 0 ? (
                <Space direction="vertical" style={{ width: "100%" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Title level={3}>Reports</Title>
                    <Button
                      type="primary"
                      icon={<GroupOutlined />}
                      onClick={handleGroupReport}
                    >
                      Group Report
                    </Button>
                  </div>
                  {folder.csvFiles.map((csvFile, csvFileIndex) => (
                    <IndividualReport
                      key={csvFileIndex}
                      csvFile={csvFile}
                      folderId={folder.id}
                    />
                  ))}
                </Space>
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    <Text type="secondary">Add Some Files Here</Text>
                  }
                />
              )}
            </StyledCard>
            {folder.groupedReports && folder.groupedReports.length > 0 && (
              <StyledCard title={<Title level={4}>Grouped Data Folders</Title>}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  {folder.groupedReports.map(
                    (groupedFile, groupedFileIndex) => (
                      <GroupedReport
                        key={groupedFileIndex}
                        file={groupedFile}
                        folderId={folder.id}
                      />
                    )
                  )}
                </Space>
              </StyledCard>
            )}
          </TabPane>
        ))}
      </Tabs>

      <Modal
        title="Group Report"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={handleSelectedFiles}
            disabled={selectTag.length === 0}
          >
            Process Selected Files
          </Button>,
        ]}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <List
            dataSource={selectedFolderFiles}
            renderItem={(file) => (
              <List.Item>
                <Checkbox
                  checked={checkedItems[file.name] || false}
                  onChange={(e) => handleCheckboxChange(file, e.target.checked)}
                >
                  {file.name}
                </Checkbox>
              </List.Item>
            )}
          />

          <Select
            placeholder="Select Tag"
            style={{ width: "100%" }}
            onChange={setSelectedTag}
            value={selectTag}
          >
            {commonTags.map((tag, index) => (
              <Option key={index} value={tag}>
                {tag}
              </Option>
            ))}
          </Select>
          <div>
            <Text>Enter the name of the File you want to Group:</Text>
            <Input
              value={groupedName}
              onChange={(e) => setGroupedName(e.target.value)}
              placeholder="File name"
            />
          </div>
        </Space>
      </Modal>

      <Modal
        title="Delete Folder"
        visible={displayDeleteFolder}
        onOk={() => {
          dispatch(removeFolder(deleteFolderId));
          setDisplayDeleteFolder(false);
          toast.success("Folder Deleted Successfully");
        }}
        onCancel={() => {
          setDeleteFolderId("");
          setDisplayDeleteFolder(false);
        }}
        okText="Delete"
        cancelText="Cancel"
      >
        <Space direction="vertical">
          <Title level={4}>Do you wish to delete your folder?</Title>
          <Text type="warning">
            If you delete your folder, all your files will be deleted.
          </Text>
        </Space>
      </Modal>
    </ReportsContainer>
  );
};

export default Reports;
