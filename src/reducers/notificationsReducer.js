const notificationsReducer = (state = { notifications: [], read: false}, action) => {
    switch(action.type) {
        case 'ADD_NOTIFICATION':
            return {
                ...state,
                notifications: [ action.notification, ...state.notifications ]
            }
        case 'READ_NOTIFICATIONS':
            return {
                ...state,
                read: true
            }
        default:
            return state;
        }
    }

export default notificationsReducer;