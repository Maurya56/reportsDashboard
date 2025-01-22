import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { GridContainer } from './GridStyle';
import {
  ClientSideRowModelModule,
  ColDef,
  ModuleRegistry,
  PaginationModule,
  CellStyleModule,
  ValidationModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  CustomFilterModule,
} from 'ag-grid-community';


ModuleRegistry.registerModules([
  CellStyleModule,
  PaginationModule,
  ClientSideRowModelModule,
  ValidationModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  CustomFilterModule,

]);


const Grid: React.FC<{ rowData: any[] }> = ({ rowData }) => {

  const columnDefs: ColDef[] = rowData.length > 0
    ? Object.keys(rowData[0]).map((key) => {
        const isNumeric = !isNaN(Number(rowData[0][key].replace(/,/g, '')));
        return {
          headerName: key,
          field: key,
          sortable: true,
          filter: true,
          minWidth: 150, 
          cellClass: 'cell-wrap-text', 
          valueFormatter: isNumeric
            ? (params) => {
                if (key === 'Volume') {
                  return Number(params.value).toLocaleString();
                }
                return parseFloat(params.value).toFixed(2);
              }
            : key === 'Date'
            ? (params) => new Date(params.value).toLocaleDateString()
            : undefined,
        };
      })
    : [];
  return (
    <GridContainer className="ag-theme-alpine">
      <AgGridReact
       rowData={rowData.length > 0 ? rowData : []}
        columnDefs={columnDefs}
        pagination={true}
        rowHeight={40}
       
      />
    </GridContainer>
  );
};

export default Grid;
