import { useState, useEffect } from "react";
import useToken from "./Token";
export default function Transfer({passTransfer, passPlayers, passMoney}) {
    const username = useToken().token;
    const [money, setmoney] = useState(passMoney);
    const [transfer, setTransfer] = useState(passTransfer)
    const [player, setplayer] = useState(passPlayers);
    const clubCode = {
        "": "No",
        "ARS": "Arsenal",
        "AVL": "Aston Villa",
        "BRE": "Brentford",
        "BOU": "Bournemouth",
        "BHA": "Brighton",
        "SOU": "Southampton",
        "CHE": "Chelsea",
        "CRY": "Crystal Palace",
        "FUL": "Fulham",
        "EVE": "Everton",
        "LEE": "Leeds",
        "LEI": "Leichester",
        "LIV": "Liverpool",
        "MCI": "Manchester City",
        "MUN": "Manchester United",
        "NEW": "Newcastle",
        "TOT": "Tottenham Hotspur",
        "WHU": "Westham",
        "WOL": "Wolferhampton",
        "NFO": "Nottingham Forest"
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
    const handlesafe = () => {
        for (let i = 0; i < player.length; i++) {
            if(player[i].name === "") {
                window.alert("You need to fill all of the player");
                return;
            }
        }
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
                    setplayer([...player.slice(12, 12 + i), plyr, ...player.slice(12 + i + 1)])
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
                    setplayer([...player.slice(7, 7 + i), plyr, ...player.slice(7 + i + 1)]);
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
                    setplayer([...player.slice(2, 2 + i), plyr, ...player.slice(2 + i + 1)])
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
        setposition([...position.slice(0, index), {name: "", position: "", team: ""}, ...position.slice(index + 1)])
        setplayer([...player.slice(0, firstindex + index), {name: "", position: "", team: ""}, ...player.slice(firstindex + index + 1)]);
    }
    return (
        <div class ="container2">
            <div>
            <div class="spacing2"></div>
            <h2>Squad Selection</h2>
            <div class="field3">
            <button class="button4" onClick={handlesafe}>Save</button>
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
                                            <img src={require("../assets/Jersey/"+ clubCode[player.team] +" GK Jersey.png")} />
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
                                        <img src={require("../assets/Jersey/"+ clubCode[player.team] +" Jersey.png")} />
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
                                        <img src={require("../assets/Jersey/"+ clubCode[player.team] +" Jersey.png")} />
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
                                        <img src={require("../assets/Jersey/"+ clubCode[player.team] +" Jersey.png")} />
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
                <input type="text" class="searchPlayer" placeholder="Search for player..."/>
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
                            transfer[position].map((player, index) => {
                                const check = player.position !== "GKP" ? "" : " GK";
                                return (<tr class="transferPlayer">
                                            <td class="transferPlayer">
                                                <img src={require("../assets/Jersey/"+ clubCode[player.team] + check +" Jersey.png")} />
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
        </div>
    );
}
