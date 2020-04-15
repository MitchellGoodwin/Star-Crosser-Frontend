const notificationsReducer = (state = { notifications: [], allNotifications: [], read: true}, action) => {
    switch(action.type) {
        case 'SET_NOTIFICATIONS':
            return {
                ...state,
                notifications: [...action.notifications],
                allNotifications: [...action.allNotifications],
                read: (action.notifications.length > 0 ? false : true)
            }
        case 'ADD_NOTIFICATION':
            return {
                ...state,
                notifications: [ action.notification, ...state.notifications ],
                allNotifications: [ action.notification, ...state.allNotifications ],
                read: false
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