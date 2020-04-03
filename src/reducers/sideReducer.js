const sideReducer = (state = { sideBar: false}, action) => {
    switch(action.type) {
        case 'TOGGLE_SIDEBAR':
            return {
            ...state,
            sideBar: !state.sideBar
            }
        default:
            return state;
        }
    }

export default sideReducer;