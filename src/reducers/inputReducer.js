const INITIAL_STATE = {
    rows:3,
    columns:3,
    submitted:false,
    isGameStarted: false
}
const inputReducer = (currentState = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SUBMIT':
            return {
                ...currentState,
                rows:currentState.rows,
                columns:currentState.columns,
                submitted:true,
                isGameStarted: false
            }
        case 'INPUT_CHANGED':
            const state = {
                ...currentState,
                rows:currentState.rows,
                columns:currentState.columns,
                submitted:false,
                isGameStarted: false
            }
            state[action.name] = action.value;
            return state;
        case 'LOAD_GAME':
            return {
                ...currentState,
                rows:currentState.rows,
                columns:currentState.columns,
                submitted:false,
                isGameStarted: true
            }
        default:
            return currentState;
    }
}

export default inputReducer;