import HeaderWebAfterLog from "../components/HeaderWebAfterLog.js";
import TeamManagement from "../components/TeamManagement.js";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useToken from "../components/Token";
export default function TeamManagementPage({setToken}) {
    const navigate = useNavigate();
    const [data, setdata] = useState({});
    var players = data.players
    var formation = data.formation;
    var points = data.points;
    const username = "test";
    const loadUser = async () => {
        try {
            const users = (await axios.get("https://footycouch-production.up.railway.app/users/" + username)).data.data;
            formation = users.formation;
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
            const updatedPlayers = await Promise.all(
                players.map(async p => {
                    if (p.id === null) {
                        navigate("/transfer");
                    }
                    const playerResp = (await axios.get("https://footycouch-production.up.railway.app/players/id/" + p.id)).data;
                    p.name = playerResp.web_name;
                    p.teamId = playerResp.team;
                    const teamResp = (await axios.get("https://footycouch-production.up.railway.app/teams/id/" + p.teamId)).data;
                    p.team = teamResp.short_name;
                    return p;
                })
            );
            players = updatedPlayers;
            setdata({players: players, points: points, formation: formation});
        } catch (err) {
            console.log(err);
        }
    };
    if (players === undefined) {
        loadUser();
        return <><HeaderWebAfterLog setToken={setToken}/></>;
    } else {
        for (let i = 0; i < 15; i++) {
            console.log(players[i].team);
        }
        return (
                <div>
                    <HeaderWebAfterLog setToken={setToken}/>
                    <TeamManagement passPlayer = {players} passFormation = {formation} passPoint = {points}/>
                </div>
            );
    }
}
