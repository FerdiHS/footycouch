const { follow } = require("../command/controller");
const { checkFollow, createFollow } = require("../command/service");

// Mock the checkFollow and createFollow functions
jest.mock('../command/service', () => ({
  checkFollow: jest.fn(),
  createFollow: jest.fn(),
}));

describe('Follow function', () => {
    // Mock the console log after each test
    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    // Restore console.log after each test
    afterEach(() => {
        console.log.mockRestore();
    });

    // Test successful follow
    it('Sucessful when creating follow of a non-existing follow', async () => {
        const req = {
        params: {
            follower: 1,
            followed: 2,
        },
        };
        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };

        // Mock the checkFollow function to return no existing follow
        checkFollow.mockImplementation((follower, followed, callback) => {
        callback(null, []);
        });

        // Mock the createFollow function to return a success result
        createFollow.mockImplementation((follower, followed, callback) => {
        callback(null, { insertId: 1 });
        });

        await follow(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
        message: 'Following successful',
        });
    });

    // Test existing follow
    it('Failed when creating follow of an existing follow', async () => {
        const req = {
        params: {
            follower: 1,
            followed: 2,
        },
        };
        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };

        // Mock the checkFollow function to return an existing follow
        checkFollow.mockImplementation((follower, followed, callback) => {
        callback(null, [{ follower_id: 1, followed_id: 2 }]);
        });

        await follow(req, res);

        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({
        message: 'Following already exists',
        });
    });

    // Test database error handling for checkFollow
    it('Failed when database error for checkFollow', async () => {
        const req = {
            params: {
                follower: 1,
                followed: 2,
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Mock the checkFollow function to return a database error
        checkFollow.mockImplementation((follower, followed, callback) => {
            callback(new Error('Database connection error'));
        });

        await follow(req, res);

        expect(res.status).toHaveBeenCalledWith(503);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Database connection error',
        });
    });

    // Test database error handling for createFollow
    it('Failed when database error for createFollow', async () => {
        const req = {
            params: {
                follower: 1,
                followed: 2,
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Mock the checkFollow function to return no existing follow
        checkFollow.mockImplementation((follower, followed, callback) => {
            callback(null, []);
        });

        // Mock the createFollow function to return a database error
        createFollow.mockImplementation((follower, followed, callback) => {
            callback(new Error('Database connection error'));
        });

        await follow(req, res);

        expect(res.status).toHaveBeenCalledWith(503);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Database connection error',
        });
    });
});
