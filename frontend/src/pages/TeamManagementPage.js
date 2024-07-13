import HeaderWebAfterLog from "../components/HeaderWebAfterLog.js";
import TeamManagement from "../components/TeamManagement.js";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useToken from "../components/Token";
import Loading from "../components/Loading.js";
import { API_URI } from "../constants";
export default function TeamManagementPage({setToken}) {
    const navigate = useNavigate();
    const [data, setdata] = useState({});
    var id = data.id;
    var players = data.players
    var formation = data.formation;
    var points = data.points;
    var favteams = data.favteams;
    var teams = data.teams;
    const username = useToken().token;
    const loadUser = async () => {
        try {
            const users = (await axios.get(API_URI + "/users/" + username)).data.data;
            id = users.id;
            formation = users.formation;
            points = users.points;
            favteams = users.fav_team
            players = ([
                {
                    position: "GKP",
                    id: users.gk_1,
                },
                {
                    position: "GKP",
                    id: users.gk_2
                },
                {
                    position: "DEF",
                    id: users.def_1
                },
                {
                    position: "DEF",
                    id: users.def_2
                },
                {
                    position: "DEF",
                    id: users.def_3
                },
                {
                    position: "DEF",
                    id: users.def_4
                },
                {
                    position: "DEF",
                    id: users.def_5
                },
                {
                    position: "MID",
                    id: users.mid_1
                },
                {
                    position: "MID",
                    id: users.mid_2
                },
                {
                    position: "MID",
                    id: users.mid_3
                },
                {
                    position: "MID",
                    id: users.mid_4
                },
                {
                    position: "MID",
                    id: users.mid_5
                },
                {
                    position: "FWD",
                    id: users.fow_1
                },
                {
                    position: "FWD",
                    id: users.fow_2
                },
                {
                    position: "FWD",
                    id: users.fow_3
                },
            ]);
            const shortTeamById = []
            shortTeamById[0] = "";
            const teamResp = (await axios.get(API_URI + "/teams")).data.teams;
            teamResp.forEach(x => {
                shortTeamById[x.id] = x;
            });
            teams = teamResp;
            const updatedPlayers = await Promise.all(
                players.map(async p => {
                    if (p.id === null) {
                        navigate("/transfer");
                    }
                    const playerResp = (await axios.get(API_URI + "/players/id/" + p.id)).data;
                    playerResp.name = playerResp.web_name;
                    playerResp.teamName = shortTeamById[playerResp.team].name;
                    playerResp.team = shortTeamById[playerResp.team].short_name;
                    playerResp.position = p.position;
                    return playerResp;
                })
            );
            players = updatedPlayers;
            setdata({players: players, points: points, formation: formation, favteams: favteams, teams: teams, id: id});
        } catch (err) {
            console.log(err);
        }
    };
    if (players === undefined) {
        loadUser();
        return <><HeaderWebAfterLog setToken={setToken}/><Loading /></>;
    } else {
        console.log(id);
        return (
                <div>
                    <HeaderWebAfterLog setToken={setToken}/>
                    <TeamManagement passId = {id} passPlayer = {players} passFormation = {formation} passPoint = {points} passfavteams={favteams} passTeams={teams}/>
                </div>
            );
    }
}
