import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

const HomePage = () => {

    return (
        <div className='pageContainer pageHeader'>

            <div className='pageContent row'>
                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                    <Link to='/searchAddress'>Search Address</Link>
                </div>

                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                    <Link to='/transferList'>Transfer List</Link>
                </div>

                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                    <Link to='/registrationForm'>Registration Form</Link>
                </div>

            </div>
        </div>

    );
};

export default HomePage;