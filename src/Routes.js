import React from 'react';
import {Switch} from 'react-router-dom';
import Route from 'react-router-hooks';
import HomePage from './component/homePage';
import SearchAddress from './component/searchAddress';
import TransferList from './component/TransferList';
import RegistratioForm from './component/RegistrationForm';
import AgGrid from './component/AgGrid';

const Routes=()=>{
    return(
        <Switch>
            <Route exact path="/" component={HomePage}></Route>
            <Route exact path="/searchAddress" component={SearchAddress}></Route>
            <Route exact path="/transferList" component={TransferList}></Route>
            <Route exact path="/registrationForm" component={RegistratioForm}></Route>
            <Route exact path="/agGrid" component={AgGrid}></Route>
        </Switch>
    );
};

export default Routes;

