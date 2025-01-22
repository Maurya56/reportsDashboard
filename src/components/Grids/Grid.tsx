// components/Grid/Grid.tsx
import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const Grid: React.FC<{ rowData: any[] }> = ({ rowData }) => {
  const columnDefs = [
    { headerName: 'Column 1', field: 'column1', sortable: true, filter: true },
    { headerName: 'Column 2', field: 'column2', sortable: true, filter: true },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs} pagination={true} />
    </div>
  );
};

export default Grid;