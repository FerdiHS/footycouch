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
} = require("./controller");

const router = require("express").Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/users", getUsers);
router.get("/users/:name", getUserByName);
router.get("/players", getPlayers);
router.get("/players/:id", getPlayersById);
router.get("/teams", getTeams);
router.get("/teams/:id", getTeamById);
router.get("/teams/shortname/:shortName", getTeamByShortName);

module.exports = router;