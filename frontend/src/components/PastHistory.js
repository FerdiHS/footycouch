import { useState } from "react";
import logo from "../assets/MUN Logo.png";
import { useNavigate } from "react-router-dom";
import useToken from "./Token";
import axios from "axios";
import Statistic from "./Statistic";
import ChangeBench from "./ChangeBench";
export default function PastHistory({passPlayer, passGameweek}) {
    const [week, setweek] = useState(passGameweek.length);
    const navigate = useNavigate();
    const [formation, setformation] = useState(passGameweek[week - 1].formation);
    const username = useToken().token;
    const clubCode = {
        "": "No",
        "ARS": "Arsenal",
        "AVL": "Aston Villa",
        "BOU": "Bournemouth",
        "BRE": "Brentford",
        "BHA": "Brighton",
        "BUR": "Burnley",
        "CHE": "Chelsea",
        "CRY": "Crystal Palace",
        "EVE": "Everton",
        "FUL": "Fulham",
        "LEE": "Leeds",
        "LEI": "Leicester",
        "LIV": "Liverpool",
        "LUT": "Luton",
        "MCI": "Man City",
        "MUN": "Man Utd",
        "NEW": "Newcastle",
        "NFO": "Nott'm Forest",
        "SHU": "Sheffield Utd",
        "SOU": "Southampton",
        "TOT": "Spurs",
        "WHU": "West Ham",
        "WOL": "Wolves"
    }
    const [allweeks, setallweeks] = useState(passGameweek.map((history, index) => index + 1));
    const [player, setplayer] = useState([
        passPlayer.filter(x => x.id === passGameweek[week - 1].gk_1).map(x => {x.point = passGameweek[week - 1].gk_1_points; return x;})[0],
        passPlayer.filter(x => x.id === passGameweek[week - 1].gk_2).map(x => {x.point = passGameweek[week - 1].gk_2_points; return x;})[0],
        passPlayer.filter(x => x.id === passGameweek[week - 1].def_1).map(x => {x.point = passGameweek[week - 1].def_1_points; return x;})[0],
        passPlayer.filter(x => x.id === passGameweek[week - 1].def_2).map(x => {x.point = passGameweek[week - 1].def_2_points; return x;})[0],
        passPlayer.filter(x => x.id === passGameweek[week - 1].def_3).map(x => {x.point = passGameweek[week - 1].def_3_points; return x;})[0],
        passPlayer.filter(x => x.id === passGameweek[week - 1].def_4).map(x => {x.point = passGameweek[week - 1].def_4_points; return x;})[0],
        passPlayer.filter(x => x.id === passGameweek[week - 1].def_5).map(x => {x.point = passGameweek[week - 1].def_5_points; return x;})[0],
        passPlayer.filter(x => x.id === passGameweek[week - 1].mid_1).map(x => {x.point = passGameweek[week - 1].mid_1_points; return x;})[0],
        passPlayer.filter(x => x.id === passGameweek[week - 1].mid_2).map(x => {x.point = passGameweek[week - 1].mid_2_points; return x;})[0],
        passPlayer.filter(x => x.id === passGameweek[week - 1].mid_3).map(x => {x.point = passGameweek[week - 1].mid_3_points; return x;})[0],
        passPlayer.filter(x => x.id === passGameweek[week - 1].mid_4).map(x => {x.point = passGameweek[week - 1].mid_4_points; return x;})[0],
        passPlayer.filter(x => x.id === passGameweek[week - 1].mid_5).map(x => {x.point = passGameweek[week - 1].mid_5_points; return x;})[0],
        passPlayer.filter(x => x.id === passGameweek[week - 1].fow_1).map(x => {x.point = passGameweek[week - 1].fow_1_points; return x;})[0],
        passPlayer.filter(x => x.id === passGameweek[week - 1].fow_2).map(x => {x.point = passGameweek[week - 1].fow_2_points; return x;})[0],
        passPlayer.filter(x => x.id === passGameweek[week - 1].fow_3).map(x => {x.point = passGameweek[week - 1].fow_3_points; return x;})[0],
    ]);
    const [gk, setgk] = useState(player[0]);
    const [defender, setdefender] = useState([...player.slice(2,2 + parseInt(formation.charAt(0)))]);
    const [midfield, setmidfield] = useState([...player.slice(7,7 + parseInt(formation.charAt(2)))]);
    const [forward, setforward] = useState([...player.slice(12, 12 + parseInt(formation.charAt(4)))]);
    const [bench, setbench] = useState([player[1], ...player.slice(2 + parseInt(formation.charAt(0)), 7),
                                    ...player.slice(7 + parseInt(formation.charAt(2)), 12), 
                                    ...player.slice(12 + parseInt(formation.charAt(4)), 17)]);

    const handleWeekChange = (event) => {
        const value = event.target.value;
        if (value !== week) {
            setweek(value);
            const formation = passGameweek[week - 1].formation;
            setformation(formation);
            setplayer([
                passPlayer.filter(x => x.id === passGameweek[week - 1].gk_1).map(x => {x.point = passGameweek[week - 1].gk_1_points; return x;})[0],
                passPlayer.filter(x => x.id === passGameweek[week - 1].gk_2).map(x => {x.point = passGameweek[week - 1].gk_2_points; return x;})[0],
                passPlayer.filter(x => x.id === passGameweek[week - 1].def_1).map(x => {x.point = passGameweek[week - 1].def_1_points; return x;})[0],
                passPlayer.filter(x => x.id === passGameweek[week - 1].def_2).map(x => {x.point = passGameweek[week - 1].def_2_points; return x;})[0],
                passPlayer.filter(x => x.id === passGameweek[week - 1].def_3).map(x => {x.point = passGameweek[week - 1].def_3_points; return x;})[0],
                passPlayer.filter(x => x.id === passGameweek[week - 1].def_4).map(x => {x.point = passGameweek[week - 1].def_4_points; return x;})[0],
                passPlayer.filter(x => x.id === passGameweek[week - 1].def_5).map(x => {x.point = passGameweek[week - 1].def_5_points; return x;})[0],
                passPlayer.filter(x => x.id === passGameweek[week - 1].mid_1).map(x => {x.point = passGameweek[week - 1].mid_1_points; return x;})[0],
                passPlayer.filter(x => x.id === passGameweek[week - 1].mid_2).map(x => {x.point = passGameweek[week - 1].mid_2_points; return x;})[0],
                passPlayer.filter(x => x.id === passGameweek[week - 1].mid_3).map(x => {x.point = passGameweek[week - 1].mid_3_points; return x;})[0],
                passPlayer.filter(x => x.id === passGameweek[week - 1].mid_4).map(x => {x.point = passGameweek[week - 1].mid_4_points; return x;})[0],
                passPlayer.filter(x => x.id === passGameweek[week - 1].mid_5).map(x => {x.point = passGameweek[week - 1].mid_5_points; return x;})[0],
                passPlayer.filter(x => x.id === passGameweek[week - 1].fow_1).map(x => {x.point = passGameweek[week - 1].fow_1_points; return x;})[0],
                passPlayer.filter(x => x.id === passGameweek[week - 1].fow_2).map(x => {x.point = passGameweek[week - 1].fow_2_points; return x;})[0],
                passPlayer.filter(x => x.id === passGameweek[week - 1].fow_3).map(x => {x.point = passGameweek[week - 1].fow_3_points; return x;})[0],
            ])
            setgk(player[0]);
            setdefender([...player.slice(2,2 + parseInt(formation.charAt(0)))]);
            setmidfield([...player.slice(7,7 + parseInt(formation.charAt(2)))]);
            setforward([...player.slice(12, 12 + parseInt(formation.charAt(4)))]);
            setbench([player[1], ...player.slice(2 + parseInt(formation.charAt(0)), 7),
                        ...player.slice(7 + parseInt(formation.charAt(2)), 12), 
                        ...player.slice(12 + parseInt(formation.charAt(4)), 17)]);
        }
    }

    const [stats, setStats] = useState(null);
    const exitStats = () => setStats(null);
    console.log("HIHII");
    return (
        <div class ="container2">
            <div>
            <div class="spacing2"></div>
            <h2>GameWeek {week}</h2>
            <div class="field">
                <div class="fieldcon">
                    <div class="line">
                        <div class="trans"></div>
                        <label class="playerTeam">
                            <img src={"https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_"+ gk.team_code + "_1-220.webp"} onClick={() => setStats(gk)}/>
                            {gk.name}
                        </label>
                        <div class="trans"></div>
                    </div>
                    <div class="spacing6"></div>
                    <div class="line">
                        <div class="trans"></div>
                        {   defender.map((player, i) => {
                            return  <label class="playerTeam">
                                        <img src={"https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_"+ player.team_code+ "-220.webp"} onClick={() => setStats(player)}/>
                                        {player.name}
                                    </label>   
                        })          
                        }
                        <div class="trans"></div>
                    </div>
                    <div class="spacing6"></div>
                    <div class="line">
                        <div class="trans"></div>
                        {   midfield.map((player, i) => {
                            return  <label class="playerTeam">
                                        <img src={"https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_"+ player.team_code+ "-220.webp"} onClick={() => setStats(player)}/>
                                        {player.name}
                                    </label>   
                        })          
                        }
                        <div class="trans"></div>
                    </div>
                    <div class="spacing6"></div>
                    <div class="line">
                        <div class="trans"></div>
                        {   forward.map((player, i) => {
                        return  <label class="playerTeam">
                                    <img src={"https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_"+ player.team_code+ "-220.webp"} onClick={() => setStats(player)}/>
                                    {player.name}
                                </label>
                        })          
                        }
                        <div class="trans"></div>
                    </div>
                    <div class="spacing6"></div>
                    <div class="bench">
                        <h5>Bench</h5>
                        <div class="line2">
                            {   bench.map((player, i) => {
                                const check = player.position === "GKP" ? "_1" : ""
                                return (<label class="playerTeam">
                                            {player.position}
                                            <img src={"https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_"+ player.team_code + check + "-220.webp"} onClick={() => setStats(player)}/>
                                            {player.name}
                                        </label>)
                                    
                            })          
                            }

                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div class="containers">
                <div class="spacing2"></div>
                <div style={{display: "flex"}}>
                <label><>GameWeek:</>
                    <div class="spacing"></div>
                    <div class="select">
                        <select onChange={handleWeekChange}>
                            {   allweeks.map((gameweek, i) => {
                                    return (<option value={gameweek}>{gameweek}</option>)
                                })
                            }
                        </select>
                    </div>
                </label>
                </div>
                <div class="spacing4"></div>
                <div class= "point">
                    <h1>{passGameweek[week - 1].total_points}</h1>
                    <>Points</>
                </div>
                <div class="spacing4"></div>
                <h2>Players</h2>
                <div class = "transferPlayerCon" style={{height: 550}}>
                    
                    <table class="transferPlayer">
                        <tr class="transferPlayer">
                            <th class="transferPlayer" style={{width: 220}}>Player</th>
                            <th class="transferPlayer" style={{textAlign:"center", width: 70}}>Points</th>
                        </tr>
                        {
                            player.map((player, index) => {
                                const check = player.position !== "GKP" ? "" : "_1";
                                return (<tr class="transferPlayer">
                                            <td class="transferPlayer">
                                                <img src={"https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_"+ player.team_code + check + "-220.webp"} onClick={() => setStats(player)}/>
                                                <h5>{player.name}</h5>
                                                <p>{player.position} {player.team}</p>
                                            </td>
                                            <td class="transferPlayer" style={{height: 50, textAlign:"center", width: 50}}>{player.point}</td>
                                        </tr>)
                            })
                        }
                    </table>
                </div>
            </div>
            {
                stats !== null 
                    ? <Statistic player={stats} exitStats={exitStats}/>
                    : <></> 
            }

        </div>
    );
}
