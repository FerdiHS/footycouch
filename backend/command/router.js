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
} = require("./controller");

const router = require("express").Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/users", getUsers);
router.get("/users/:name", getUserByName);
router.post("/users/:username/image", uploadImageUsers);
router.get("/users/:username/image", getImageUsers);
router.get("/players", getPlayers);
router.get("/players/:id", getPlayersById);
router.get("/teams", getTeams);
router.get("/teams/id/:id", getTeamById);
router.get("/teams/:shortName", getTeamByShortName);

module.exports = router;