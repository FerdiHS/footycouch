const { getPlayers, getPlayersById, getTeams, getTeamById } = require("../command/controller");
const { fplapi } = require("../config/fplapi");


// Mock the fplapi function
jest.mock('../config/fplapi', () => {
    return {
        fplapi: jest.fn(() => {
            return Promise.resolve({
                data: {
                    teams: [
                        { id: 1, name: 'Team 1' },
                        { id: 2, name: 'Team 2' },
                        { id: 3, name: 'Team 3' },
                    ],
                    elements: [
                    { id: 1, name: 'Player 1', element_type: 1 },
                    { id: 2, name: 'Player 2', element_type: 2 },
                    { id: 3, name: 'Player 3', element_type: 3 },
                    ],
                },
            });
        }),
    };
});

describe('fpl-related functions', () => {
    // Get all players
    it('Successfully get all players', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getPlayers(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            players: [
                { id: 1, name: 'Player 1', element_type: 1 },
                { id: 2, name: 'Player 2', element_type: 2 },
                { id: 3, name: 'Player 3', element_type: 3 },
            ],
        });
    });

    // Get a player with valid id
    it('Successfully get player by valid id', async () => {
        const req = {
          params: {
            id: 1,
          },
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
    
        await getPlayersById(req, res);
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          id: 1,
          name: 'Player 1',
          element_type: 1,
        });
    });
    
    // Get a player with invalid id
    it('Failed getting player with invalid id', async () => {
    const req = {
        params: {
            id: 4,
        },
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    await getPlayersById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
        error: 'Player not found',
    });
    });

    // Get all teams
    it('Successful when getting all teams', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    
        await getTeams(req, res);
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            teams: [
                { id: 1, name: 'Team 1' },
                { id: 2, name: 'Team 2' },
                { id: 3, name: 'Team 3' },
            ],
        });
    });

    // Get a team with valid id
    it('Successful when getting a team with valid id', async () => {
        const req = {
            params: {
            id: '2',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getTeamById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            id: 2,
            name: 'Team 2',
        });
    });

    // Get a team with invalid id
    it('Failed when getting a team with invalid id', async () => {
        const req = {
            params: {
            id: '4',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getTeamById(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Team not found',
        });
    });
});
