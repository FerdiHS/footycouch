const { signup } = require('../command/controller');
const { createUser, getUserByName } = require('../command/service');

// Mock the createUser function
jest.mock('../command/service', () => ({
  createUser: jest.fn(),
  getUserByName: jest.fn(),
}));

describe('Signup function', () => {
    // Mock the console log after each test
    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    // Restore console.log after each test
    afterEach(() => {
        console.log.mockRestore();
    });
    
    // Test successful account creation
    it('Successful when creating account with matching passwords and a non-existing username', async () => {
        const req = {
            body: {
                username: 'new_user',
                password: 'matching_password',
                confirmPassword: 'matching_password'
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Mock the getUserByName function to return no existing user
        getUserByName.mockImplementation((username, callback) => {
            callback(null, undefined);
        });

        // Mock the createUser function to return a success result
        createUser.mockImplementation((data, callback) => {
            callback(null, { insertId: 1 });
        });

        await signup(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Account created'
        });
    });

    // Test non-matching passwords
    it('Failed when creating account with non-matching passwords', async () => {
        const req = {
            body: {
                username: 'new_user',
                password: 'password1',
                confirmPassword: 'password2'
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await signup(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Password and Confirm Password is different'
        });
    });

    // Test existing username
    it('Failed when creating account with an existing username', async () => {
        const req = {
            body: {
                username: 'existing_user',
                password: 'matching_password',
                confirmPassword: 'matching_password'
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Mock the getUserByName function to return an existing user
        getUserByName.mockImplementation((username, callback) => {
            callback(null, [{ username: 'existing_user', password: 'hashed_password' }]);
        });

        await signup(req, res);

        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Username already taken'
        });
    });

    // Test database error handling for getUserByName
    it('Failed when database error for getUserByName', async () => {
        const req = {
            body: {
                username: 'new_user',
                password: 'matching_password',
                confirmPassword: 'matching_password'
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Mock the getUserByName function to return a database error
        getUserByName.mockImplementation((username, callback) => {
            callback(new Error('Database connection error'));
        });

        await signup(req, res);

        expect(res.status).toHaveBeenCalledWith(503);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Database connection error'
        });
    });

    // Test database error handling for createUser
    it('Failed when database error for createUser', async () => {
        const req = {
            body: {
                username: 'new_user',
                password: 'matching_password',
                confirmPassword: 'matching_password'
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Mock the getUserByName function to return no existing user
        getUserByName.mockImplementation((username, callback) => {
            callback(null, undefined);
        });

        // Mock the createUser function to return a database error
        createUser.mockImplementation((data, callback) => {
            callback(new Error('Database connection error'));
        });

        await signup(req, res);

        expect(res.status).toHaveBeenCalledWith(503);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Database connection error'
        });
    });
});
