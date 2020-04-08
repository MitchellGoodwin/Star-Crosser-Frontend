const usersReducer = (state = { users: [], oldUsers: [] ,loading: false, compatability: false}, action) => {
    switch(action.type) {
        case 'LOADING_USERS':
            return {
            ...state,
            users: [...state.users],
            oldUsers: [...state.oldUsers],
            loading: true
            }
        case 'FIRST_USERS':
            return {
            ...state,
            users: action.users,
            oldUsers: action.users,
            loading: false
            }
        case 'SET_USERS':
            return {
                ...state,
                users: action.users,
                loading: false
            }
        case 'TOGGLE_COMPATABILITY':
            return {
                ...state,
                compatability: !state.compatability
            }
        case 'RESET_USERS':
            return {
                ...state,
                users: [...state.oldUsers],
                loading: false
            }
        default:
            return state;
        }
    }

export default usersReducer;