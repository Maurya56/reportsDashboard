import React, { useEffect, useState } from 'react';
import { Upload, Button, message, Select, Modal } from 'antd';
import { FolderAddOutlined, UploadOutlined } from '@ant-design/icons';
import { HeaderContainer } from './HeaderStyles';
import { useDispatch, useSelector } from 'react-redux';
import Papa from 'papaparse';
import { addFolder, addCsvFile } from '../../features/reports/reportsSlice';
import { v4 as uuidv4 } from 'uuid'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RootState } from '../../store';

const { Option } = Select;
const Header: React.FC = () => {

    const dispatch = useDispatch();
    const folders = useSelector((state: RootState) => state.reports.folders);
    const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
    const [displayModal, setDisplayModal] = useState<boolean>(false);
    const [folderName, setFolderName] = useState<string>('');
    const folder=useSelector((state:RootState)=> state.reports.folders)

    const selectedFolderId= folder.find((f:any)=> f.name===selectedFolder)?.id
    const handleFileUpload = (file: File) => {
        if (!selectedFolder) {
            toast.error('Please select a folder to upload the CSV file.');
            return false;
          }
          console.log(selectedFolder,"selectedFolder")
        const reader = new FileReader();
      
        reader.onload = (e) => {
          const fileContent = e.target?.result as string;
      
          // Parse the CSV file content
          // We assume CSV file has a header row
          Papa.parse(fileContent, {
            header: true, 
            skipEmptyLines: true, 
            complete: (result) => {
              if (result.errors.length > 0) {
                message.error('Error parsing CSV file.');
                console.error('CSV parsing errors:', result.errors);
                return;
              }
      
              // Dispatch the parsed CSV data to Redux
              dispatch(addCsvFile({
                folderId: selectedFolderId ? selectedFolderId : '',
                csvFile: {
                  id: uuidv4(),
                  name: file.name,
                  reports: result.data
                }
              }));

              // Notify the user that the file was uploaded and parsed successfully
             toast.success(`CSV file "${file.name}" uploaded successfully!`);
              
            },
            error: (error) => {
              toast.error('Error reading the file.');
              
            },
          });
        };
      
        reader.onerror = () => {
        toast.error('Error reading the file.');
        };
      
        // Read the file content as a text string
        reader.readAsText(file);
      
      };

      const handleFolderChange = (value: string) => {
        setSelectedFolder(value);
        const selectedFolder = folders.find(folder => folder.id === value);
        if (selectedFolder) {
          setFolderName(selectedFolder.name);
        }
      };

      const handleCreateFolder = () => {
        if (folderName) {
            dispatch(addFolder({
                name: folderName,
                csvFiles: [],
                id: uuidv4() // Generate a unique ID
            }));
            toast.success(`Folder "${folderName}" created successfully!`);
        } else {
            toast.error('Folder name cannot be empty.');
        }
    };

  
    
    
  return (
    <HeaderContainer>
      <h1 style={{color:'grey'}}>DASH_CSV</h1>
      <div className="header-actions">
      <Select
        placeholder="Select Folder"
        style={{ width: 200, marginRight: 16 }}
        onChange={handleFolderChange}
        value={selectedFolder}
      >
        {folders.map(folder => (
          <Option key={folder.id} value={folder.id}>
            {folder.name}
          </Option>
        ))}
      </Select>
      
      <Upload beforeUpload={handleFileUpload} showUploadList={false} >
        <Button icon={<UploadOutlined />} disabled={selectedFolder==null}>Upload CSV</Button>
      </Upload>
      <Button icon={<FolderAddOutlined />} onClick={()=>setDisplayModal(true)}>
        Create New Folder
      </Button>
      </div>
      <ToastContainer/>
      <Modal
      title="Create New Folder"
      visible={displayModal}
      onOk={()=>{
        if(folderName!=''){
            handleCreateFolder();
            setDisplayModal(false);
            setSelectedFolder(folderName);
            setFolderName('');
        }
        else{
            toast.error('Folder name cannot be empty.');
        }
      }} 
      onCancel={()=>setDisplayModal(false)} 
      okText="Create"
      cancelText="Cancel"
      >
          <div>
          <p>Enter the name of the folder you want to create:</p>
          <input
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)} 
            placeholder="Folder name"
            style={{ width: '100%', padding: '8px', fontSize: '14px' }}
          />
        </div>
      </Modal>
    </HeaderContainer>
  );
};

export default Header;