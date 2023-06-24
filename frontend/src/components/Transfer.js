import { useState, useEffect } from "react";
import { Buffer } from "buffer";
import axios from "axios";
import useToken from "./Token";
export default function Transfer() {
    const username = useToken().token;
    const [money, setmoney] = useState(1000);
    const [id, setId] = useState(0);
    const [transfer, setTransfer] = useState({
        "Forward": [
        {
            name: "H. Kane",
            position: "FWD",
            team: "TOT",
            now_cost: 15,
            clicked: ""
        },
        {
            name: "E. Haaland",
            position: "FWD",
            team: "MCI",
            now_cost: 20,
            clicked: ""
        },
        {
            name: "H. Kane",
            position: "FWD",
            team: "TOT",
            now_cost: 15,
            clicked: ""
        },
        {
            name: "E. Haaland",
            position: "FWD",
            team: "MCI",
            now_cost: 20,
            clicked: ""
        },
        {
            name: "H. Kane",
            position: "FWD",
            team: "TOT",
            now_cost: 15,
            clicked: ""
        },
        {
            name: "E. Haaland",
            position: "FWD",
            team: "MCI",
            now_cost: 20,
            clicked: ""
        },
        {
            name: "H. Kane",
            position: "FWD",
            team: "TOT",
            now_cost: 15,
            clicked: ""
        },
        {
            name: "E. Haaland",
            position: "FWD",
            team: "MCI",
            now_cost: 20,
            clicked: ""
        },
        {
            name: "H. Kane",
            position: "FWD",
            team: "TOT",
            now_cost: 15,
            clicked: ""
        },
        {
            name: "E. Haaland",
            position: "FWD",
            team: "MCI",
            now_cost: 20,
            clicked: ""
        },
        {
            name: "H. Kane",
            position: "FWD",
            team: "TOT",
            now_cost: 15,
            clicked: ""
        },
        {
            name: "E. Haaland",
            position: "FWD",
            team: "MCI",
            now_cost: 20,
            clicked: ""
        },
        {
            name: "H. Kane",
            position: "FWD",
            team: "TOT",
            now_cost: 15,
            clicked: ""
        },
        {
            name: "E. Haaland",
            position: "FWD",
            team: "MCI",
            now_cost: 20,
            clicked: ""
        },
        {
            name: "H. Kane",
            position: "FWD",
            team: "TOT",
            now_cost: 15,
            clicked: ""
        },
        {
            name: "E. Haaland",
            position: "FWD",
            team: "MCI",
            now_cost: 20,
            clicked: ""
        },
        {
            name: "H. Kane",
            position: "FWD",
            team: "TOT",
            now_cost: 15,
            clicked: ""
        },
        {
            name: "E. Haaland",
            position: "FWD",
            team: "MCI",
            now_cost: 20,
            clicked: ""
        },
        {
            name: "H. Kane",
            position: "FWD",
            team: "TOT",
            now_cost: 15,
            clicked: ""
        },
        {
            name: "E. Haaland",
            position: "FWD",
            team: "MCI",
            now_cost: 20,
            clicked: ""
        },
    ],
    "Midfield": [
        {
            name: "K. De Bruyne",
            position: "MID",
            team: "MCI",
            now_cost: 15,
            clicked: ""
        },
        {
            name: "A. Mac Allister",
            position: "MID",
            team: "LIV",
            now_cost: 10,
            clicked: ""
        },
        {
            name: "K. De Bruyne",
            position: "MID",
            team: "MCI",
            now_cost: 15,
            clicked: ""
        },
        {
            name: "A. Mac Allister",
            position: "MID",
            team: "LIV",
            now_cost: 10,
            clicked: ""
        },
        {
            name: "K. De Bruyne",
            position: "MID",
            team: "MCI",
            now_cost: 15,
            clicked: ""
        },
        {
            name: "A. Mac Allister",
            position: "MID",
            team: "LIV",
            now_cost: 10,
            clicked: ""
        },
        {
            name: "K. De Bruyne",
            position: "MID",
            team: "MCI",
            now_cost: 15,
            clicked: ""
        },
        {
            name: "A. Mac Allister",
            position: "MID",
            team: "LIV",
            now_cost: 10,
            clicked: ""
        },
        {
            name: "K. De Bruyne",
            position: "MID",
            team: "MCI",
            now_cost: 15,
            clicked: ""
        },
        {
            name: "A. Mac Allister",
            position: "MID",
            team: "LIV",
            now_cost: 10,
            clicked: ""
        },
        {
            name: "K. De Bruyne",
            position: "MID",
            team: "MCI",
            now_cost: 15,
            clicked: ""
        },
        {
            name: "A. Mac Allister",
            position: "MID",
            team: "LIV",
            now_cost: 10,
            clicked: ""
        },
    ],
    "Defender": [
        {
            name: "V. van Dijk",
            position: "DEF",
            team: "LIV",
            now_cost: 15,
            clicked: ""
        },
        {
            name: "W. Saliba",
            position: "DEF",
            team: "ARS",
            now_cost: 10,
            clicked: ""
        },
        {
            name: "V. van Dijk",
            position: "DEF",
            team: "LIV",
            now_cost: 15,
            clicked: ""
        },
        {
            name: "W. Saliba",
            position: "DEF",
            team: "ARS",
            now_cost: 10,
            clicked: ""
        },
        {
            name: "V. van Dijk",
            position: "DEF",
            team: "LIV",
            now_cost: 15,
            clicked: ""
        },
        {
            name: "W. Saliba",
            position: "DEF",
            team: "ARS",
            now_cost: 10,
            clicked: ""
        },
        {
            name: "V. van Dijk",
            position: "DEF",
            team: "LIV",
            now_cost: 15,
            clicked: ""
        },
        {
            name: "W. Saliba",
            position: "DEF",
            team: "ARS",
            now_cost: 10,
            clicked: ""
        },
        {
            name: "V. van Dijk",
            position: "DEF",
            team: "LIV",
            now_cost: 15,
            clicked: ""
        },
        {
            name: "W. Saliba",
            position: "DEF",
            team: "ARS",
            now_cost: 10,
            clicked: ""
        },
        {
            name: "V. van Dijk",
            position: "DEF",
            team: "LIV",
            now_cost: 15,
            clicked: ""
        },
        {
            name: "W. Saliba",
            position: "DEF",
            team: "ARS",
            now_cost: 10,
            clicked: ""
        },
        {
            name: "V. van Dijk",
            position: "DEF",
            team: "LIV",
            now_cost: 15,
            clicked: ""
        },
        {
            name: "W. Saliba",
            position: "DEF",
            team: "ARS",
            now_cost: 10,
            clicked: ""
        },
        {
            name: "V. van Dijk",
            position: "DEF",
            team: "LIV",
            now_cost: 15,
            clicked: ""
        },
        {
            name: "W. Saliba",
            position: "DEF",
            team: "ARS",
            now_cost: 10,
            clicked: ""
        },
    ],
    "Goalkeeper": [
        {
            name: "Alisson",
            position: "GKP",
            team: "LIV",
            now_cost: 15,
            clicked: ""
        },
        {
            name: "Ederson",
            position: "GKP",
            team: "MCI",
            now_cost: 10,
            clicked: ""
        },
        {
            name: "Alisson",
            position: "GKP",
            team: "LIV",
            now_cost: 15,
            clicked: ""
        },
        {
            name: "Ederson",
            position: "GKP",
            team: "MCI",
            now_cost: 10,
            clicked: ""
        },
        {
            name: "Alisson",
            position: "GKP",
            team: "LIV",
            now_cost: 15,
            clicked: ""
        },
        {
            name: "Ederson",
            position: "GKP",
            team: "MCI",
            now_cost: 10,
            clicked: ""
        },
        {
            name: "Alisson",
            position: "GKP",
            team: "LIV",
            now_cost: 15,
            clicked: ""
        },
        {
            name: "Ederson",
            position: "GKP",
            team: "MCI",
            now_cost: 10,
            clicked: ""
        },
        {
            name: "Alisson",
            position: "GKP",
            team: "LIV",
            now_cost: 15,
            clicked: ""
        },
        {
            name: "Ederson",
            position: "GKP",
            team: "MCI",
            now_cost: 10,
            clicked: ""
        },
        {
            name: "Alisson",
            position: "GKP",
            team: "LIV",
            now_cost: 15,
            clicked: ""
        },
        {
            name: "Ederson",
            position: "GKP",
            team: "MCI",
            now_cost: 10,
            clicked: ""
        },
    ]})
    const [player, setplayer] = useState([
        {
            name: "",
            team: "",
            now_cost: 0
        },
        {
            name: "",
            team: "",
            now_cost: 0
        },
        {
            name: "",
            team: "",
            now_cost: 0
        },
        {
            name: "",
            team: "",
            now_cost: 0
        },
        {
            name: "",
            team: "",
            now_cost: 0
        },
        {
            name: "",
            team: "",
            now_cost: 0
        },
        {
            name: "",
            team: "",
            now_cost: 0
        },
        {
            name: "",
            team: "",
            now_cost: 0
        },
        {
            name: "",
            team: "",
            now_cost: 0
        },
        {
            name: "",
            team: "",
            now_cost: 0
        },
        {
            name: "",
            team: "",
            now_cost: 0
        },
        {
            name: "",
            team: "",
            now_cost: 0
        },
        {
            name: "",
            team: "",
            now_cost: 0
        },
        {
            name: "",
            team: "",
            now_cost: 0
        },
        {
            name: "",
            team: "",
            now_cost: 0
        },
    ])
    const clubCode = {
        "": "No",
        "ARS": "Arsenal",
        "AVL": "Aston Villa",
        "BRE": "Brentford",
        "BOU": "Bournemouth",
        "BRI": "Brighton",
        "SOU": "Southampton",
        "CHE": "Chelsea",
        "FUL": "Fulham",
        "EVE": "Everton",
        "LEE": "Leeds",
        "LEI": "Leichester City",
        "LIV": "Liverpool",
        "MCI": "Manchester City",
        "MUN": "Manchester United",
        "NEW": "Newcastle",
        "TOT": "Tottenham Hotspur",
        "WHU": "Westham",
        "WOL": "Wolverhampton",
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
    useEffect(() => {
       loadUser();
       console.log(player);
    }, [id, player]);

    const loadUser = async () => {
        try {
            const users = (await axios.get("https://footycouch-production.up.railway.app/users/" + username)).data.data;
            await setId(users.id);
            const players = ([
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
                    p.clicked = "clicked";
                    return p;
                })
            );
            const forwardTransfer = (await axios.get("https://footycouch-production.up.railway.app/players/forward")).data;
            const updatedForwardTransfer = await Promise.all(
                forwardTransfer.map(async p => {
                    p.name = p.web_name;
                    p.teamId = p.team;
                    const teamResp = (await axios.get("https://footycouch-production.up.railway.app/teams/id/" + p.teamId)).data;
                    p.team = teamResp.short_name;
                    if (p.name === updatedPlayers[12].name || p.name === updatedPlayers[13].name || p.name === updatedPlayers[14].name) {
                        p.clicked = "clicked";
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
                        p.clicked = "clicked";
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
                        p.clicked = "clicked";
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
                        p.clicked = "clicked";
                    } else {
                        p.clicked = "";
                    }
                    return p;
                })
            );
            setplayer(updatedPlayers);
            setgk([...player.slice(0, 2)]);
            setdefender([...player.slice(2, 7)]);
            setmidfield([...player.slice(7, 12)]);
            setforward([...player.slice(12, 15)]);
            setTransfer({"Forward": updatedForwardTransfer, "Midfield": updatedMidfieldTransfer, "Defender": updatedDefenderTransfer, "Goalkeeper": updatedGoalkeeperTransfer})
        } catch (err) {
            console.log(err);
        }
    };
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
