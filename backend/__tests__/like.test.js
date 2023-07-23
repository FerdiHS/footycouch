const { like } = require('../command/controller');
const { checkLiked, createLike } = require('../command/service');

// Mock the database functions
jest.mock('../command/service', () => ({
  checkLiked: jest.fn(),
  createLike: jest.fn(),
}));

describe('Like function', () => {
    // Mock the console log after each test
    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    // Restore console.log after each test
    afterEach(() => {
        console.log.mockRestore();
    });

    // Test successful like creation
    it('Successful when creating a new like', async () => {
        const req = {
            params: {
                id: 1,
                liked: 2,
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Mock the checkLiked function to return no existing like
        checkLiked.mockImplementation((user, liked, type, callback) => {
            callback(null, []);
        });

        // Mock the createLike function to return a success result
        createLike.mockImplementation((id, type, liked, callback) => {
            callback(null, { insertId: 1 });
        });

        await like(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Like created successfully',
        });
    });

    // Test existing like
    it('Failed when creating existing like', async () => {
        const req = {
            params: {
                id: 1,
                liked: 2,
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Mock the checkLiked function to return an existing like
        checkLiked.mockImplementation((user, liked, type, callback) => {
            callback(null, [{ user: 1, liked: 2, type: true }]);
        });

        await like(req, res);

        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Like already exists',
        });
    });

    // Test database error handling for checkLiked
    it('Failed when database error for checkLiked', async () => {
        const req = {
            params: {
                id: 1,
                liked: 2,
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Mock the checkLiked function to return a database error
        checkLiked.mockImplementation((user, liked, type, callback) => {
            callback(new Error('Database connection error'));
        });

        await like(req, res);

        expect(res.status).toHaveBeenCalledWith(503);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Database connection error',
        });
    });

    // Test database error handling for createLike
    it('Failed when database error for createLike', async () => {
        const req = {
            params: {
                id: 1,
                liked: 2,
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Mock the checkLiked function to return no existing like
        checkLiked.mockImplementation((user, liked, type, callback) => {
            callback(null, []);
        });

        // Mock the createLike function to return a database error
        createLike.mockImplementation((id, type, liked, callback) => {
            callback(new Error('Database connection error'));
        });

        await like(req, res);

        expect(res.status).toHaveBeenCalledWith(503);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Database connection error',
        });
    });
});
