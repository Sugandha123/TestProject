import axios from 'axios';
const serviceURLInstance = 'http://localhost:3030';

const axiosInstances = {
    tokenBaseService: axios.create({
        baseURL: serviceURLInstance
    })
}

export const clearAction=(actionType)=>{
    var resp={
        respMessage:null,
        errorMessage:null
    };
    return {
        type:actionType,
        payload:resp
    }
}

export const getToken = (createTokenObj, actionType) => {
    var inputRequestBody = null;
    var respOutputGetToken = {
        respMessage: null,
        errorMessage: null
    };
    const serviceURI = '/getToken';
    const apiKey = '4NKQ3-815C2-8T5Q2-16318-55301';
    const baseUrl = axiosInstances.tokenBaseService;
    var inputHeader={
        'Api-key': apiKey
    };
    return async (dispatch) => {
        try {
            inputRequestBody = createTokenObj;
            await baseUrl
                .post(serviceURI, {
                    headers:inputHeader
                }).then((success) => {
                    if (success.data.status === 1) {
                        respOutputGetToken.respMessage = success.data;
                    }
                    else
                        if (success.data.status === 0) {
                            respOutputGetToken.errorMessage = success.data;
                        }
                        else {
                            respOutputGetToken.respMessage = success.data;
                        }

                    dispatch({
                        type: actionType,
                        payload: respOutputGetToken
                    });
                })
                .catch((servcError) => {
                    respOutputGetToken.errorMessage = "Error from service side.Please try again";

                    dispatch({
                        type: actionType,
                        payload: respOutputGetToken
                    });
                });
        }
        catch {
            respOutputGetToken.errorMessage = "Error from service side.Please try again";
            dispatch({
                type: actionType,
                payload: respOutputGetToken
            });
        }
    };
};

export const getSearchAddress = (createTokenObj, tokenValue,actionType) => {
    var inputRequestBody = null;
    var respOutputGetToken = {
        respMessage: null,
        errorMessage: null
    };
    const serviceURI = '/getSearchAddress';
    const apiKey = '4NKQ3-815C2-8T5Q2-16318-55301';
    const baseUrl = axiosInstances.tokenBaseService;
    var inputHeader={
        'Api-key': apiKey,
        'Auth-token' : tokenValue,
        'content-type':'application/json'
    };
    return async (dispatch) => {
        try {
            inputRequestBody = createTokenObj;
            await baseUrl
                .post(serviceURI,inputRequestBody, {
                    headers:inputHeader, 

                }).then((success) => {
                    if (success.data.status === 1) {
                        respOutputGetToken.respMessage = success.data;
                    }
                    else
                        if (success.data.status === 0) {
                            respOutputGetToken.errorMessage = success.data;
                        }
                        else {
                            respOutputGetToken.respMessage = success.data;
                        }

                    dispatch({
                        type: actionType,
                        payload: respOutputGetToken
                    });
                })
                .catch((servcError) => {
                    respOutputGetToken.errorMessage = "Error from service side.Please try again";

                    dispatch({
                        type: actionType,
                        payload: respOutputGetToken
                    });
                });
        }
        catch {
            respOutputGetToken.errorMessage = "Error from service side.Please try again";
            dispatch({
                type: actionType,
                payload: respOutputGetToken
            });
        }
    };
};



