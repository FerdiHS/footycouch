const {
    createUser,
    getUsers,
    getUserByName
} = require("./service.js");
const {fplapi} = require("../config/fplapi.js");

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
        const username = req.params.username;
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