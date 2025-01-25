import React from "react";
import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ResponsiveGridContainer, GridWrapper } from "./styles/GridStyle";
import { RowGroupingModule, RowGroupingPanelModule } from "ag-grid-enterprise";
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
} from "ag-grid-community";
import { Spin, Alert, Typography } from "antd";

const { Title } = Typography;

ModuleRegistry.registerModules([
  CellStyleModule,
  PaginationModule,
  ClientSideRowModelModule,
  ValidationModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  CustomFilterModule,
  RowGroupingModule,
  RowGroupingPanelModule,
]);

const flattenData = (data: any[]) => {
  return data.reduce((acc, { key, rows }) => {
    rows.forEach((row: any) => {
      const hasData = Object.keys(row).some(
        (col) => col !== "key" && row[col] !== undefined && row[col] !== null
      );
      if (hasData) {
        acc.push({ ...row, key });
      }
    });
    return acc;
  }, []);
};

const GroupedGrid: React.FC<{ rowData: any[]; }> = ({
  rowData
}) => {
  const [flatData, setFlatData] = useState<any[]>([]);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [gridApi, setGridApi] = useState(null);

  const getAllColumns = (flattenedData) => {
    const allColumns = new Set<string>();
  
    flattenedData.forEach((row) => {
      Object.keys(row).forEach((key) => {
        if (key !== "key") { // Exclude the grouping key
          allColumns.add(key);
        }
      });
    });
  
    return Array.from(allColumns);
  };

  useEffect(() => {
    setLoading(true);
    setError(null);

    if (rowData) {
      const flattened = flattenData(rowData);

    
      setFlatData(flattened);

      if (flattened.length > 0) {
        const dynamicColumns = getAllColumns(flattened)
        const newColumnDefs: ColDef[] = dynamicColumns.map((col: string) => ({
          headerName: col,
          field: col,
          sortable: true,
          filter: true,
          minWidth: 150,
        }));

        newColumnDefs.push({
          headerName: "Date",
          field: "key",
          rowGroup: true,
          hide: true,
          sortable: true,
          filter: true,
          minWidth: 150,
          cellRendererParams: {
            suppressCount: true,
            innerRenderer: (params: any) => {
              return `Date: ${params.value}`;
            },
          },
        });

        setColumnDefs(newColumnDefs);
      }

      setLoading(false);
    } else {
      setError("No data available");
      setLoading(false);
    }
  }, [rowData]);

  const onGridReady = (params) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  };

  const onFirstDataRendered = (params) => {
    params.api.sizeColumnsToFit();
  };

  return (
    <GridWrapper>
      <Title level={4}>Grouped Data Grid</Title>
      {loading ? (
        <Spin tip="Loading data..." />
      ) : error ? (
        <Alert message="Error" description={error} type="error" showIcon />
      ) : (
        <ResponsiveGridContainer className="ag-theme-alpine">
          <AgGridReact
            rowData={flatData}
            columnDefs={columnDefs}
            pagination={true}
            rowHeight={40}
            groupDefaultExpanded={-1}
            suppressRowClickSelection={true}
            suppressAggFuncInHeader={true}
            onGridReady={onGridReady}
            onFirstDataRendered={onFirstDataRendered}
            domLayout="normal"
          />
        </ResponsiveGridContainer>
      )}
    </GridWrapper>
  );
};

export default GroupedGrid;
