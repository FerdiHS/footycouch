const { login } = require('../command/controller');
const { getUserByName } = require('../command/service');
const { genSaltSync, hashSync, compareSync } = require("bcrypt");

// Mock the getUserByName function
jest.mock('../command/service', () => ({
  getUserByName: jest.fn(),
}));

describe('Login function', () => {
  // Test valid username and password
  it('Login with valid username and password', async () => {
    const req = {
      body: {
        username: 'valid_username',
        password: 'valid_password',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the getUserByName function to return a valid user

    const mockUser = { username: 'valid_username', password: hashSync('valid_password', genSaltSync(10)) };
    getUserByName.mockImplementation((username, callback) => {
      callback(null, mockUser);
    });

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: 1,
      message: 'Login successfully',
      data: mockUser
    });
  });

  // Test invalid username
  it('Login with invalid username', async () => {
    const req = {
      body: {
        username: 'invalid_username',
        password: 'any_password',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the getUserByName function to return null (no user found)
    getUserByName.mockImplementation((username, callback) => {
      callback(null, null);
    });

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      success: 0,
      message: 'Invalid username',
    });
  });

  // Test invalid password
  it('Login with invalid password', async () => {
    const req = {
      body: {
        username: 'valid_username',
        password: 'invalid_password',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the getUserByName function to return a valid user
    const mockUser = { username: 'valid_username', password: 'hashed_password' };
    getUserByName.mockImplementation((username, callback) => {
      callback(null, mockUser);
    });

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: 2,
      message: 'Invalid password',
    });
  });

  // Test database error handling
  it('Database error', async () => {
    const req = {
      body: {
        username: 'valid_username',
        password: 'valid_password',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    getUserByName.mockImplementation((username, callback) => {
      callback(new Error('Database error'));
    });

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(503);
    expect(res.json).toHaveBeenCalledWith({
      success: -1,
      message: 'Database connection error',
    });
  });
});
