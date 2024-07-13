const initialState = {
    message: "", // Empty the players for the initial state
};
  
const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MESSAGE':
            return {
                ...state,
                message: action.payload
            };
        case 'DELETE_MESSAGE':
            return {
                ...state,
                message: ""
            }
        default:
            return state;
    }
};
  
export default messageReducer;