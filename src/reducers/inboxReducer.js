const inboxReducer = (state = { selectedUser: false, loading: false, messages: [], canMessage: false}, action) => {
    switch(action.type) {
        case 'SET_INBOX_USER':
            return {
                ...state,
                selectedUser: action.user,
                messages: action.messages,
                canMessage: action.canMessage,
                loading: false
            }
        case 'RESET_INBOX':
            return {
                selectedUser: false, 
                loading: false, 
                messages: [], 
                canMessage: false
            }
        case 'ADD_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, action.message],
                canMessage: action.canMessage
            }
        default:
            return state;
        }
    }

export default inboxReducer;