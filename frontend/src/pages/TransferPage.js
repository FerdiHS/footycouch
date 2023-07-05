import HeaderWebAfterLog from "../components/HeaderWebAfterLog.js"
import Transfer from "../components/Transfer.js";
import { useState } from "react";
import axios from "axios";
import useToken from "../components/Token";
export default function TransferPage({setToken}) {
    const [data, setData] = useState({});
    var players = data.players;
    var transfer = data.transfer;
    var shortTeamById = [];
    var forwardTransfer = [];
    var midfieldTransfer = [];
    var defenderTransfer = [];
    var goalkeeperTransfer = [];
    const username = useToken().token;
     const loadUser = async () => {
             const users = (await axios.get("https://footycouch-production.up.railway.app/users/" + username)).data.data;
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
             shortTeamById[0] = "";
             const teamResp = (await axios.get("https://footycouch-production.up.railway.app/teams")).data.teams;
             teamResp.forEach(x => {
                 shortTeamById[x.id] = x.short_name;
             });
             const updatedPlayers = await Promise.all(
                 players.map(async p => {
                     if (p.id === null) {
                         p.name = "";
                         p.teamId = 0;
                         p.team = "";
                         p.now_cost = 0;
                         p.clicked = "";
                         return p;
                     }
                     const playerResp = (await axios.get("https://footycouch-production.up.railway.app/players/id/" + p.id)).data;
                     p.name = playerResp.web_name;
                     p.team = shortTeamById[playerResp.team];
                     p.now_cost = playerResp.now_cost;
                     p.clicked = "Clicked";
                     return p;
                 })
             );
             
             forwardTransfer = (await axios.get("https://footycouch-production.up.railway.app/players/foward")).data;
             const updatedForwardTransfer = [];
             for(let i = 0; i < 10; i++) {
                const p = forwardTransfer[i];
                p.name = p.web_name;
                p.team = shortTeamById[p.team];
                if (p.name === updatedPlayers[12].name || p.name === updatedPlayers[13].name || p.name === updatedPlayers[14].name) {
                    p.clicked = "Clicked";
                } else {
                    p.clicked = "";
                }
                updatedForwardTransfer.push(p);
             }

             midfieldTransfer = (await axios.get("https://footycouch-production.up.railway.app/players/midfielder")).data;
             const updatedMidfieldTransfer = [];
             for(let i = 0; i < 10; i++) {
                const p = midfieldTransfer[i];
                p.name = p.web_name;
                p.team = shortTeamById[p.team];
                if (p.name === updatedPlayers[7].name || p.name === updatedPlayers[8].name || p.name === updatedPlayers[9].name ||
                p.name === updatedPlayers[10].name || p.name === updatedPlayers[11].name) {
                    p.clicked = "Clicked";
                } else {
                    p.clicked = "";
                }
                updatedMidfieldTransfer.push(p);
             }
             defenderTransfer = (await axios.get("https://footycouch-production.up.railway.app/players/defender")).data;
             const updatedDefenderTransfer = [];
             for(let i = 0; i < 10; i++) {
                const p = defenderTransfer[i];
                p.name = p.web_name;
                p.team = shortTeamById[p.team];
                if (p.name === updatedPlayers[2].name || p.name === updatedPlayers[3].name || p.name === updatedPlayers[4].name ||
                p.name === updatedPlayers[5].name || p.name === updatedPlayers[6].name) {
                    p.clicked = "Clicked";
                } else {
                    p.clicked = "";
                }
                updatedDefenderTransfer.push(p);
             }
             goalkeeperTransfer = (await axios.get("https://footycouch-production.up.railway.app/players/goalkeeper")).data;
             const updatedGoalkeeperTransfer = [];
             for(let i = 0; i < 10; i++) {
                const p = goalkeeperTransfer[i];
                p.name = p.web_name;
                p.team = shortTeamById[p.team];
                if (p.name === updatedPlayers[0].name || p.name === updatedPlayers[1].name) {
                    p.clicked = "Clicked";
                } else {
                    p.clicked = "";
                }
                updatedDefenderTransfer.push(p);
             }
             players = updatedPlayers;
             transfer = {
                Forward: updatedForwardTransfer,
                Midfield: updatedMidfieldTransfer,
                Defender: updatedDefenderTransfer,
                Goalkeeper: updatedGoalkeeperTransfer
             }
             // transfer = {"Forward": updatedForwardTransfer, "Midfield": updatedMidfieldTransfer, "Defender": updatedDefenderTransfer, "Goalkeeper": updatedGoalkeeperTransfer};
             setData({id, points, players, transfer, balance});
     };
     if (players === undefined) {
        loadUser();
        return <><HeaderWebAfterLog setToken={setToken}/></>;
    } else {
        return (
                <div>
                    <HeaderWebAfterLog setToken={setToken}/>
                    <Transfer 
                        id = {data.id} 
                        passPoints = {data.points} 
                        passTransfer = {data.transfer} 
                        passPlayers = {players} 
                        passMoney = {data.balance}
                    />
                </div>
            );
    }
}
