import React, { useState } from 'react';
import AgGridTable from './AgGRidTable';
import SpinnerCustom from './SpinnerCustom';

const RegistratioForm = () => {
    const [isLoader] = useState(false);
    const [rowData, setRowData] = useState([]);
    const [selectedRows, setSelectedRows] = useState(null);

    const colDefn = [
        { headerName: 'ID', field: "id", width: 500 ,hide:true},
        { headerName: 'First Name', field: "lastName", width: 500,asc: 'asc' },
        { headerName: 'Last Name', field: "lastName", width: 500, }
    ];

    const getSelectedRows = (selectedRows) => {
        setSelectedRows(selectedRows);
    }



    return (
        <div className='pageContainer container_wrapper'>
            <SpinnerCustom isLoader={isLoader}></SpinnerCustom>

            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <AgGridTable rowData={rowData} colDefn={colDefn} getSelectedRows={getSelectedRows}
                    createRoute={'/transferList'} buttonLabel="Create">

                </AgGridTable>

            </div>

        </div>
    );
};

export default RegistratioForm;