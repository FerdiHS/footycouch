const pool = require("../config/database");

module.exports = {
    createUser: (data, callBack) => {
        pool.query(
            "INSERT INTO users(username, password) values(?,?);",
            [
                data.username,
                data.password,
            ],
            (error, results) => {
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
            "SELECT * FROM users WHERE username = ?;",
            [username],
            (error, results) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    getUserById: (id, callBack) => {
        pool.query(
            "SELECT * FROM users WHERE id = ?;",
            [username],
            (error, results) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    checkFollow: (follower, followed, callBack) => {
        pool.query(
            "SELECT * FROM follows WHERE follower_id=? AND followed_id=?;",
            [follower, followed],
            (error, results) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    createFollow: (follower, followed, callBack) => {
        pool.query(
            "INSERT INTO follows(follower_id, followed_id) values (?, ?);",
            [follower, followed],
            (error, results) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    removeFollow: (follower, followed, callBack) => {
        pool.query(
            "DELETE FROM follows WHERE follower_id=? AND followed_id=?;",
            [follower, followed],
            (error, results) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
};