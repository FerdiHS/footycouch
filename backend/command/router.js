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
} = require("./controller");

const router = require("express").Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/users", getUsers);
router.get("/users/:username", getUserByName);
router.post("/users/:username/image", uploadImageUsers);
router.get("/users/:username/image", getImageUsers);
router.post("/users/follow", follow);
router.post("/users/unfollow", unfollow);
router.get("/users/following/:id", getUserFollowing);
router.post("/users/update/id/:id", updateUserProfileById);
router.post("/users/update/:username", updateUserProfileByUsername);
router.post("/teams/add/id/:id", addTeamById);
router.post("/teams/add/:username", addTeamByUsername);
router.post("/teams/set/id/:id", setTeamById);
router.post("/teams/set/:username", setTeamByUsername);
router.get("/players", getPlayers);
router.get("/players/id/:id", getPlayersById);
router.get("/players/goalkeeper", getGoalkeepers);
router.get("/players/defender", getDefenders);
router.get("/players/midfielder", getMidfielders);
router.get("/players/foward", getFowards);
router.get("/teams", getTeams);
router.get("/teams/id/:id", getTeamById);
router.get("/teams/:shortName", getTeamByShortName);

module.exports = router;