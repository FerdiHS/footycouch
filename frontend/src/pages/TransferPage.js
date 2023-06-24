import HeaderWebAfterLog from "../components/HeaderWebAfterLog.js"
import Transfer from "../components/Transfer.js";
import { useState } from "react";
import axios from "axios";
import useToken from "../components/Token";
export default function TransferPage({setToken}) {
    const [data, setdata] = useState({});
    var players = data.players;
    var transfer = data.transfer;
    const username = useToken().token;
     const loadUser = async () => {
         try {
             const users = (await axios.get("https://footycouch-production.up.railway.app/users/" + username)).data.data;
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
             var usedmoney = 0;
             const updatedPlayers = await Promise.all(
                 players.map(async p => {
                     if (p.id === null) {
                         p.name = "";
                         p.team = "";
                         p.now_cost = 0;
                         p.clicked = "";
                         return p;
                     }
                     const playerResp = (await axios.get("https://footycouch-production.up.railway.app/players/id/" + p.id)).data;
                     p.name = playerResp.web_name;
                     p.teamId = playerResp.team;
                     const teamResp = (await axios.get("https://footycouch-production.up.railway.app/teams/id/" + p.teamId)).data;
                     p.team = teamResp.short_name;
                     p.clicked = "Clicked";
                     usedmoney = usedmoney + p.now_cost;
                     return p;
                 })
             );
             const forwardTransfer = (await axios.get("https://footycouch-production.up.railway.app/players/foward")).data;
             const updatedForwardTransfer = await Promise.all(
                 forwardTransfer.map(async p => {
                     p.name = p.web_name;
                     p.teamId = p.team;
                     const teamResp = (await axios.get("https://footycouch-production.up.railway.app/teams/id/" + p.teamId)).data;
                     p.team = teamResp.short_name;
                     if (p.name === updatedPlayers[12].name || p.name === updatedPlayers[13].name || p.name === updatedPlayers[14].name) {
                         p.clicked = "Clicked";
                     } else {
                         p.clicked = "";
                     }
                     return p;
                 })
             );
             const midfieldTransfer = (await axios.get("https://footycouch-production.up.railway.app/players/midfielder")).data;
             const updatedMidfieldTransfer = await Promise.all(
                 midfieldTransfer.map(async p => {
                     p.name = p.web_name;
                     p.teamId = p.team;
                     const teamResp = (await axios.get("https://footycouch-production.up.railway.app/teams/id/" + p.teamId)).data;
                     p.team = teamResp.short_name;
                     if (p.name === updatedPlayers[7].name || p.name === updatedPlayers[8].name || p.name === updatedPlayers[9].name ||
                        p.name === updatedPlayers[10].name || p.name === updatedPlayers[11].name) {
                         p.clicked = "Clicked";
                     } else {
                         p.clicked = "";
                     }
                     return p;
                 })
             );
             const defenderTransfer = (await axios.get("https://footycouch-production.up.railway.app/players/defender")).data;
             const updatedDefenderTransfer = await Promise.all(
                 defenderTransfer.map(async p => {
                     p.name = p.web_name;
                     p.teamId = p.team;
                     const teamResp = (await axios.get("https://footycouch-production.up.railway.app/teams/id/" + p.teamId)).data;
                     p.team = teamResp.short_name;
                     if (p.name === updatedPlayers[2].name || p.name === updatedPlayers[3].name || p.name === updatedPlayers[4].name ||
                        p.name === updatedPlayers[5].name || p.name === updatedPlayers[6].name) {
                         p.clicked = "Clicked";
                     } else {
                         p.clicked = "";
                     }
                     return p;
                 })
             );
             const goalkeeperTransfer = (await axios.get("https://footycouch-production.up.railway.app/players/goalkeeper")).data;
             const updatedGoalkeeperTransfer = await Promise.all(
                 goalkeeperTransfer.map(async p => {
                     p.name = p.web_name;
                     p.teamId = p.team;
                     const teamResp = (await axios.get("https://footycouch-production.up.railway.app/teams/id/" + p.teamId)).data;
                     p.team = teamResp.short_name;
                     if (p.name === updatedPlayers[0].name || p.name === updatedPlayers[1].name) {
                         p.clicked = "Clicked";
                     } else {
                         p.clicked = "";
                     }
                     return p;
                 })
             );
             players = updatedPlayers;
             transfer = {"Forward": updatedForwardTransfer, "Midfield": updatedMidfieldTransfer, "Defender": updatedDefenderTransfer, "Goalkeeper": updatedGoalkeeperTransfer};
             usedmoney = 1000 - usedmoney;
             setdata({players: players, transfer: transfer, money: usedmoney});
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
                    <Transfer passTransfer = {transfer} passPlayers = {players} passMoney = {data.money}/>
                </div>
            );
    }
}
