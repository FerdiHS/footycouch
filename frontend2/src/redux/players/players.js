const initialState = {
    players: [], // Empty the players for the initial state
    last_updated: new Date()
};
  
const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PLAYERS':
            return {
                ...state,
                players: action.payload,
                last_updated: new Date()
            };
        default:
            return state;
    }
};
  
export default playerReducer;