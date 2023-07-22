const {
    signup,
    login,
    getUsers,
    getUserByName,
    getPlayers,
    getPlayersById,
    getTeams,
    getTeamById,
    getTeamByShortName,
    uploadImageUsers,
    getImageUsers,
    follow,
    unfollow,
    getGoalkeepers,
    getUserFollowing,
    getDefenders,
    getMidfielders,
    getFowards,
    addTeamByUsername,
    addTeamById,
    setTeamById,
    setTeamByUsername,
    updateUserProfileById,
    updateUserProfileByUsername,
    getUserFollower,
    transfer,
    addPost,
    getUserPost,
    uploadBackgroundImageUsers,
    addReply,
    getReplies,
    like,
    unlike,
    getLikes,
    editReply,
    deleteReply,
    editPost,
    getPostById,
    getTeamByGameweek,
    getTeamByUser,
    getUserById,
    getAllFollowingsPosts,
    setUserFavTeam,
} = require("./controller");

const router = require("express").Router();

router.post("/signup", signup); // Signup for new user, require "username", "password", and "confirmPassword"
router.post("/login", login); // For user to login, require "username" and "password", returning the user data
router.get("/users", getUsers); // Get all users' data
router.get("/users/:username", getUserByName); // Get a certain user with given username
router.get("/users/id/:id", getUserById); // Get a certain user with given id
router.post("/users/:username/image", uploadImageUsers); // Upload the user's profile picture, require "image"
router.get("/users/:username/image", getImageUsers); // Get the user's profile picture
router.post("/users/:username/background", uploadBackgroundImageUsers); // Upload the user's background picture, require "image"
router.post("/users/id/:id/favteam", setUserFavTeam); // Set the user's favourite team, require fav_team (int)
router.post("/users/:follower/follow/:followed", follow); // Make a user follow another user
router.delete("/users/:follower/follow/:followed", unfollow); // Make a user unfollow another user
router.get("/users/following/:id", getUserFollowing); // Get the user's following list
router.get("/users/follower/:id", getUserFollower); // Get the user's follower list
router.post("/users/update/id/:id", updateUserProfileById); // Update the user's profile, require "bio"
router.post("/users/update/:username", updateUserProfileByUsername); // Update the user's profile, require "bio"
router.post("/teams/add/id/:id", addTeamById); // Add user's team when the user has not created any team, require "balance", "formation", "gk_1", "gk_2", "def_1", "def_2", "def_3", "def_4", "def_5", "mid_1", "mid_2", "mid_3", "mid_4", "mid_5", "fow_1", "fow_2", and "fow_3"
router.post("/teams/add/:username", addTeamByUsername); // Add user's team when the user has not created any team, require "balance", "formation", "gk_1", "gk_2", "def_1", "def_2", "def_3", "def_4", "def_5", "mid_1", "mid_2", "mid_3", "mid_4", "mid_5", "fow_1", "fow_2", and "fow_3"
router.post("/teams/set/id/:id", setTeamById); // Set user's team (change current team to a new one without any transfer), require "formation", "gk_1", "gk_2", "def_1", "def_2", "def_3", "def_4", "def_5", "mid_1", "mid_2", "mid_3", "mid_4", "mid_5", "fow_1", "fow_2", and "fow_3"
router.post("/teams/set/:username", setTeamByUsername); // Set user's team (change current team to a new one without any transfer), require "formation", "gk_1", "gk_2", "def_1", "def_2", "def_3", "def_4", "def_5", "mid_1", "mid_2", "mid_3", "mid_4", "mid_5", "fow_1", "fow_2", and "fow_3"
router.get("/teams/gameweek/:gameweek", getTeamByGameweek); // Get all users' team history from a certain past gameweek
router.get("/teams/users/:id", getTeamByUser); // Get users' team history from all past gameweeks
router.get("/players", getPlayers); // Get all the players
router.get("/players/id/:id", getPlayersById); // Get player by id
router.get("/players/goalkeeper", getGoalkeepers); // Get all goalkeepers
router.get("/players/defender", getDefenders); // Get all defenders
router.get("/players/midfielder", getMidfielders); // Get all midfielders
router.get("/players/foward", getFowards); // Get all fowards
router.get("/teams", getTeams); // Get all teams
router.get("/teams/id/:id", getTeamById); // Get team by id
router.get("/teams/:shortName", getTeamByShortName); // Get team by short name
router.post("/users/id/:id/transfer", transfer); // Make transfer, require "balance", "points", "position", "player_in", and "player_out"
router.post("/users/id/:id/post", addPost); // Add new post, require "content" and "image"
router.get("/users/id/:id/post", getUserPost); // Get user's post
router.put("/post/:id", editPost); // Edit post, require "content"
router.get("/post/:id", getPostById); // Get certain post by its id
router.get("/post/following/:id", getAllFollowingsPosts); // Get all posts posted by all users followed by a certain user
router.post("/reply/:replying_to", addReply); // Add new reply, require "id" (user id), "type" (true for replying post, false for replying reply), and "content"
router.get("/reply/:replying_to", getReplies); // Get replies of post or reply
router.put("/reply/:id", editReply); // Edit reply, require "content"
router.delete("/reply/:id", deleteReply); // Remove reply
router.post("/users/:id/like/:liked", like); // Add new like to post or reply
router.delete("/users/:id/like/:liked", unlike); // Remove like to post or reply
router.get("/like/:liked", getLikes); // Get likes of a post or reply

module.exports = router;