export const share = (id) => {
    return {
        type: 'SHARE',
        payload: id
    };
};

export const getShares = state => state.shares;