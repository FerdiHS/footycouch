const {
    createUser,
    getUsers,
    getUserByName,
    createFollow,
    removeFollow,
    checkFollow,
    // uploadImageUser
} = require("./service.js");
const {fplapi} = require("../config/fplapi.js");
const fs = require('fs');
const path = require('path');

require("dotenv").config();
const { genSaltSync, hashSync, compareSync } = require("bcrypt");

module.exports = {
    signup: (req, res) => {
        const body = req.body;
        res.setHeader('Access-Control-Allow-Origin', 'https://footycouch.vercel.app');
        if(body.password !== body.confirmPassword) {
            return res.status(403).json({
                message: "Password and Confirm Passowrd is different"
            });
        } 
        
        // Hashing the password
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        createUser(body, (err, results) =>{
            if(err) {
                console.log(err);
                return res.status(403).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                data: results
            });
        });
    },

    getUsers: (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', 'https://footycouch.vercel.app');
        getUsers((err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.status(200).json({
                data: results
            });
        });
    },

    getUserByName: (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', 'https://footycouch.vercel.app');
        const username = req.body.username;
        getUserByName(username, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            if(!results) {
                return res.status(403).json({
                    message: "Not found"
                });
            }
            return res.status(200).json({
                data: results
            });
        });
    },

    login: (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', 'https://footycouch.vercel.app');
        const body = req.body;
        getUserByName(body.username, (err, results) => {
            if(err) {
                console.log(err);
            }
            if(!results) {
                return res.status(403).json({
                    success: 0,
                    message: "Invalid username"
                });
            }
            if(compareSync(body.password, results.password)) {
                return res.status(200).json({
                    success: 1,
                    message: "Login successfully",
                });
            } else {
              return res.status(401).json({
                 success: 2,
                 message: "Invalid password"
             });
            }
        });
    },

    uploadImageUsers: (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', 'https://footycouch.vercel.app');
        const base64Image = req.body.image;
        const username = req.body.username;
        const imageBuffer = Buffer.from(base64Image, "base64");
        const imagePath = path.join(__dirname, "..", "assets", "profile picture", username + ".jpg");

        // Write the image buffer to the file system
        fs.writeFile(imagePath, imageBuffer, (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({
                    message: "Error saving the image."
                });
            } else {
                res.status(200).json({
                    message: "Image saved successfully."
                });
            }
        });
    },
    
    getImageUsers: (req, res) => {
        const username = req.body.username;
        const imagePath = path.join(__dirname, "..", "assets", "profile picture", username + ".jpg");
        // Read the image file
        fs.readFile(imagePath, (err, data) => {
          if (err) {
            console.error(err);
            res.status(500).json({
                message: 'Error retrieving the image.'
            });
          } else {
            // Convert the image data to base64
            const base64Image = Buffer.from(data).toString('base64');
            res.status(200).json({
                message: "Image retrieved successfully",
                image: base64Image
            });
          }
        });
    },

    follow: (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', 'https://footycouch.vercel.app');
        const follower = req.body.follower;
        const followed = req.body.followed;
        checkFollow(follower, followed, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(403).json({
                    message: "Database connection error"
                });
            }
            if(results.length > 0) {
                return res.status(409).json({
                    message: "Following already exists"
                })
            }
            createFollow(follower, followed, (err, results) => {
                if(err) {
                    console.log(err);
                    return res.status(403).json({
                        message: "Database connection error"
                    });
                }
                return res.status(200).json({
                    data: results
                });
            })
        });
    },

    unfollow: (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', 'https://footycouch.vercel.app');
        const follower = req.body.follower;
        const followed = req.body.followed;
        removeFollow(follower, followed, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(403).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                data: results
            });
        })
    },

    checkFollow: (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', 'https://footycouch.vercel.app');
        const follower = req.body.follower;
        const followed = req.body.followed;
        checkFollow(follower, followed, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(403).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                data: results
            });
        })
    },

    getPlayers: (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', 'https://footycouch.vercel.app');
        fplapi.then(response => {
            res.status(200).json({players: response.data.elements});
        });
    },

     getPlayersById: (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', 'https://footycouch.vercel.app');
        fplapi.then(response => {
            const id = req.body.id;
            const players = response.data.elements;
            const player = players.find((p) => p.id === parseInt(id));
            if (!player) {
                return res.status(404).json({ error: 'Player not found' });
            }
            res.status(200).json(player);
        });
    },

    getTeams: (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', 'https://footycouch.vercel.app');
        fplapi.then(response => {
            res.status(200).json({teams: response.data.teams});
        });
    },

     getTeamById: (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', 'https://footycouch.vercel.app');
        fplapi.then(response => {
            const id = req.body.id;
            const teams = response.data.teams;
            const team = teams.find((t) => t.id === parseInt(id));
            if (!team) {
                return res.status(404).json({ error: 'Team not found' });
            }
            res.status(200).json(team);
        });
    },

    getTeamByShortName: (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', 'https://footycouch.vercel.app');
        fplapi.then(response => {
            const shortName = req.body.shortName;
            console.log(shortName);
            const teams = response.data.teams;
            const team = teams.find((t) => t.short_name === shortName);
            if (!team) {
                return res.status(404).json({ error: 'Team not found' });
            }
            res.status(200).json(team);
        });
    }
}