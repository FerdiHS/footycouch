import { useState } from "react";
import useToken from "./Token";
import axios from "axios";
import Loading from "./Loading";

export default function Statistic({player, exitStats}) {
    const playerPosition = {FWD: "Forward", MID: "Midfielder", DEF: "Defender", GKP: "Goalkeeper"};
    const [playerTypeLength, setplayerTypeLength] = useState(undefined);
    if (playerTypeLength === undefined) {
        if (player.position === "FWD") {
            const forwardPlayer = ( axios.get("https://footycouch-production.up.railway.app/players/foward")).then(x => {setplayerTypeLength(x.data.length)}).catch(err => console.log(err));
            return <Loading/>;
        } else if (player.position === "MID") {
            const midfieldPlayer = ( axios.get("https://footycouch-production.up.railway.app/players/midfielder")).then(x => {setplayerTypeLength(x.data.length)}).catch(err => console.log(err));
            return <Loading />;
        } else if (player.position === "DEF") {
            const defenderPlayer = ( axios.get("https://footycouch-production.up.railway.app/players/defender")).then(x => {setplayerTypeLength(x.data.length)}).catch(err => console.log(err));
            return <Loading />;
        } else {
            const goalkeeperPlayer = ( axios.get("https://footycouch-production.up.railway.app/players/goalkeeper")).then(x => {setplayerTypeLength(x.data.length)}).catch(err => console.log(err));
            return <Loading />;
        }
    }
    function titleCase(str) {
        return str.toLowerCase().split(' ').map(function(word) {
          return (word.charAt(0).toUpperCase() + word.slice(1));
        }).join(' ');
    }
    const changeWord = str => {
        return titleCase(str.replaceAll('_', " ").replace("now cost", "Price"));
    }
    console.log(player);
    return (
        <div class="statistic">
            <div class="playerStats">
                <img src = {"https://resources.premierleague.com/premierleague/photos/players/250x250/p" + player.photo.slice(0, player.photo.length - 3) + "png"} />
                <div class="statsPos">{playerPosition[player.position]}</div>
                <h3>{player.first_name + " " + player.second_name}</h3>
                <p>{player.teamName}</p>
                <button class="exitStats" onClick={exitStats}>X</button>
                <div class="statsRank">
                    <div class = "statscon">
                        <div class="statsColumn">
                            <p>Price</p>
                            <h3>£{player.now_cost}m</h3>
                            <p><strong style={{color:"#00a2ff"}}>{player.now_cost_rank_type}</strong> of {playerTypeLength}</p>
                        </div>
                        <div class="statsColumn">
                            <p>Form</p>
                            <h3>{player.form}</h3>
                            <p><strong style={{color:"#00a2ff"}}>{player.form_rank_type}</strong> of {playerTypeLength}</p>
                        </div>
                        <div class="statsColumn">
                            <p>Pts / Match</p>
                            <h3>{player.points_per_game}</h3>
                            <p><strong style={{color:"#00a2ff"}}>{player.points_per_game_rank_type}</strong> of {playerTypeLength}</p>
                        </div>
                        <div class="statsColumn">
                            <p>GW1 Pts</p>
                            <h3>0</h3>
                        </div>
                        <div class="statsColumn">
                            <p>Total Pts</p>
                            <h3>{player.total_points}</h3>
                        </div>
                        <div class="statsColumn">
                            <p>Total Bonus</p>
                            <h3>{player.bonus}</h3>
                        </div>
                        <div class="statsColumn">
                            <p>ICT Index</p>
                            <h3>{player.ict_index}</h3>
                            <p><strong style={{color:"#00a2ff"}}>{player.ict_index_rank_type}</strong> of {playerTypeLength}</p>
                        </div>
                        <div class="statsColumn">
                            <p>TSB%</p>
                            <h3>{player.selected_by_percent}%</h3>
                            <p><strong style={{color:"#00a2ff"}}>{player.selected_rank_type}</strong> of {playerTypeLength}</p>
                        </div>
                    </div>
                    <strong style={{color:"#00a2ff"}}>Rankings for {playerPosition[player.position]}s</strong>
                </div>
                <div class="gameStatsTitle">Statistic</div>
                <div class="gameStats">
                    
                    {
                        Object.entries(player).map((stat, index) => {
                            if (stat[1] === null || stat[1] === "" || stat[1] === undefined || stat[0].includes("name") || stat[0] === "Clicked" ||
                            stat[0] === "type_ammount" || stat[0].includes("id") || stat[0].includes("Id") || stat[0] === "position" || stat[0] === "code") {
                                return <></>
                            }
                            return <div class="statisticPlayer">{changeWord(stat[0])}<div class="typeFromRight">{stat[1] === true ? "true" : stat[1] === false ? "false" : stat[1]}</div></div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}
