import authReducer from './authReducer'
import { combineReducers } from "redux";
import sideReducer from './sideReducer';
import userFormReducer from './userFormReducer';
import usersReducer from './usersReducer'
import inboxReducer from './inboxReducer'


const rootReducer = combineReducers({
    auth: authReducer,
    sideBar: sideReducer,
    currentUser: userFormReducer,
    explore: usersReducer,
    inbox: inboxReducer
})

export default rootReducer;