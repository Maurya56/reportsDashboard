import React, { useEffect, useState } from 'react'
import { CsvFile } from '../../features/reports/reportsTypes';
import Grid from '../Grids/Grid';
import { FlexRowDivStyle } from '../Sidebar/SidebarStyles';
import { DeleteOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { removeCsvFile } from '../../features/reports/reportsSlice';
import { Button, Select } from 'antd';



interface IndividualReportProps {
csvFile: CsvFile;
folderId: string;

}

const {Option}=Select
const IndividualReport: React.FC<IndividualReportProps> = ({csvFile,folderId}) => {
   const dispatch=useDispatch();
   const [hideReports, setHideReports] = useState<boolean>(false);
   const [rowGroup,setRowGroup]=useState<boolean>(false);
   const [reportKeys,setReportKeys]=useState<any>([]);
   const [selectTag,setSelectedTag]=useState<string>('')



   useEffect(() => {
    console.log("Dumb")
    if (csvFile?.reports.length > 0) {
      if (reportKeys.length < 1) {
        let findKeys: string[] = [];
        Object.keys(csvFile.reports[0]).forEach((key) => findKeys.push(key));
        setReportKeys(findKeys);
      }
    }
  }, [csvFile]);
  

    const handleDeleteFile = () => {
    dispatch(removeCsvFile({ folderId, csvFileId: csvFile.id }));
    }
  return (
    <div  style={{margin:'8px', display:'flex',flexDirection:'column'}}>
        <FlexRowDivStyle $gap='12px' style={{backgroundColor:'lightblue', padding:'8px',flexWrap: 'wrap'}}>
        <h3 style={{minWidth: '150px'}}>{csvFile.name}</h3>
        <div style={{display:'flex', gap:'8px',minWidth: '200px', flexWrap:'wrap'}}>

<div>


        <Select
        placeholder="Select Tag"
        style={{ width: 200, marginRight: 16 }}
        onChange={setSelectedTag}
        value={selectTag}
      >
        {reportKeys.map((tag,index) => (
          <Option key={index} value={tag}>
            {tag}
          </Option>
        ))}
      </Select>
      </div>
      <div>

     
          <Button onClick={()=>setSelectedTag('')} disabled={selectTag==''}>Clear Tags</Button>
          </div>
          <div>
          <DeleteOutlined onClick={handleDeleteFile} />
          </div>
        <div>

     
        {hideReports ? <DownOutlined onClick={()=>setHideReports(prev=>!prev)}/> : <UpOutlined  onClick={()=>setHideReports(prev=>!prev)}/>}
        </div>
        </div>
        
        </FlexRowDivStyle>

        {!hideReports &&
        <>
          {csvFile.reports.length > 0 ? (
        
            <Grid rowData={csvFile.reports} rowGroup={selectTag} />
          ) : (
            <p>No reports available</p>
          )}
        </>

        }
    
  
  </div>
  )
}

export default IndividualReport