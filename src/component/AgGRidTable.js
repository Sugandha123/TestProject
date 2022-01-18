import React, { useState, UseEffect, useCallback } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-fresh.css';
import { useSelector } from "react-redux";
import './AgGridTable.css';
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

const AgGridTable = (props) => {
    const history = useHistory();
    const appState = useSelector((state) => state);
    const [rowSelectionType, setRowSelectionType] = useState('single');
    const [statusValue, setStatusValue] = useState("");
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [createButtonFlag, setCreateButtonFlag] = useState(true);
    const [rowMultiSelectWithClickFlag, setRowMultiSelectWithClickFlag] = useState(false);

    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    };

    const onSelectionChanged = () => {
        let selectedRows = [];
        selectedRows = gridApi.getSelectedRows();
        if (props?.rowSelection !== 'multi') {
            selectedRows = selectedRows[0];
        }

        if (props.viewParcelRecordAndChangeStatus === true) {
            if (selectedRows.length === 1) {
                setStatusValue(selectedRows[0].status);
            }
            else if (selectedRows.length > 1) {
                var parcelId = "-1";
                for (var i = 0; i < selectedRows.length; i++) {
                    if (selectedRows[i].status !== statusValue) {
                        parcelId = selectedRows[i].parcel;
                        props.warningFunction();
                        break;
                    }
                }
                gridApi.forEachNode(node => {
                    if (node.data.parcel === parcelId) {
                        node.setSelected(false);
                    }
                });
            }
        }
        props.getSelectedRows(selectedRows);
    };

    const exportHandler = () => {
        gridApi.exportDataAsCsv();
    };

    const AMRScheduleExportHandler = useCallback(() => {
        let rowData = [];
        gridApi.forEachNode(node => rowData.push(node.data));
        let downloadData = props.downloadCsv();
        gridApi.setRowData(downloadData);
        gridApi.exportDataAsCsv();
        gridApi.setRowData(rowData);
    }, [gridApi, props]);

    const rowHeight = 30;
    const groupHeaderHeight = 75;
    const headerHeight = 40;

    const filterTableData = (e) => {
        gridApi.setQuickFilter(e.target.value);
    };


    const createHandler = () => {
        if (props.createRoute) {
            history.push({
                pathname: props.createRoute
            });
        }
    };


    useEffect(() => {
        if (props?.rowSelection === 'multi') {
            setRowSelectionType('multiple');
            setRowMultiSelectWithClickFlag(true);
        }

        if (props?.AMRScheduleDownload === true) {
            AMRScheduleExportHandler();
        }
    }, [props, AMRScheduleExportHandler]);

    //Overwrite 1st col. of colDefn receivedd from prop
    const colDefn = props.colDefn;
    {
        if (colDefn[0].hide === true) {
            colDefn[1] = { ...colDefn[1], ...{ sort: 'asc' } };
        }
        else {
            colDefn[0] = { ...colDefn[1], ...{ sort: 'asc' } };
        }
    }

    return (
        <>
            <div className="searchTextDiv">
                <i className="fa fa-search"></i>
                <input type="text" name="name" placeholder="Search...." onChange={filterTableData}></input>
                {createButtonFlag === true &&
                    <button className="Delete boldFont btn btn-primary" onClick={createHandler}>
                        <i className="fa fa-plus-circle"></i>Create</button>}
                {props.showDownload === true &&
                    <button className="boldFont btn btn-primary export" onClick={exportHandler}>
                        <i className="fa fa-download"></i></button>}

            </div>

            <div className="ag-theme-fresh AGG_table" style={{ width: "100%", height="47vh" }}>
                <AgGridReact
                    rowData={props.rowData}
                    columnDefs={colDefn}
                    pagination={true}
                    colResizeDefault={true}
                    rowSelection={rowSelectionType}
                    rowMultiSelectWithClick={rowMultiSelectWithClickFlag}
                    onGridReady={onGridReady}
                    onSelectionChanged={onSelectionChanged}
                    rowHeight={rowHeight}
                    groupHeaderHeight={groupHeaderHeight}
                    headerHeight={headerHeight}
                    overlayNoRowsTemplate={'<span style="padding:10px;border:1px solid #856404;background:#fff3cd;color:#856404;border-radius:.25rem">No Data Found</span>'}
                    overlayLoadingTemplate={
                        '<span className="ag-overlay-loading-centre" style="padding:10px;border:1px solid #856404;background:#fff3cd;color:#856404;border-radius:.25rem">Please Wait While Your Data Are Loading</span>'
                    }
                    //paginationAutoPageSize={true}
                    defaultColDef={{
                        sortable: true,
                        filter: true,
                        flex: 1,
                        minWidth: 50,
                        sortingOrder: ['asc', 'desc', null],
                        wrapText: true,
                        autoHeight: true,
                        resizable: true,
                        // align:left,
                        // floatingFilter:true

                    }}
                >

                </AgGridReact>

            </div>
        </>
    );
};

export default AgGridTable;