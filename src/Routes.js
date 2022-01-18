import React from 'react';
import {Switch} from 'react-router-dom';
import Route from 'react-router-hooks';
import HomePage from './component/homePage';
import AutoCompleteDropDown from './component/autoCompleteDropDown';
import TransferList from './component/TransferList';
import RegistratioForm from './component/RegistrationForm';

const Routes=()=>{
    return(
        <Switch>
            <Route exact path="/" component={HomePage}></Route>
            <Route exact path="/searchAddress" component={AutoCompleteDropDown}></Route>
            <Route exact path="/transferList" component={TransferList}></Route>
            <Route exact path="/registrationForm" component={RegistratioForm}></Route>
        </Switch>
    );
};

export default Routes;

