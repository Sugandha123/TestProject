import React, { Component, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import 'ag-grid-community/dist/styles/ag-theme-fresh.css';
import './AgGridTable.css';

const AgGrid = () => {

    const columnDefination = [
        {
            headerName: "Make",
            field: "make",
            sortable: true,
            checkboxSelection: true
        },
        {
            headerName: "Model Name",
            field: "model",
            filter: true,
            sortable: true,
        },
        {
            headerName: "Price",
            field: "price"
        }
    ];

    const rowDataa = [
        {
            make: "Toyota",
            model: "Celica",
            price: 35000
        },
        {
            make: "Ford",
            model: "Mondeo",
            price: 32000
        },
        {
            make: "Porsche",
            model: "Boxter",
            price: 72000
        }
    ];

    const autoGroupColumnDefination = {
        headerName: "Model",
        field: "model",
        cellRenderer: "agGroupCellRenderer",
        cellRendererParams: {
            checkbox: true
        }
    };

    const [columnDefs, setColumnDefs] = useState(columnDefination);
    const [rowData, setRowData] = useState(rowDataa);
    const [gridAPI, setGridAPI] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [autoGroupColumnDef, setAutoGroupColumnDef] = useState({});
    const [selectedRows, setSelectedRows] = useState();
    const rowHeight = 30;
    const groupHeaderHeight = 75;
    const headerHeight = 40;



    useEffect(() => {
        setColumnDefs(columnDefs);
        setAutoGroupColumnDef(autoGroupColumnDef);
        //sets rowdata from constant
        //setRowData(rowData);
    }, []);

    //   useEffect(() => {
    //     //fetch("https://api.myjson.com/bins/15psn9")
    //     fetch("https://api.myjson.com/bins/ly7d1")
    //       .then(result => result.json())
    //       .then(rowData => setRowData(rowData));
    //   }, [rowData]);

    const onButtonClick = e => {
        const selectedNodes = gridAPI.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);
        const selectedDataStringPresentation = selectedData
            .map(node => node.make + " " + node.model)
            .join(", ");
        alert(`Selected nodes: ${selectedDataStringPresentation}`);
    };

    const onGridReady = (params) => {
        setGridAPI(params.api);
        setGridColumnApi(params.columnApi);
    };

    const filterTableData = (e) => {
        gridAPI.setQuickFilter(e.target.value);
    }

    const exportHandler = () => {
        gridAPI.exportDataAsCsv();
    };

    const onSelectionChanged = () => {
        let selectedRows = gridAPI.getSelectedRows();
        setSelectedRows(selectedRows);
        console.log('Rows Selected', selectedRows);
    }

    return (
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">

            <div className="searchTextDiv">
                <i className="fa fa-search"></i>
                <input type="text" name="name" placeholder="Search......" onChange={filterTableData}>
                </input>
            </div>

            <button className="boldFont btn btn-primary export" onClick={exportHandler}>
                <i className="fa fa-download"></i>Export</button>
          
            <button className="btn btn-primary export" 
            onClick={onButtonClick}>Get selected rows</button>
            <br />
            <br />
            <div className="ag-theme-fresh AGG_table" style={{ width: "100%", height: "47vh" }}>
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                    pagination={true}
                    colResizeDefault={true}
                    rowSelection="multiple"
                    rowMultiSelectWithClick={true}
                    onGridReady={onGridReady}
                    onSelectionChanged={onSelectionChanged}
                    rowHeight={rowHeight}
                    groupHeaderHeight={groupHeaderHeight}
                    headerHeight={headerHeight}
                    groupSelectsChildren={true}
                    autoGroupColumnDef={autoGroupColumnDef}
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
                />
            </div>

        </div>
    );
};
export default AgGrid;
