import authReducer from './authReducer'
import { combineReducers } from "redux";
import sideReducer from './sideReducer';
import userFormReducer from './userFormReducer';
import usersReducer from './usersReducer'


const rootReducer = combineReducers({
    auth: authReducer,
    sideBar: sideReducer,
    currentUser: userFormReducer,
    explore: usersReducer
})

export default rootReducer;