const initialState = {}

const shareReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHARE':
            return {
                ...state,
                [action.payload]: new Date()
            };
        default:
            return state;
    }
};

export default shareReducer;