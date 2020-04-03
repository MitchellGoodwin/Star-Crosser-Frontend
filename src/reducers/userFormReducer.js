const userFormReducer = (state = { user: {location: ' ,  ,  '}, initialUser: false}, action) => {
    switch(action.type) {
        case 'SET_USER':
            return {
            ...state,
            user: {...action.user},
            initialUser: true
            }
        case 'HANDLE_CHANGE':
            return {
            ...state,
            user: {
                ...state.user,
                [action.name]: action.value
            }
            }
        case 'RESET_FORM':
            return {
                ...state,
                initialUser: false
            }
        default:
            return state;
        }
    }

export default userFormReducer;