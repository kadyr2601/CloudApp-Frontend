import {combineReducers} from 'redux'
import AuthReducer from "./AuthReducer";
import CloudReducer from "./CoudReducer";


const Reducers = combineReducers({
    CloudReducer,
    AuthReducer,
})
export default Reducers;
