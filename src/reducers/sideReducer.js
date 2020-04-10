const sideReducer = (state = { sideBar: false}, action) => {
    switch(action.type) {
        case 'TOGGLE_SIDEBAR':
            return {
            sideBar: !state.sideBar
            }
        default:
            return state;
        }
    }

export default sideReducer;