const {
    createUser,
    getUsers,
    getUserByName
} = require("./service.js");

require("dotenv").config();

module.exports = {
    signup: (req, res) => {
        const body = req.body;
        res.setHeader('Access-Control-Allow-Origin', 'https://footycouch.vercel.app/');
        if(body.password !== body.confirmPassword) {
            return res.status(403).json({
                message: "Password and Confirm Passowrd is different"
            });
        } 

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
        res.setHeader('Access-Control-Allow-Origin', 'https://footycouch.vercel.app/');
        getUsers((err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.json({
                data: results
            });
        });
    },

    getUserByName: (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', 'https://footycouch.vercel.app/');
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
            return res.json({
                data: results
            });
        });
    },

    login: (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', 'https://footycouch.vercel.app/');
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
            // const result = compareSync(body.password, results.password);
            if(body.password === results.password) {
                return res.json({
                    success: 1,
                    message: "Login successfully",
                });
            } else {
              return res.json({
                 success: 2,
                 message: "Invalid password"
             });
            }
        });
     },
}