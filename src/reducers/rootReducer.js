import authReducer from './authReducer'
import { combineReducers } from "redux";
import sideReducer from './sideReducer';
import userFormReducer from './userFormReducer';


const rootReducer = combineReducers({
    auth: authReducer,
    sideBar: sideReducer,
    currentUser: userFormReducer
})

export default rootReducer;