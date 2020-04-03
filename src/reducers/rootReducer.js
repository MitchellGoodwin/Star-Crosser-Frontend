import authReducer from './authReducer'
import { combineReducers } from "redux";
import sideReducer from './sideReducer';


const rootReducer = combineReducers({
    auth: authReducer,
    sideBar: sideReducer,
})

export default rootReducer;