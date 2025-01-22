import React, { useEffect, useState } from 'react';
import { Button, Tabs } from 'antd';
import styled from 'styled-components';
import Grid from '../Grids/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import IndividualReport from './IndividualReport';

const { TabPane } = Tabs;

const ReportsContainer = styled.div`
  padding: 20px;
`;
const FolderIcon = styled.div`
  width: 100px;
  height: 100px;
  background-color: #f0f0f0;
  border: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  font-size: 24px;
`;

const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState('0');
  const reportsState = useSelector((state: RootState) => state.reports);
const dispatch = useDispatch();

  useEffect(()=>{
console.log("check")
  },[dispatch])
  
  return (
    <ReportsContainer>
      
    <Tabs activeKey={activeTab} onChange={setActiveTab}>
    
      {reportsState.folders.map((folder, folderIndex) => (
        
        
        <TabPane tab={folder.name} key={folderIndex.toString()}>
 {folder.csvFiles.length>0 ?
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>Reports</h1>
            <Button type="primary">Group Report</Button>
          </div>
           : null}
          {
          // folder.csvFiles.length === 0 ? (
          //   <FolderIcon>📁</FolderIcon>
          // ) : 

        
          (
            folder.csvFiles.map((csvFile, csvFileIndex) => (
            <IndividualReport key={csvFileIndex} csvFile={csvFile}  folderId={folder.id}/>
            ))
          )}
        </TabPane>
        
      ))}
    </Tabs>
  </ReportsContainer>
  );
};

export default Reports;