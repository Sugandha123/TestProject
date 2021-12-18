import { applyMiddleware, compose ,createStore,combineReducers} from "redux";
import indexReducer from "../reducers/indexReducer";
import thunk from 'redux-thunk';


const rootReducer=combineReducers({
    loginDataValue:indexReducer
});

const composeEnhancers=window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
export const indexStore=()=>{
    return createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));
}