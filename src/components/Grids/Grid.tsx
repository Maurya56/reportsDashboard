import React, { useMemo } from "react";
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

const Grid: React.FC<{ rowData: any[]; rowGroup: string }> = ({
  rowData,
  rowGroup,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [gridApi, setGridApi] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    if (rowData.length > 0) {
      setLoading(false);
    } else {
      setError("No data available");
      setLoading(false);
    }
  }, [rowData]);

  const columnDefs: ColDef[] = useMemo(
    () =>
      rowData.length > 0
        ? Object.keys(rowData[0]).map((key) => {
            const value = rowData[0][key];
            const isString = typeof value === "string";
            const isNumeric = !isNaN(
              Number(value.replace ? value.replace(/,/g, "") : value)
            );
            return {
              headerName: key,
              field: key,
              sortable: true,
              filter: true,
              minWidth: 150,
              cellClass: "cell-wrap-text",
              rowGroup: key === rowGroup ? true : false,
              valueFormatter: isNumeric
                ? (params) => {
                    if (key === "Volume") {
                      return Number(params.value).toLocaleString();
                    }
                    return Number.parseFloat(params.value).toFixed(2);
                  }
                : key === "Date"
                ? (params) => new Date(params.value).toLocaleDateString()
                : undefined,
            };
          })
        : [],
    [rowData, rowGroup]
  );

  const onGridReady = (params) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  };

  const onFirstDataRendered = (params) => {
    params.api.sizeColumnsToFit();
  };

  return (
    <GridWrapper>
      <Title level={4}>Data Grid</Title>
      {loading ? (
        <Spin tip="Loading data..." />
      ) : error ? (
        <Alert message="Error" description={error} type="error" showIcon />
      ) : (
        <ResponsiveGridContainer className="ag-theme-alpine">
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            pagination={true}
            rowHeight={40}
            onGridReady={onGridReady}
            onFirstDataRendered={onFirstDataRendered}
            domLayout="normal"
          />
        </ResponsiveGridContainer>
      )}
    </GridWrapper>
  );
};

export default Grid;
