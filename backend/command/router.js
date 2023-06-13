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
} = require("./controller");

const router = require("express").Router();

router.post("/signup", signup); // Signup for new user, require "username", "password", and "confirmPassword"
router.post("/login", login); // For user to login, require "username" and "password", returning the user data
router.get("/users", getUsers); // Get all users' data
router.get("/users/:username", getUserByName); // Get a certain user with given username, require "username"
router.post("/users/:username/image", uploadImageUsers); // Upload the user's profile picture, require "image" (in base64)
router.get("/users/:username/image", getImageUsers); // Get the user's profile picture in base64
router.post("/users/follow", follow); // Make a user follow another user, require "follower_id" and "followed_id"
router.post("/users/unfollow", unfollow); // Make a user unfollow another user, require "follower_id" and "followed_id"
router.get("/users/following/:id", getUserFollowing); // Get the user's following list
router.get("/users/follower/:id", getUserFollower); // Get the user's follower list
router.post("/users/update/id/:id", updateUserProfileById); // Update the user's profile, require "bio"
router.post("/users/update/:username", updateUserProfileByUsername); // Update the user's profile, require "bio"
router.post("/teams/add/id/:id", addTeamById); // Add user's team when the user has not created any team, require "formation", "gk_1", "gk_2", "def_1", "def_2", "def_3", "def_4", "def_5", "mid_1", "mid_2", "mid_3", "mid_4", "mid_5", "fow_1", "fow_2", and "fow_3"
router.post("/teams/add/:username", addTeamByUsername); // Add user's team when the user has not created any team, require "formation", "gk_1", "gk_2", "def_1", "def_2", "def_3", "def_4", "def_5", "mid_1", "mid_2", "mid_3", "mid_4", "mid_5", "fow_1", "fow_2", and "fow_3"
router.post("/teams/set/id/:id", setTeamById); // Set user's team (change current team to a new one without any transfer), require "formation", "gk_1", "gk_2", "def_1", "def_2", "def_3", "def_4", "def_5", "mid_1", "mid_2", "mid_3", "mid_4", "mid_5", "fow_1", "fow_2", and "fow_3"
router.post("/teams/set/:username", setTeamByUsername); // Set user's team (change current team to a new one without any transfer), require "formation", "gk_1", "gk_2", "def_1", "def_2", "def_3", "def_4", "def_5", "mid_1", "mid_2", "mid_3", "mid_4", "mid_5", "fow_1", "fow_2", and "fow_3"
router.get("/players", getPlayers); // Get all the players
router.get("/players/id/:id", getPlayersById); // Get player by id
router.get("/players/goalkeeper", getGoalkeepers); // Get all goalkeepers
router.get("/players/defender", getDefenders); // Get all defenders
router.get("/players/midfielder", getMidfielders); // Get all midfielders
router.get("/players/foward", getFowards); // Get all fowards
router.get("/teams", getTeams); // Get all teams
router.get("/teams/id/:id", getTeamById); // Get team by id
router.get("/teams/:shortName", getTeamByShortName); // Get team by short name

module.exports = router;