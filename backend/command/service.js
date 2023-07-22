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

    getAllUserCurrentTeams: callBack => {
        pool.query(
            "SELECT id, username, formation, gk_1, gk_2, def_1, def_2, def_3, def_4, def_5, mid_1, mid_2, mid_3, mid_4, mid_5, fow_1, fow_2, fow_3 " + 
            "FROM users;",
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

    updateUserBackgroundPictureByUsername: (username, url, callBack) => {
        pool.query(
            "UPDATE users set background_picture=? WHERE username=?;",
            [url, username],
            (error, results) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    updateUserPointsById: (id, points, callBack) => {
        pool.query(
            'UPDATE users set points = ? WHERE id = ?;',
            [points, id],
            (error, results) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    updateUserFavTeamById: (id, fav_team, callBack) => {
        pool.query(
            'UPDATE users set fav_team = ? WHERE id = ?;',
            [fav_team, id],
            (error, results) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    checkFollow: (follower, followed, callBack) => {
        pool.query(
            'SELECT * FROM follows WHERE follower_id=? AND followed_id=?;',
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
            'INSERT INTO follows(follower_id, followed_id) values (?, ?);',
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

    createTeam: (user, gameweek, formation, gk_1, gk_2, def_1, def_2, def_3, def_4, def_5, mid_1, mid_2, mid_3, mid_4, mid_5, fow_1, fow_2, fow_3, callBack) => {
        pool.query(
            'INSERT INTO teams(user, gameweek, formation, gk_1, gk_2, def_1, def_2, def_3, def_4, def_5, mid_1, mid_2, mid_3, mid_4, mid_5, fow_1, fow_2, fow_3) ' +
            'values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [user, gameweek, formation, gk_1, gk_2, def_1, def_2, def_3, def_4, def_5, mid_1, mid_2, mid_3, mid_4, mid_5, fow_1, fow_2, fow_3],
            (error, results) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getTeamFromGameWeek: (gameweek, callBack) => {
        pool.query(
            'SELECT * FROM teams WHERE gameweek=?;',
            [gameweek],
            (error, results) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getTeamFromUser: (user, callBack) => {
        pool.query(
            'SELECT * FROM teams WHERE user=?;',
            [user],
            (error, results) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    updateTeamPoint: (id, total_points, gk_1_points, gk_2_points, def_1_points, def_2_points, def_3_points, def_4_points, def_5_points, 
            mid_1_points, mid_2_points, mid_3_points, mid_4_points, mid_5_points, fow_1_points, fow_2_points, fow_3_points, callBack) => {
        pool.query(
            'UPDATE teams SET total_points=?, gk_1_points=?, gk_2_points=?, def_1_points=?, def_2_points=?, def_3_points=?, def_4_points=?, def_5_points=?, ' + 
            'mid_1_points=?, mid_2_points=?, mid_3_points=?, mid_4_points=?, mid_5_points=?, fow_1_points=?, fow_2_points=?, fow_3_points=? ' +
            'WHERE id=?;',
            [total_points, gk_1_points, gk_2_points, def_1_points, def_2_points, def_3_points, def_4_points, def_5_points, 
            mid_1_points, mid_2_points, mid_3_points, mid_4_points, mid_5_points, fow_1_points, fow_2_points, fow_3_points, id],
            (error, results) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
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

    updatePost: (id, content, callBack) => {
        pool.query(
            'UPDATE posts set content = ? WHERE id = ?;',
            [content, id],
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
            'SELECT * FROM posts WHERE user = ?;',
            [id],
            (error, results) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getAllFollowingsPosts: (id, callBack) => {
        pool.query(
            'SELECT p.id, p.user, p.content, p.image, p.created_at, p.updated_at FROM posts p JOIN follows f ON p.user = f.followed_id WHERE f.follower_id = ? OR p.user = ?;',
            [id, id],
            (error, results) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getPostById: (id, callBack) => {
        pool.query(
            'SELECT * FROM posts WHERE id = ?;',
            [id],
            (error, results) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    createReply: (id, type, replying_to, content, callBack) => {
        pool.query(
            "INSERT INTO replies(user, type, replying_to, content) values(?,?,?,?);",
            [id, type, replying_to, content],
            (error, results) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getReply: (type, replying_to, callBack) => {
        pool.query(
            'SELECT * FROM replies WHERE type = ? AND replying_to = ?',
            [type, replying_to],
            (error, results) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    updateReply: (id, content, callBack) => {
        pool.query(
            'UPDATE replies set content = ? WHERE id = ?;',
            [content, id],
            (error, results) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    removeReply: (id, callBack) => {
        pool.query(
            'DELETE FROM replies WHERE id=?;',
            [id],
            (error, results) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    createLike: (id, type, liked, callBack) => {
        pool.query(
            "INSERT INTO likes(user, type, liked) values(?,?,?);",
            [id, type, liked],
            (error, results) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    removeLike: (id, type, liked, callBack) => {
        pool.query(
            "DELETE FROM likes WHERE user=? AND type=? AND liked=?;",
            [id, type, liked],
            (error, results) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getLike: (liked, type, callBack) => {
        pool.query(
            'SELECT * FROM likes WHERE type = ? AND liked = ?;',
            [type, liked],
            (error, results) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    checkLiked: (user, liked, type, callBack) => {
        pool.query(
            'SELECT * FROM likes WHERE user = ? AND liked = ? AND type = ?;',
            [user, liked, type],
            (error, results) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
};