const { addPost } = require('../command/controller');
const { createPost } = require('../command/service');
const { cloudinary } = require('../config/cloudinary');

// Mock the createPost function and cloudinary uploader
jest.mock('../config/cloudinary', () => ({
    cloudinary: {
        v2: {
            uploader: {
              upload: jest.fn(),
            },
        },
    }
  }));

jest.mock('../command/service', () => ({
  createPost: jest.fn(),
}));

describe('addPost function', () => {
    // Mock the console log after each test
    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    // Restore console.log after each test
    afterEach(() => {
        console.log.mockRestore();
    });
    
    // Test successful post addition without an image
    it('Successful when post without an image', async () => {
        const req = {
            params: {
                id: 1,
            },
            body: {
                content: 'Post content without image',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Mock the createPost function to return a success result
        createPost.mockImplementation((id, content, image, callback) => {
            callback(null, { insertId: 1 });
        });

        await addPost(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Post added successfully',
        });
    });

    // Test successful post addition with an image
    it('Successful when post with an image', async () => {
        const req = {
            params: {
                id: 1,
            },
            body: {
                content: 'Post content with image',
                image: 'base64-encoded-image-data',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Mock cloudinary.v2.uploader.upload to return a secure_url
        cloudinary.v2.uploader.upload.mockImplementation((image, options, callback) => {
            callback(null, { secure_url: 'https://example.com/image.jpg' });
        });

        // Mock the createPost function to return a success result
        createPost.mockImplementation((id, content, image, callback) => {
            callback(null, { insertId: 1 });
        });

        await addPost(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Post added successfully',
        });
    });

    // Test database error handling for createPost
    it('Failed when database error for createPost', async () => {
        const req = {
            params: {
                id: 1,
            },
            body: {
                content: 'Post content with image',
                image: 'base64-encoded-image-data',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Mock cloudinary.v2.uploader.upload to return a secure_url
        cloudinary.v2.uploader.upload.mockImplementation((image, options, callback) => {
            callback(null, { secure_url: 'https://example.com/image.jpg' });
        });

        // Mock the createPost function to return a database error
        createPost.mockImplementation((id, content, image, callback) => {
            callback(new Error('Database connection error'));
        });

        await addPost(req, res);

        expect(res.status).toHaveBeenCalledWith(503);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Database connection error',
        });
    });
});
