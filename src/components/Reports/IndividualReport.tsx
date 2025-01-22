import React, { useState } from 'react'
import { CsvFile } from '../../features/reports/reportsTypes';
import Grid from '../Grids/Grid';
import { FlexRowDivStyle } from '../Sidebar/SidebarStyles';
import { DeleteOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { removeCsvFile } from '../../features/reports/reportsSlice';



interface IndividualReportProps {
csvFile: CsvFile;
folderId: string;

}

const IndividualReport: React.FC<IndividualReportProps> = ({csvFile,folderId}) => {
   const dispatch=useDispatch();
   const [hideReports, setHideReports] = useState<boolean>(false);
    const handleDeleteFile = () => {
    dispatch(removeCsvFile({ folderId, csvFileId: csvFile.id }));
    }
  return (
    <div  style={{margin:'8px'}}>
        <FlexRowDivStyle $gap='12px' style={{backgroundColor:'lightblue', padding:'8px'}}>
        <h3>{csvFile.name}</h3>
        <div style={{display:'flex', gap:'8px'}}>
        <DeleteOutlined onClick={handleDeleteFile} />
        {hideReports ? <DownOutlined onClick={()=>setHideReports(prev=>!prev)}/> : <UpOutlined  onClick={()=>setHideReports(prev=>!prev)}/>}
        </div>
        
        </FlexRowDivStyle>

        {!hideReports &&
        <>
          {csvFile.reports.length > 0 ? (
            <Grid rowData={csvFile.reports} />
          ) : (
            <p>No reports available</p>
          )}
        </>

        }
    
  
  </div>
  )
}

export default IndividualReport