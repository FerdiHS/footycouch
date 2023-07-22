import HeaderWebAfterLog from "../components/HeaderWebAfterLog.js";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useToken from "../components/Token";
import Loading from "../components/Loading.js";
import PastHistory from "../components/PastHistory.js";
export default function TeamManagementPage({setToken}) {
    const navigate = useNavigate();
    const [data, setdata] = useState({});
    var players = data.players;
    var gameweek = data.gameweek;
    const username = useToken().token;
    const loadUser = async () => {
        try {
            const users = (await axios.get("https://footycouch-production.up.railway.app/users/" + username)).data.data;
            const gameweeks = (await axios.get("https://footycouch-production.up.railway.app/teams/users/" + users.id)).data.results
            const shortTeamById = []
            gameweek = gameweeks;
            shortTeamById[0] = "";
            const teamResp = (await axios.get("https://footycouch-production.up.railway.app/teams")).data.teams;
            teamResp.forEach(x => {
                shortTeamById[x.id] = x;
            });
            const allPlayer = (await axios.get("https://footycouch-production.up.railway.app/players")).data.players;
            const updatedPlayers = await Promise.all(
                allPlayer.map(async p => {
                    p.name = p.web_name;
                    p.teamName = shortTeamById[p.team].name;
                    p.team = shortTeamById[p.team].short_name;
                    p.position = p.element_type === 1
                                    ? "GKP"
                                    : p.element_type === 2
                                    ? "DEF"
                                    : p.element_type === 3
                                    ? "MID"
                                    : "FWD";
                    return p;
                })
            );
            players = updatedPlayers;
            setdata({players: players, gameweek: gameweeks});
        } catch (err) {
            console.log(err);
        }
    };
    if (players === undefined) {
        loadUser();
        return <><HeaderWebAfterLog setToken={setToken}/><Loading /></>;
    } else {
        if(gameweek.length === 0) {
            return <div>
                <HeaderWebAfterLog setToken={setToken}/>
                <h1 style={{width: "100vw", textAlign: "center"}}>League hasn't started yet</h1>
            </div>
        } else {
            console.log(gameweek);
            return (
                <div>
                    <HeaderWebAfterLog setToken={setToken}/>
                    <PastHistory passPlayer={players} passGameweek={gameweek} />
                </div>
            );
        }
        
    }
}
