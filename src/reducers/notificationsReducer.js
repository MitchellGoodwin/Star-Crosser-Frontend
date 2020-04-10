const notificationsReducer = (state = { notifications: []}, action) => {
    switch(action.type) {
        case 'ADD_NOTIFICATION':
            return {
                ...state,
                notifications: [ action.notification, ...state.notifications ]
            }
        default:
            return state;
        }
    }

export default notificationsReducer;