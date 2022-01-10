import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import TransferList from './TransferList';

const CallingTransferList = () => {

    return (
        <div className='pageContainer pageHeader'>
<TransferList></TransferList>

            </div>
      

    );
};

export default CallingTransferList;