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
            [id],
            (error, results) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    updateUserProfileById: (id, bio, callBack) => {
        pool.query(
            "UPDATE users set bio=? WHERE id=?;",
            [bio, id],
            (error, results) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    updateUserProfileByUsername: (username, bio, callBack) => {
        pool.query(
            "UPDATE users set bio=? WHERE username=?;",
            [bio, username],
            (error, results) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    updateUserProfilePictureByUsername: (username, url, callBack) => {
        pool.query(
            "UPDATE users set profile_picture=? WHERE username=?;",
            [url, username],
            (error, results) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getUserProfilePictureByUsername: (username, callBack) => {
        pool.query(
            "SELECT profile_picture FROM users WHERE username = ?;",
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
        );
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
    },

    getUserFollowing: (id, callBack) => {
        pool.query(
            "SELECT * FROM follows WHERE follower_id = ?",
            [id],
            (error, results) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getUserFollower: (id, callBack) => {
        pool.query(
            "SELECT * FROM follows WHERE followed_id = ?",
            [id],
            (error, results) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    addTeamById: (id, balance, formation, gk_1, gk_2, def_1, def_2, def_3, def_4, def_5, 
            mid_1, mid_2, mid_3, mid_4, mid_5, fow_1, fow_2, fow_3, callBack) => {
        pool.query(
            "UPDATE users SET balance=?, formation=?, gk_1=?, gk_2=?, def_1=?, def_2=?, def_3=?, def_4=?, def_5=?, " +
            "mid_1=?, mid_2=?, mid_3=?, mid_4=?, mid_5=?, fow_1=?, fow_2=?, fow_3=? " +
            "WHERE id = ?",
            [balance, formation, gk_1, gk_2, def_1, def_2, def_3, def_4, def_5, mid_1, mid_2, mid_3, mid_4, mid_5, fow_1, fow_2, fow_3, id],
            (error, results) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    addTeamByUsername: (username, balance, formation, gk_1, gk_2, def_1, def_2, def_3, def_4, def_5, 
            mid_1, mid_2, mid_3, mid_4, mid_5, fow_1, fow_2, fow_3, callBack) => {
        pool.query(
            "UPDATE users SET balance=?, formation=?, gk_1=?, gk_2=?, def_1=?, def_2=?, def_3=?, def_4=?, def_5=?, " +
            "mid_1=?, mid_2=?, mid_3=?, mid_4=?, mid_5=?, fow_1=?, fow_2=?, fow_3=? " +
            "WHERE username = ?;",
            [balance, formation, gk_1, gk_2, def_1, def_2, def_3, def_4, def_5, mid_1, mid_2, mid_3, mid_4, mid_5, fow_1, fow_2, fow_3, username],
            (error, results) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    setTeamById: (id, formation, gk_1, gk_2, def_1, def_2, def_3, def_4, def_5, 
            mid_1, mid_2, mid_3, mid_4, mid_5, fow_1, fow_2, fow_3, callBack) => {
        pool.query(
            "UPDATE users SET formation=?, gk_1=?, gk_2=?, def_1=?, def_2=?, def_3=?, def_4=?, def_5=?, " +
            "mid_1=?, mid_2=?, mid_3=?, mid_4=?, mid_5=?, fow_1=?, fow_2=?, fow_3=? " +
            "WHERE id = ?",
            [formation, gk_1, gk_2, def_1, def_2, def_3, def_4, def_5, mid_1, mid_2, mid_3, mid_4, mid_5, fow_1, fow_2, fow_3, id],
            (error, results) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    setTeamByUsername: (username, formation, gk_1, gk_2, def_1, def_2, def_3, def_4, def_5, 
            mid_1, mid_2, mid_3, mid_4, mid_5, fow_1, fow_2, fow_3, callBack) => {
        pool.query(
            "UPDATE users SET formation=?, gk_1=?, gk_2=?, def_1=?, def_2=?, def_3=?, def_4=?, def_5=?, " +
            "mid_1=?, mid_2=?, mid_3=?, mid_4=?, mid_5=?, fow_1=?, fow_2=?, fow_3=? " +
            "WHERE username = ?",
            [formation, gk_1, gk_2, def_1, def_2, def_3, def_4, def_5, mid_1, mid_2, mid_3, mid_4, mid_5, fow_1, fow_2, fow_3, username],
            (error, results) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    createTransfer: (id, position, player_in, player_out, callBack) => {
        pool.query(
            "INSERT INTO transfers(user, position, player_in, player_out) values (?, ?, ?, ?);",
            [id, position, player_in, player_out],
            (error, results) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    changeCertainPlayer: (id, balance, points, position, player, callBack) => {
        pool.query(
            "UPDATE users SET balance=?, points=?, " + position + "=? WHERE id=?;",
            [balance, points, player, id],
            (error, results) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    createPost: (id, content, image, callBack) => {
        pool.query(
            "INSERT INTO posts(user, content, image) values(?,?,?);",
            [id, content, image],
            (error, results) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getUserPost: (id, callBack) => {
        pool.query(
            "SELECT * FROM posts WHERE user = ?",
            [id],
            (error, results) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
};