import React, { useEffect, useState } from "react";
import { Upload, Button, message, Select, Modal, Tooltip } from "antd";
import { FolderAddOutlined, UploadOutlined } from "@ant-design/icons";
import { HeaderContainer, Title, Subtitle, ButtonGroup } from "./HeaderStyles";
import { useDispatch, useSelector } from "react-redux";
import Papa from "papaparse";
import { addFolder, addCsvFile } from "../../features/reports/reportsSlice";
import { v4 as uuidv4 } from "uuid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RootState } from "../../store";

const { Option } = Select;

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const folders = useSelector((state: RootState) => state.reports.folders);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [displayModal, setDisplayModal] = useState<boolean>(false);
  const [folderName, setFolderName] = useState<string>("");

  const folder = useSelector((state: RootState) => state.reports.folders);

  const folderId = folder.find((f: any) => f.name === selectedFolder)?.id;
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(
    folderId
  );

  useEffect(() => {
    let currentFolder = folder.find((f: any) => f.name === selectedFolder);
    setSelectedFolderId(currentFolder?.id);
    setSelectedFolder(currentFolder?.name);
  }, [folder]);

  const handleFileUpload = (file: File) => {
    if (!selectedFolder || !selectedFolderId) {
      toast.error("Please select a folder to upload the CSV file.");
      return false;
    }
    console.log(selectedFolder, "selectedFolder");
    const reader = new FileReader();

    reader.onload = (e) => {
      const fileContent = e.target?.result as string;

      Papa.parse(fileContent, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          if (result.errors.length > 0) {
            message.error("Error parsing CSV file.");
            console.error("CSV parsing errors:", result.errors);
            return;
          }

          dispatch(
            addCsvFile({
              folderId: selectedFolderId ? selectedFolderId : "",
              csvFile: {
                id: uuidv4(),
                name: file.name,
                reports: result.data,
              },
            })
          );

          toast.success(`CSV file "${file.name}" uploaded successfully!`);
        },
        error: (error) => {
          toast.error("Error reading the file.");
        },
      });
    };

    reader.onerror = () => {
      toast.error("Error reading the file.");
    };

    reader.readAsText(file);
  };

  const handleFolderChange = (value: string) => {
    setSelectedFolder(value);
    const folder = folders.find((f: any) => f.id === value);
    setSelectedFolderId(folder ? folder.id : null);
    setFolderName(value);
  };

  const handleCreateFolder = () => {
    if (folderName) {
      let id = uuidv4();
      dispatch(
        addFolder({
          name: folderName,
          csvFiles: [],
          id: id,
        })
      );
      setSelectedFolderId(id);
      toast.success(`Folder "${folderName}" created successfully!`);
    } else {
      toast.error("Folder name cannot be empty.");
    }
  };

  return (
    <HeaderContainer>
      <div className="title-group">
        <Title>DASH_CSV</Title>
        <Subtitle>Manage and Organize Your CSV Files</Subtitle>
      </div>
      <div className="header-actions">
        <Select
          placeholder="Select Folder"
          style={{ width: 200, marginRight: 16 }}
          onChange={handleFolderChange}
          value={selectedFolder}
        >
          {folders.map((folder) => (
            <Option key={folder.id} value={folder.id}>
              {folder.name}
            </Option>
          ))}
        </Select>

        <ButtonGroup>
          <Tooltip
            title={selectedFolder == null ? "Please select a folder first" : ""}
          >
            <Upload beforeUpload={handleFileUpload} showUploadList={false}>
              <Button
                type="primary"
                icon={<UploadOutlined />}
                disabled={selectedFolder == null}
              >
                Upload CSV
              </Button>
            </Upload>
          </Tooltip>
          <Button
            icon={<FolderAddOutlined />}
            onClick={() => setDisplayModal(true)}
          >
            Create New Folder
          </Button>
        </ButtonGroup>
      </div>
      <ToastContainer />
      <Modal
        title="Create New Folder"
        visible={displayModal}
        onOk={() => {
          if (folderName !== "") {
            handleCreateFolder();
            setDisplayModal(false);
            setSelectedFolder(folderName);
            setFolderName("");
          } else {
            toast.error("Folder name cannot be empty.");
          }
        }}
        onCancel={() => {
          setDisplayModal(false);
          setFolderName("");
        }}
        okText="Create"
        cancelText="Cancel"
      >
        <div
          style={{ display: "flex", flexDirection: "column", padding: "8px" }}
        >
          <div>
            <p>Enter the name of the folder you want to create:</p>
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Folder name"
              style={{ width: "100%", padding: "8px", fontSize: "14px" }}
            />
          </div>
        </div>
      </Modal>
    </HeaderContainer>
  );
};

export default Header;
