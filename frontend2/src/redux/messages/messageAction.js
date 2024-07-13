export const setMessage = (userObj) => {
    return {
        type: "SET_MESSAGE",
        payload: userObj
    }
}

export const deleteMessage = () => {
    return {
        type: "DELETE_MESSAGE"
    }
}

export const getMessage = state => state.message.message;