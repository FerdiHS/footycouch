const pool = require("../config/database");

module.exports = {
    createUser: (data, callBack) => {
        pool.query(
            "INSERT INTO users(username, password) values(?,?);",
            [
                data.username,
                data.password,
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    
    getUsers: callBack => {
        pool.query(
            "SELECT username FROM users",
            [],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getUserByName: (username, callBack) => {
        pool.query(
            "SELECT * FROM users WHERE BINARY username = BINARY ?;",
            [username],
            (error, results) => {
                if(error) {
                    callBack(error);
                }
                console.log(results);
                return callBack(null, results[0]);
            }
        );
    },
};