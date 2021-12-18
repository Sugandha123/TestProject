import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getToken, getSearchAddress, clearAction } from '../actions/indexAction';
import { GET_SEARCH_ADDRESS, GET_TOKEN } from '../constants/actionTypes';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';


import '../index.css';
const AutoCompleteDropDown = (props) => {
    const text = "Please Search Address in the Input Box";
    const [searchData, setSearchData] = useState();
    const [searchText, setSearchText] = useState();
    const [searchAddressList, setSearchAddressList] = useState([]);
    const dispatch = useDispatch();
    const appState = useSelector((state) => state);
    const [value, setValue] = useState();

    const useStyles = makeStyles({
        paper: {
            border: "1px solid #0c5460"
        }
    });

    useEffect(() => {
        dispatch(clearAction(GET_TOKEN));
        dispatch(clearAction(GET_SEARCH_ADDRESS));
        dispatch(
            getToken(null, GET_TOKEN)
        );

    }, [dispatch]);

    useEffect(() => {
        if (appState.loginDataValue.getToken.respMessage !== null) {
            const payload = { search_address: "unit 38 50" };
            const token = appState.loginDataValue.getToken.respMessage.data.token;
            // dispatch(getSearchAddress(payload, token, GET_SEARCH_ADDRESS))
        }
        else
            if (appState.loginDataValue.getToken.errorMessage !== null) {
                const message=appState.loginDataValue.getSearchAddress.getToken.message;
                setSearchText(message);
                setSearchAddressList([]);
            }
    }, [appState.loginDataValue.getToken.respMessage,
    appState.loginDataValue.getToken.errorMessage]);

    useEffect(() => {
        if (appState.loginDataValue.getSearchAddress.respMessage !== null) {
            const list = appState.loginDataValue.getSearchAddress.respMessage.data;
            const message=appState.loginDataValue.getSearchAddress.respMessage.message;
            setSearchText(message);
            setSearchAddressList(list);
        }
        else
            if (appState.loginDataValue.getSearchAddress.errorMessage !== null) {
                const message=appState.loginDataValue.getSearchAddress.errorMessage.message;
                setSearchText(message);
                setSearchAddressList([]);
            }
    }, [appState.loginDataValue.getSearchAddress.respMessage,
    appState.loginDataValue.getSearchAddress.errorMessage]);

    const onButtonClick = () => {
        dispatch(clearAction(GET_SEARCH_ADDRESS));
        console.log(searchData);
        const payload = { search_address: searchData };
        const token = appState.loginDataValue.getToken.respMessage.data.token;
        dispatch(getSearchAddress(payload, token, GET_SEARCH_ADDRESS))
    };

    return (
        <Fragment>
            <div className='mainContainer'>
                <label>{text}</label>
                <div className='containerDiv'>
                    <input onChange={event => setSearchData(event.target.value)} className="inputStyle"
                        placeholder='Search Address' />
                    <button type="button" className="btnStyle" onClick={onButtonClick}>Search Address</button>
                </div>
                <Autocomplete
                    id="combo-box-demo"
                    className="row autoCompleteStyle left"
                    classes={{ paper: useStyles.paper }}
                    options={searchAddressList}
                    getOptionLabel={(option) => option.DisplayLine}
                    renderInput={(params) =>
                        <TextField {...params}
                            label='Address'
                            variant="outlined"
                            fullWidth />}
                />

                <label className='messageLabel'>{searchText}</label>
            </div>
           
        </Fragment>
    )
}


export default AutoCompleteDropDown;