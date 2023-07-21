const {
    createUser,
    getUsers,
    getUserByName,
    createFollow,
    removeFollow,
    checkFollow,
    getUserFollowing,
    setTeamById,
    setTeamByUsername,
    addTeamById,
    addTeamByUsername,
    updateUserProfileById,
    updateUserProfileByUsername,
    getUserFollower,
    createTransfer,
    changeCertainPlayer,
    createPost,
    getUserPost,
    updateUserProfilePictureByUsername,
    getUserProfilePictureByUsername,
    updateUserBackgroundPictureByUsername,
    createReply,
    createLike,
    removeLike,
    getReply,
    getLike,
    updateReply,
    removeReply,
    updatePost,
    getPostById,
    getTeamFromGameWeek,
    getTeamFromUser,
    checkLiked,
    getUserById,
    getAllFollowingsPosts,
} = require("./service.js");
const {fplapi} = require("../config/fplapi.js");
const {cloudinary} = require("../config/cloudinary.js");
const fs = require('fs');
const path = require('path');

require("dotenv").config();
const { genSaltSync, hashSync, compareSync } = require("bcrypt");

module.exports = {
    signup: (req, res) => {
        const body = req.body;
        // res.setHeader('Access-Control-Allow-Origin', 'https://footycouch.vercel.app');
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
                message: "Account created"
            });
        });
    },

    getUsers: (req, res) => {
        // res.setHeader('Access-Control-Allow-Origin', 'https://footycouch.vercel.app');
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
        // res.setHeader('Access-Control-Allow-Origin', 'https://footycouch.vercel.app');
        const username = req.params.username;
        return getUserByName(username, (err, results) => {
            if(err) {
                console.log(err);
                return res.status();
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

    getUserById: (req, res) => {
        const {id} = req.params;
        return getUserById(id, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(403).json({
                    message: "Database connection error"
                });
            }
            if(!results) {
                return res.status(403).json({
                    message: "Not found"
                });
            }
            return res.status(200).json({results});
        })
    },

    login: (req, res) => {
        // res.setHeader('Access-Control-Allow-Origin', 'https://footycouch.vercel.app');
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
                    data: results
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
        const username = req.params.username;
        const image = req.body.image;
        cloudinary.v2.uploader.upload(
            image,
            {
                folder: "footycouch/profile picture",
                public_id: username
            },
            (err, results) => {
                if(err) {
                    console.log(err);
                    return res.status(403).json({
                        message: "Database connection error"
                    });
                }
                return updateUserProfilePictureByUsername(username, results.secure_url, (error, result) => {
                    if(error) {
                        console.log(error);
                        return res.status(403).json({
                            message: "Database connection error"
                        });
                    }
                    return res.status(200).json({
                        message: "Image saved successfuly"
                    });
                })
            }
        );
    },
    
    getImageUsers: (req, res) => {
        const username = req.params.username;
        getUserProfilePictureByUsername(username, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(403).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                message: "Image retrieved successfully",
                image: results.profile_picture
            })
        });
    },

    uploadBackgroundImageUsers: (req, res) => {
        const username = req.params.username;
        const image = req.body.image;
        cloudinary.v2.uploader.upload(
            image,
            {
                folder: "footycouch/background picture",
                public_id: username
            },
            (err, results) => {
                if(err) {
                    console.log(err);
                    return res.status(403).json({
                        message: "Database connection error"
                    });
                }
                return updateUserBackgroundPictureByUsername(username, results.secure_url, (error, result) => {
                    if(error) {
                        console.log(error);
                        return res.status(403).json({
                            message: "Database connection error"
                        });
                    }
                    return res.status(200).json({
                        message: "Image saved successfuly"
                    });
                })
            }
        );
    },

    follow: (req, res) => {
        // res.setHeader('Access-Control-Allow-Origin', 'https://footycouch.vercel.app');
        const {follower, followed} = req.params;
        return checkFollow(follower, followed, (err, results) => {
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
            return createFollow(follower, followed, (err, results) => {
                if(err) {
                    console.log(err);
                    return res.status(403).json({
                        message: "Database connection error"
                    });
                }
                return res.status(200).json({
                    message: "Following successful"
                });
            });
        });
    },

    unfollow: (req, res) => {
        // res.setHeader('Access-Control-Allow-Origin', 'https://footycouch.vercel.app');
        const {follower, followed} = req.params;
        return removeFollow(follower, followed, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(403).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                message: "Successfully unfollowed"
            });
        });
    },

    checkFollow: (req, res) => {
        // res.setHeader('Access-Control-Allow-Origin', 'https://footycouch.vercel.app');
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

    getUserFollowing: (req, res) => {
        // res.setHeader('Access-Control-Allow-Origin', 'https://footycouch.vercel.app');
        const id = req.params.id;
        getUserFollowing(id, (err, results) => {
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

    getUserFollower: (req, res) => {
        // res.setHeader('Access-Control-Allow-Origin', 'https://footycouch.vercel.app');
        const id = req.params.id;
        getUserFollower(id, (err, results) => {
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
        //. res.setHeader('Access-Control-Allow-Origin', 'https://footycouch.vercel.app');
        fplapi.then(response => {
            res.status(200).json({players: response.data.elements});
        });
    },

    getPlayersById: (req, res) => {
        // res.setHeader('Access-Control-Allow-Origin', 'https://footycouch.vercel.app');
        fplapi.then(response => {
            const id = req.params.id;
            const players = response.data.elements;
            const player = players.find((p) => p.id === parseInt(id));
            if (!player) {
                return res.status(404).json({ error: 'Player not found' });
            }
            res.status(200).json(player);
        });
    },

    getTeams: (req, res) => {
        // res.setHeader('Access-Control-Allow-Origin', 'https://footycouch.vercel.app');
        fplapi.then(response => {
            res.status(200).json({teams: response.data.teams});
        });
    },

    getTeamById: (req, res) => {
        // res.setHeader('Access-Control-Allow-Origin', 'https://footycouch.vercel.app');
        fplapi.then(response => {
            const id = req.params.id;
            const teams = response.data.teams;
            const team = teams.find((t) => t.id === parseInt(id));
            if (!team) {
                return res.status(404).json({ error: 'Team not found' });
            }
            res.status(200).json(team);
        });
    },

    getTeamByShortName: (req, res) => {
        // res.setHeader('Access-Control-Allow-Origin', 'https://footycouch.vercel.app');
        fplapi.then(response => {
            const shortName = req.params.shortName;
            console.log(shortName);
            const teams = response.data.teams;
            const team = teams.find((t) => t.short_name === shortName);
            if (!team) {
                return res.status(404).json({ error: 'Team not found' });
            }
            res.status(200).json(team);
        });
    },

    getGoalkeepers: (req, res) => {
        // res.setHeader('Access-Control-Allow-Origin', 'https://footycouch.vercel.app');
        fplapi.then(response => {
            const players = response.data.elements;
            const goalkeepers = players.filter((p) => p.element_type === 1);
            res.status(200).json(goalkeepers);
        });
    },

    getDefenders: (req, res) => {
        // res.setHeader('Access-Control-Allow-Origin', 'https://footycouch.vercel.app');
        fplapi.then(response => {
            const players = response.data.elements;
            const defenders = players.filter((p) => p.element_type === 2);
            res.status(200).json(defenders);
        });
    },

    getMidfielders: (req, res) => {
        // res.setHeader('Access-Control-Allow-Origin', 'https://footycouch.vercel.app');
        fplapi.then(response => {
            const players = response.data.elements;
            const midfielders = players.filter((p) => p.element_type === 3);
            res.status(200).json(midfielders);
        });
    },

    getFowards: (req, res) => {
        // res.setHeader('Access-Control-Allow-Origin', 'https://footycouch.vercel.app');
        fplapi.then(response => {
            const players = response.data.elements;
            const fowards = players.filter((p) => p.element_type === 4);
            res.status(200).json(fowards);
        });
    },

    addTeamById: (req, res) => {
        // res.setHeader('Access-Control-Allow-Origin', 'https://footycouch.vercel.app');
        const id = req.params.id;
        const balance = req.body.balance;
        const formation = req.body.formation;
        const gk_1 = req.body.gk_1;
        const gk_2 = req.body.gk_2;
        const def_1 = req.body.def_1;
        const def_2 = req.body.def_2;
        const def_3 = req.body.def_3;
        const def_4 = req.body.def_4;
        const def_5 = req.body.def_5;
        const mid_1 = req.body.mid_1;
        const mid_2 = req.body.mid_2;
        const mid_3 = req.body.mid_3;
        const mid_4 = req.body.mid_4;
        const mid_5 = req.body.mid_5;
        const fow_1 = req.body.fow_1;
        const fow_2 = req.body.fow_2;
        const fow_3 = req.body.fow_3;
        addTeamById(id, balance, formation, gk_1, gk_2, def_1, def_2, def_3, def_4, def_5, 
                mid_1, mid_2, mid_3, mid_4, mid_5, fow_1, fow_2, fow_3, (err, results) => {
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

    addTeamByUsername: (req, res) => {
        // res.setHeader('Access-Control-Allow-Origin', 'https://footycouch.vercel.app');
        const username = req.params.username;
        const balance = req.params.balance;
        const formation = req.body.formation;
        const gk_1 = req.body.gk_1;
        const gk_2 = req.body.gk_2;
        const def_1 = req.body.def_1;
        const def_2 = req.body.def_2;
        const def_3 = req.body.def_3;
        const def_4 = req.body.def_4;
        const def_5 = req.body.def_5;
        const mid_1 = req.body.mid_1;
        const mid_2 = req.body.mid_2;
        const mid_3 = req.body.mid_3;
        const mid_4 = req.body.mid_4;
        const mid_5 = req.body.mid_5;
        const fow_1 = req.body.fow_1;
        const fow_2 = req.body.fow_2;
        const fow_3 = req.body.fow_3;
        addTeamByUsername(username, balance, formation, gk_1, gk_2, def_1, def_2, def_3, def_4, def_5, 
                mid_1, mid_2, mid_3, mid_4, mid_5, fow_1, fow_2, fow_3, (err, results) => {
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

    setTeamById: (req, res) => {
        // res.setHeader('Access-Control-Allow-Origin', 'https://footycouch.vercel.app');
        const id = req.params.id;
        const formation = req.body.formation;
        const gk_1 = req.body.gk_1;
        const gk_2 = req.body.gk_2;
        const def_1 = req.body.def_1;
        const def_2 = req.body.def_2;
        const def_3 = req.body.def_3;
        const def_4 = req.body.def_4;
        const def_5 = req.body.def_5;
        const mid_1 = req.body.mid_1;
        const mid_2 = req.body.mid_2;
        const mid_3 = req.body.mid_3;
        const mid_4 = req.body.mid_4;
        const mid_5 = req.body.mid_5;
        const fow_1 = req.body.fow_1;
        const fow_2 = req.body.fow_2;
        const fow_3 = req.body.fow_3;
        setTeamById(id, formation, gk_1, gk_2, def_1, def_2, def_3, def_4, def_5, 
                mid_1, mid_2, mid_3, mid_4, mid_5, fow_1, fow_2, fow_3, (err, results) => {
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

    setTeamByUsername: (req, res) => {
        // res.setHeader('Access-Control-Allow-Origin', 'https://footycouch.vercel.app');
        const username = req.params.username;
        const formation = req.body.formation;
        const gk_1 = req.body.gk_1;
        const gk_2 = req.body.gk_2;
        const def_1 = req.body.def_1;
        const def_2 = req.body.def_2;
        const def_3 = req.body.def_3;
        const def_4 = req.body.def_4;
        const def_5 = req.body.def_5;
        const mid_1 = req.body.mid_1;
        const mid_2 = req.body.mid_2;
        const mid_3 = req.body.mid_3;
        const mid_4 = req.body.mid_4;
        const mid_5 = req.body.mid_5;
        const fow_1 = req.body.fow_1;
        const fow_2 = req.body.fow_2;
        const fow_3 = req.body.fow_3;
        setTeamByUsername(username, formation, gk_1, gk_2, def_1, def_2, def_3, def_4, def_5, 
                mid_1, mid_2, mid_3, mid_4, mid_5, fow_1, fow_2, fow_3, (err, results) => {
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

    getTeamByGameweek: (req, res) => {
        const {gameweek} = req.params;
        return getTeamFromGameWeek(gameweek, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(403).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({results});
        })
    },

    getTeamByUser: (req, res) => {
        const {id} = req.params;
        return getTeamFromUser(id, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(403).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({results});
        })
    },

    updateUserProfileById: (req, res) => {
        // res.setHeader('Access-Control-Allow-Origin', 'https://footycouch.vercel.app');
        const id = req.params.id;
        const bio = req.body.bio;
        updateUserProfileById(id, bio, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(403).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                message: "Profile updated successfully"
            });
        });
    },

    updateUserProfileByUsername: (req, res) => {
        // res.setHeader('Access-Control-Allow-Origin', 'https://footycouch.vercel.app');
        const username = req.params.username;
        const bio = req.body.bio;
        updateUserProfileByUsername(username, bio, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(403).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                message: "Profile updated successfully"
            });
        });
    },

    transfer: (req, res) => {
        const id = req.params.id;
        const balance = req.body.balance;
        const points = req.body.points;
        const position = req.body.position;
        const player_in = req.body.player_in;
        const player_out = req.body.player_out;
        createTransfer(id, position, player_in, player_out, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(403).json({
                    message: "Database connection error"
                });
            }
        });
        changeCertainPlayer(id, balance, points, position, player_in, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(403).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                message: "Transfer successful"
            });
        });
    },

    addPost: (req, res) => {
       const id = req.params.id;
       const {content, image} = req.body;
       if(image === undefined) {
        return createPost(id, content, null, (error, result) => {
            if(error) {
                console.log(error);
                return res.status(403).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                message: "Post added successfully"
            });
        });
       }
       return cloudinary.v2.uploader.upload(
        image,
        {
            folder: "footycouch/post"
        },
        (err, results) => {
            if(err) {
                console.log(err);
                return res.status(403).json({
                    message: "Database connection error"
                });
            }
            return createPost(id, content, results.secure_url, (error, result) => {
                if(error) {
                    console.log(error);
                    return res.status(403).json({
                        message: "Database connection error"
                    });
                }
                return res.status(200).json({
                    message: "Post added successfully"
                });
            });
        }
       );
       /*
       createPost(id, content, image, (err, results) => {
        if(err) {
            console.log(err);
            return res.status(403).json({
                message: "Database connection error"
            });
        }
        return res.status(200).json({
            message: "Post added successfully"
        });
       });
       */
    },

    editPost: (req, res) => {
        const {id} = req.params;
        const {content} = req.body;
        return updatePost(id, content, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(403).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                message: "Post edited successfully"
            });
        });
    },

    getUserPost: (req, res) => {
        const id = req.params.id;
        getUserPost(id, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(403).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({results});
        });
    },

    getPostById: (req, res) => {
        const {id} = req.params;
        return getPostById(id, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(403).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({results});
        });
    },

    getAllFollowingsPosts: (req, res) => {
        const {id} = req.params;
        return getAllFollowingsPosts(id, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(403).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({results});
        });
    },

    addReply: (req, res) => {
        const replying_to = req.params.replying_to;
        const {id, type, content} = req.body;
        return createReply(id, type, replying_to, content, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(403).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                message: "Reply created successfully"
            });
        });
    },

    getReplies: (req, res) => {
        const {replying_to} = req.params;
        return getReply(true, replying_to, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(403).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({results});
        });
    },

    editReply: (req, res) => {
        const {id} = req.params;
        const {content} = req.body;
        return updateReply(id, content, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(403).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                message: "Reply edited successfully"
            });
        });
    },

    deleteReply: (req, res) => {
        const {id} = req.params;
        return removeReply(id, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(403).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                message: "Reply deleted successfully"
            });
        });
    },

    like: (req, res) => {
        const {id, liked} = req.params;
        return checkLiked(id, true, liked, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(403).json({
                    message: "Database connection error"
                });
            }
            if(results.length > 0) {
                return res.status(409).json({
                    message: "Like already exists"
                })
            }
            return createLike(id, true, liked, (err, results) => {
                if(err) {
                    console.log(err);
                    return res.status(403).json({
                        message: "Database connection error"
                    });
                }
                return res.status(200).json({
                    message: "Like created successfully"
                });
            });
        });
    },

    unlike: (req, res) => {
        const {id, liked} = req.params;
        return removeLike(id, true, liked, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(403).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                message: "Like deleted successfully"
            });
        });
    },

    getLikes: (req, res) => {
        const {liked} = req.params;
        return getLike(liked, true, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(403).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({results});
        });
    },
}