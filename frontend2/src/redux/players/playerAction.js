export const addPlayers = (players) => {
    return {
        type: 'SET_PLAYERS',
        payload: players
    };
};

export const getPlayers = state => state.players;