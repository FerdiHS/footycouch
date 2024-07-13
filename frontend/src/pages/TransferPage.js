import HeaderWebAfterLog from "../components/HeaderWebAfterLog.js"
import Transfer from "../components/Transfer.js";
import { useState } from "react";
import axios from "axios";
import useToken from "../components/Token";
import Loading from "../components/Loading.js";
import { API_URI } from "../constants";
export default function TransferPage({setToken}) {
    const [data, setData] = useState({});
    var players = data.players;
    var transfer = data.transfer;
    const username = useToken().token;
     const loadUser = async () => {
         try {
             const users = (await axios.get(API_URI + "/users/" + username)).data.data;
             const id = users.id;
             const points = users.points;
             const balance = users.balance;
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
            const teams = (await axios.get(API_URI + "/teams")).data.teams;
            var updatedPlayers = await Promise.all(
                 players.map(async p => {
                     if (p.id === null) {
                         p.name = "";
                         p.teamId = 0;
                         p.teamCode = 0;
                         p.team = "";
                         p.now_cost = 0;
                         p.clicked = "";
                         return p;
                     }
                     return p;
                 })
             );
             const forwardTransfer = (await axios.get(API_URI + "/players/foward")).data;
             const updatedForwardTransfer = await Promise.all(
                 forwardTransfer.map(async p => {
                     p.name = p.web_name;
                     p.teamId = p.team;
                     const teamResp = teams.filter(team => team.id === p.teamId)[0];
                     p.team = teamResp.short_name;
                     p.teamName = teamResp.name;
                     p.teamCode = teamResp.code;
                     p.position = "FWD";
                     p.type_ammount = forwardTransfer.length;
                     if (p.id === updatedPlayers[12].id || p.id === updatedPlayers[13].id || p.id === updatedPlayers[14].id) {
                         p.clicked = "Clicked";
                     } else {
                         p.clicked = "";
                     }
                     return p;
                 })
             );
             const midfieldTransfer = (await axios.get(API_URI + "/players/midfielder")).data;
             const updatedMidfieldTransfer = await Promise.all(
                 midfieldTransfer.map(async p => {
                     p.name = p.web_name;
                     p.teamId = p.team;
                     p.position = "MID"
                     const teamResp = teams.filter(team => team.id === p.teamId)[0];
                     p.team = teamResp.short_name;
                     p.teamName = teamResp.name;
                     p.teamCode = teamResp.code;
                     p.type_ammount = midfieldTransfer.length;
                     if (p.id === updatedPlayers[7].id || p.id === updatedPlayers[8].id || p.id === updatedPlayers[9].id ||
                        p.id === updatedPlayers[10].id || p.id === updatedPlayers[11].id) {
                         p.clicked = "Clicked";
                     } else {
                         p.clicked = "";
                     }
                     return p;
                 })
             );
             const defenderTransfer = (await axios.get(API_URI + "/players/defender")).data;
             const updatedDefenderTransfer = await Promise.all(
                 defenderTransfer.map(async p => {
                     p.name = p.web_name;
                     p.teamId = p.team;
                     p.position = "DEF"
                     const teamResp = teams.filter(team => team.id === p.teamId)[0];
                     p.team = teamResp.short_name;
                     p.teamName = teamResp.name;
                     p.teamCode = teamResp.code;
                     p.type_ammount = defenderTransfer.length;
                     if (p.id === updatedPlayers[2].id || p.name === updatedPlayers[3].id || p.id === updatedPlayers[4].id ||
                        p.id === updatedPlayers[5].id || p.name === updatedPlayers[6].id) {
                         p.clicked = "Clicked";
                     } else {
                         p.clicked = "";
                     }
                     return p;
                 })
             );
             const goalkeeperTransfer = (await axios.get(API_URI + "/players/goalkeeper")).data;
             const updatedGoalkeeperTransfer = await Promise.all(
                 goalkeeperTransfer.map(async p => {
                     p.name = p.web_name;
                     p.teamId = p.team;
                     p.position = "GKP";
                     const teamResp = teams.filter(team => team.id === p.teamId)[0];
                     p.team = teamResp.short_name;
                     p.teamName = teamResp.name;
                     p.teamCode = teamResp.code;
                     p.type_ammount = goalkeeperTransfer.length;
                     if (p.name === updatedPlayers[0].name || p.name === updatedPlayers[1].name) {
                         p.clicked = "Clicked";
                     } else {
                         p.clicked = "";
                     }
                     return p;
                 })
             );
             updatedPlayers = updatedPlayers.map(p => {
                console.log(p);
                if(p.id === null) {
                    return p;
                } else if (p.position === "FWD") {
                    return updatedForwardTransfer.filter(x => x.id === p.id)[0];
                } else if (p.position === "MID") {
                    return updatedMidfieldTransfer.filter(x => x.id === p.id)[0];
                } else if (p.position === "DEF") {
                    return updatedDefenderTransfer.filter(x => x.id === p.id)[0];
                } else {
                    return updatedGoalkeeperTransfer.filter(x => x.id === p.id)[0];
                }
             })
             players = updatedPlayers;
             transfer = {"Forward": updatedForwardTransfer, "Midfield": updatedMidfieldTransfer, "Defender": updatedDefenderTransfer, "Goalkeeper": updatedGoalkeeperTransfer};
             setData({id, points, players, transfer, balance, teams});
         } catch (err) {
             console.log(err);
         }
     };
     if (players === undefined) {
        loadUser();
        return <><HeaderWebAfterLog setToken={setToken}/><Loading /></>;
    } else {
        return (
                <div>
                    <HeaderWebAfterLog setToken={setToken}/>
                    <Transfer id = {data.id} passPoints = {data.points} passTransfer = {transfer} passPlayers = {players} passMoney = {data.balance} passTeams={data.teams}/>
                </div>
            );
    }
}
