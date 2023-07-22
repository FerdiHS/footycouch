import { useState, useEffect} from "react";
import axios from "axios";
import useToken from "./Token";
import Statistic from "./Statistic";
export default function Transfer({id, passPoints, passTransfer, passPlayers, passMoney, passTeams}) {
    const username = useToken().token;
    const teams = passTeams;
    const [points, setPoints] = useState(passPoints);
    const [filteredPlayer, setfilteredPlayer] = useState("");
    const [money, setmoney] = useState(passMoney);
    const [transfer, setTransfer] = useState(passTransfer)
    const [player, setplayer] = useState(passPlayers);
    const [stats, setStats] = useState(null);
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
    const [gk, setgk] = useState([...player.slice(0,2)]);
    const [defender, setdefender] = useState([...player.slice(2,7)]);
    const [midfield, setmidfield] = useState([...player.slice(7,12)]);
    const [forward, setforward] = useState([...player.slice(12,15)]);
    const [position, setPosition] = useState("Forward");
    const allPosition = ["Forward", "Midfield", "Defender", "Goalkeeper"];
    const handlePosition = e => {
        setPosition(e.target.value);
    }
    const handleFilterPlayer = e => {
        setfilteredPlayer(e.target.value);
    }
    const handleSave = () => {
        for (let i = 0; i < player.length; i++) {
            if(player[i].name === "") {
                window.alert("You need to fill all of the player");
                return;
            }
        }
        
        let initialPLayerId = [];
        for (let i = 0; i < 15; i++) {
            initialPLayerId[i] = passPlayers[i].id;
        }
        let playerId = [];
        let maxCount = [];
        for(let i = 0; i <= 20; i++) {
            maxCount[i] = 0;
        }
        for (let i = 0; i < 15; i++) {
            playerId[i] = player[i].id;
            maxCount[player[i].teamId]++;
            if(maxCount[player[i].teamId] > 3) {
                return window.alert("You cannot have more than 3 players from the same club");
            }
        }
        if(passPlayers[0].id !== null) {
            const positions = ["gk_1", "gk_2", "def_1", "def_2", "def_3", "def_4", "def_5", "mid_1", "mid_2", "mid_3", "mid_4", "mid_5", "fow_1", "fow_2", "fow_3"]
            const transfer_in = playerId.filter(x => !initialPLayerId.includes(x));
            const transfer_out = initialPLayerId.filter(x => !playerId.includes(x));
            transfer_out.forEach((player_out, i) => {
                const index_out = initialPLayerId.indexOf(player_out);
                const position = positions[index_out];
                const player_in = transfer_in[i];
                const index_in = playerId.indexOf(player_in);
                // setmoney(money + passPlayers[index_out].now_cost - player[index_in].now_cost);
                axios.post("https://footycouch-production.up.railway.app/users/id/" + id + "/transfer", {balance: money, points, position, player_in, player_out})
                .catch(err => console.log(err));
            });
        }
        let formation = "4-4-2";
        axios.post("https://footycouch-production.up.railway.app/teams/add/" + username, {balance: money, formation,
        "gk_1":playerId[0], 
        "gk_2":playerId[1],
        "def_1":playerId[2],
        "def_2":playerId[3],
        "def_3":playerId[4],
        "def_4":playerId[5],
        "def_5":playerId[6],
        "mid_1":playerId[7],
        "mid_2":playerId[8],
        "mid_3":playerId[9],
        "mid_4":playerId[10],
        "mid_5":playerId[11],
        "fow_1":playerId[12],
        "fow_2":playerId[13],
        "fow_3":playerId[14]})
        .catch(err => console.log(err));
        window.alert("Successfully Saved");
    }
    const handleAddPlayer = plyr => () => {
        if(plyr.clicked !== "") {
            return;
        }
        if (money < plyr.now_cost) {
            window.alert("Unsufficient amount of money");
            return;
        }
        if (position === "Forward") {
            for (let i = 0; i < forward.length; i++) {
                if (forward[i].name === "") {
                    plyr.clicked = "Clicked";
                    setforward([...forward.slice(0, i), plyr, ...forward.slice(i + 1)]);
                    setplayer([...player.slice(0, 12 + i), plyr, ...player.slice(12 + i + 1)])
                    setmoney(money - plyr.now_cost);
                    return;
                }
            }
            window.alert("You already picked 3 Forwards");
        }
        if (position === "Midfield") {
            for (let i = 0; i < midfield.length; i++) {
                if (midfield[i].name === "") {
                    plyr.clicked = "Clicked";
                    setmidfield([...midfield.slice(0, i), plyr, ...midfield.slice(i + 1)]);
                    setplayer([...player.slice(0, 7 + i), plyr, ...player.slice(7 + i + 1)]);
                    setmoney(money - plyr.now_cost);
                    return;
                }
            }
            window.alert("You already picked 5 Midfield");
        }
        if (position === "Defender") {
            for (let i = 0; i < defender.length; i++) {
                if (defender[i].name === "") {
                    plyr.clicked = "Clicked";
                    setdefender([...defender.slice(0, i), plyr, ...defender.slice(i + 1)]);
                    setplayer([...player.slice(0, 2 + i), plyr, ...player.slice(2 + i + 1)])
                    setmoney(money - plyr.now_cost);
                    return;
                }
            }
            window.alert("You already picked 5 Defender");
        }
        if (position === "Goalkeeper") {
            for (let i = 0; i < gk.length; i++) {
                if (gk[i].name === "") {
                    plyr.clicked = "Clicked";
                    setgk([...gk.slice(0, i), plyr, ...gk.slice(i + 1)]);
                    setplayer([...player.slice(0, i), plyr, ...player.slice(i + 1)])
                    setmoney(money - plyr.now_cost);
                    return;
                }
            }
            window.alert("You already picked 2 Goalkeeper");
        }
    }
    const handleRemove = (setposition, position, index, firstindex) => () => {
        position[index].clicked = "";
        setTransfer(transfer);
        setmoney(money + position[index].now_cost);
        setposition([...position.slice(0, index), {name: "", position: "", team: "", teamCode: 0}, ...position.slice(index + 1)])
        setplayer([...player.slice(0, firstindex + index), {name: "", position: "", team: "", teamCode: 0}, ...player.slice(firstindex + index + 1)]);
    }
    function titleCase(str) {
        return str.toLowerCase().split(' ').map(function(word) {
          return (word.charAt(0).toUpperCase() + word.slice(1));
        }).join(' ');
    }
    const exitStats = () => setStats(null);
    return (
        <div class ="container2">
            <div>
            <div class="spacing2"></div>
            <h2>Squad Selection</h2>
            <div class="field3">
            <button class="button4" onClick={handleSave}>Save</button>
                <div class="fieldcon">
                    <div class="line">
                        <div class="trans"></div>
                        {   gk.map((player, i) => {
                                return (<>
                                        {
                                            player.name ==="" 
                                                ? (<></>)
                                                : (<button class="removePlayer2" onClick={handleRemove(setgk, gk, i, 0)}></button>)
                                        }
                                        <label class="playerTeam">
                                            <img src={"https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_"+ player.teamCode + "_1-220.webp"} onClick={() => {if(player.teamCode === 0) {setPosition("Goalkeeper")} else {setStats(player)}}}/>
                                            {player.name === ""
                                                ? "Add GKP"
                                                : player.name}
                                        </label>
                                        </>) 
                                    })          
                        }
                        <div class="trans"></div>
                    </div>
                    <div class="spacing3"></div>
                    <div class="line">
                        <div class="trans"></div>
                        {   defender.map((player, i) => {
                                return (<>
                                    {
                                        player.name ==="" 
                                            ? (<></>)
                                            : (<button class="removePlayer" onClick={handleRemove(setdefender, defender, i, 2)}></button>)
                                    }
                                    
                                    <label class="playerTeam">
                                        <img src={"https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_"+ player.teamCode + "-220.webp"} onClick={() => {if(player.teamCode === 0) {setPosition("Defender")} else {setStats(player)}}}/>
                                        {player.name === ""
                                                ? "Add DEF"
                                                : player.name}
                                    </label>
                                    </>) 
                                })            
                        }
                        <div class="trans"></div>
                    </div>
                    <div class="spacing3"></div>
                    <div class="line">
                        <div class="trans"></div>
                        {   midfield.map((player, i) => {
                                return (<>
                                    {
                                        player.name ==="" 
                                            ? (<></>)
                                            : (<button class="removePlayer" onClick={handleRemove(setmidfield, midfield, i, 7)}></button>)
                                    }
                                    <label class="playerTeam">
                                        <img src={"https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_"+ player.teamCode + "-220.webp"} onClick={() => {if(player.teamCode === 0) {setPosition("Midfield")} else {setStats(player)}}}/>
                                        {player.name === ""
                                                ? "Add MID"
                                                : player.name}
                                    </label>
                                    </>) 
                                })             
                        }
                        <div class="trans"></div>
                    </div>
                    <div class="spacing3"></div>
                    <div class="line">
                        <div class="trans"></div>
                        {   forward.map((player, i) => {
                                return (<>
                                    {
                                        player.name ==="" 
                                            ? (<></>)
                                            : (<button class="removePlayer3" onClick={handleRemove(setforward, forward, i, 12)}></button>)
                                    }
                                    
                                    <label class="playerTeam">
                                        <img src={"https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_"+ player.teamCode + "-220.webp"} onClick={() => {if(player.teamCode === 0) {setPosition("Forward")} else {setStats(player)}}}/>
                                        {player.name === ""
                                                ? "Add FWD"
                                                : player.name}
                                    </label>
                                    </>) 
                                })            
                        }
                        <div class="trans"></div>
                    </div>
                </div>
            </div>
            </div>
            <div class = "transfermarket">
                <h3>Money Remaining: {money}</h3>
                <h3>Search Player</h3>
                <input type="text" class="searchPlayer" value={filteredPlayer} placeholder="Search for player..." onChange={handleFilterPlayer}/>
                <button class="searchButton" />
                <select class = "positionTransfer" onChange={handlePosition}>
                    (<option value={position}>{position}</option>)
                    {
                        allPosition.map((pos, index) => {
                            return pos == position
                                ? <></>
                                : <option value={pos}>{pos}</option>
                        })
                    }
                </select>
                <div class = "transferPlayerCon">
                    <table class="transferPlayer">
                        <tr class="transferPlayer">
                            <th class="transferPlayer" style={{width: 220}}>Player</th>
                            <th class="transferPlayer" style={{textAlign:"center", width: 70}}>€</th>
                            <th class="transferPlayer" style={{width: 70}}>+</th>
                        </tr>
                        {
                            transfer[position].filter(x => x.name.includes(filteredPlayer) || x.name.includes(titleCase(filteredPlayer)) || x.name.includes(filteredPlayer.toLowerCase())).map((player, index) => {
                                const check = player.position !== "GKP" ? "" : "_1";
                                return (<tr class="transferPlayer">
                                            <td class="transferPlayer">
                                                <img src={"https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_"+ player.team_code + check + "-220.webp"} onClick={() => setStats(player)}/>
                                                <h5>{player.name}</h5>
                                                <p>{player.position} {player.team}</p>
                                            </td>
                                            <td class="transferPlayer" style={{height: 50, textAlign:"center", width: 50}}>{player.now_cost}</td>
                                            <td class="transferPlayer"><button class={"addTransfer" + player.clicked} onClick={handleAddPlayer(player)}><h3>+</h3></button></td>
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

