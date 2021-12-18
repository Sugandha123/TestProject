import { GET_TOKEN, GET_SEARCH_ADDRESS } from '../constants/actionTypes';

const initialState = {
     getToken: {
          respMessage: null,
          errorMessage: null
     },
     getSearchAddress: {
          respMessage: null,
          errorMessage: null
     }
};

const indexReducer = (state = initialState, action) => {
     switch (action.type) {
          case GET_TOKEN:
               state.getToken = action.payload;
               return { ...state };
          case GET_SEARCH_ADDRESS:
               state.getSearchAddress = action.payload;
               return { ...state };
          default:
               return state;
     }
};

export default indexReducer;