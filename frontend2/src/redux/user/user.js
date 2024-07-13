const initialState = {
    userId: null,
    profilePicture: null,
    username: null
};

const currentUser = (state = initialState, action) => {
    switch(action.type){
        case "SET_USER":
            return {
                ...state,
                userId: action.payload.id,
                profilePicture: action.payload.profilePicture,
                username: action.payload.username
            }
        case "LOG_OUT":
            return {
                ...state,
                userId: null,
                profilePicture: null,
                username: null
            }
        default:
            return state
    }
}

export default currentUser;
