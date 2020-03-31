const initialState = {
    drawerToggle: true
}

export const drawerToggleReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_OPEN':
            return {
                ...state,
                drawerToggle: true
            }
        case 'SET_CLOSE':
            return {
                ...state,
                drawerToggle:  false
            }
        default:
            return state;
    }
}