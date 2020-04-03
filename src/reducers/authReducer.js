const authReducer = (state = { user: [], loading: false}, action) => {
    switch(action.type) {
        case 'ATTEMPT_AUTH':
            return {
            ...state,
            user: [...state.user],
            loading: true
            }
        case 'AUTH_SUCCESS':
            return {
            ...state,
            user: action.user,
            loading: false
            }
        case 'LOG_OUT':
            return {
                user: [], 
                loading: false
            }
        default:
            return state;
        }
    }

export default authReducer;