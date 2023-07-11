import { useState } from "react";
import logo from "../assets/MUN Logo.png";
import { useNavigate } from "react-router-dom";
import useToken from "./Token";
import axios from "axios";
export default function TeamManagement({passPlayer, passFormation, passPoint}) {
    const navigate = useNavigate();
    const [formation, setformation] = useState(passFormation);
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
    const [allformation, setallformation] = useState([
        "4-4-2",
        "4-3-3",
        "4-5-1",
        "3-5-2",
        "3-4-3",
        "5-4-1",
        "5-3-3"
    ]);
    const [now, setnow] = useState(-1);
    const [points, setpoints] = useState(passPoint);
    const [player, setplayer] = useState(passPlayer);
    const [gk, setgk] = useState(player[0]);
    const [defender, setdefender] = useState([...player.slice(2,2 + parseInt(formation.charAt(0)))]);
    const [midfield, setmidfield] = useState([...player.slice(7,7 + parseInt(formation.charAt(2)))]);
    const [forward, setforward] = useState([...player.slice(12, 12 + parseInt(formation.charAt(4)))]);
    const [bench, setbench] = useState([player[1], ...player.slice(2 + parseInt(formation.charAt(0)), 7),
                                    ...player.slice(7 + parseInt(formation.charAt(2)), 12), 
                                    ...player.slice(12 + parseInt(formation.charAt(4)), 17)]);
    const handleSub = (a) => () => {
        if (a === now) {
            setnow(-1);
        } else {
            setnow(a);
        }
    };
    const handleChangePlayer = (a, b) => () => {
        if (now !== -1) {
            if (a === 0) {
                if (bench[now].position === "GKP") {
                    const temp = gk;
                    setgk(bench[now]);
                    setplayer([bench[now], temp, ...player.slice(2)]);
                    setbench([
                        ...bench.slice(0, now),
                        temp,
                        ...bench.slice(now + 1)
                    ]);
                } else {
                    window.alert("You cannot assign " + bench[now].position + " to " + "GKP");
                }
            }
            if (a === 1) {
                if (bench[now].position === "DEF") {
                    const temp = defender[b];
                    setdefender([
                        ...defender.slice(0, b),
                        bench[now],
                        ...defender.slice(b + 1)
                    ])
                    setplayer([
                        ...player.slice(0, 2 + b),
                        bench[now],
                        ...player.slice(2 + b + 1, 2 + now + parseInt(formation.charAt(0)) - 1),
                        temp,
                        ...player.slice(2 + now + parseInt(formation.charAt(0)))
                    ])
                    setbench([
                        ...bench.slice(0, now),
                        temp,
                        ...bench.slice(now + 1)
                    ]);
                } else {
                    window.alert("You cannot assign " + bench[now].position + " to " + "DEF");
                }
            }
            if (a === 2) {
                if (bench[now].position === "MID") {
                    const temp = midfield[b];
                    setmidfield([
                        ...midfield.slice(0, b),
                        bench[now],
                        ...midfield.slice(b + 1)
                    ])
                    setplayer([
                        ...player.slice(0, 7 + b),
                        bench[now],
                        ...player.slice(7 + b + 1, 7 + now - (1 + 5 - parseInt(formation.charAt(0))) + parseInt(formation.charAt(2))),
                        temp,
                        ...player.slice(7 + now - (5 - parseInt(formation.charAt(0))) + parseInt(formation.charAt(2)))
                    ])
                    setbench([
                        ...bench.slice(0, now),
                        temp,
                        ...bench.slice(now + 1)
                    ]);
                } else {
                    window.alert("You cannot assign " + bench[now].position + " to " + "MID");
                }
            }
            if (a === 3) {
                if (bench[now].position === "FWD") {
                    const temp = forward[b];
                    setforward([
                        ...forward.slice(0, b),
                        bench[now],
                        ...forward.slice(b + 1)
                    ])
                    setplayer([
                        ...player.slice(0, 12 + b),
                        bench[now],
                        ...player.slice(12 + b + 1, 12 + now - (1 + parseInt(formation.charAt(4))) + parseInt(formation.charAt(4))),
                        temp,
                        ...player.slice(12 + now)
                    ])
                    setbench([
                        ...bench.slice(0, now),
                        temp,
                        ...bench.slice(now + 1)
                    ]);
                } else {
                    window.alert("You cannot assign " + bench[now].position + " to " + "FWD");
                }
            }
        }
        setnow(-1);
    }
    const handleFormChange = (event) => {
        const value = event.target.value;
        if (value !== formation) {
            setformation(value);
            const formation = value;
            setgk(player[0]);
            setdefender([...player.slice(2,2 + parseInt(formation.charAt(0)))]);
            setmidfield([...player.slice(7,7 + parseInt(formation.charAt(2)))]);
            setforward([...player.slice(12, 12 + parseInt(formation.charAt(4)))]);
            setbench([player[1], ...player.slice(2 + parseInt(formation.charAt(0)), 7),
                        ...player.slice(7 + parseInt(formation.charAt(2)), 12), 
                        ...player.slice(12 + parseInt(formation.charAt(4)), 17)]);
        }
    }
    const handleSave = () => {
        let playerId = [];
        for (let i = 0; i < 15; i++) {
            playerId[i] = player[i].id;
        }
        axios.post("https://footycouch-production.up.railway.app/teams/add/" + username, {formation,
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
    return (
        <div class ="container2">
            <div>
            <div class="spacing2"></div>
            <h2>Pick Team</h2>
            <div class="field">
                <div class="fieldcon">
                    <div class="line">
                        <div class="trans"></div>
                        <label class="playerTeam">
                            <img src={require("../assets/Jersey/"+ clubCode[gk.team] +" GK Jersey.png")} onClick={handleChangePlayer(0,0)}/>
                            {gk.name}
                        </label>
                        <div class="trans"></div>
                    </div>
                    <div class="spacing6"></div>
                    <div class="line">
                        <div class="trans"></div>
                        {   defender.map((player, i) => {
                            return  <label class="playerTeam">
                                        <img src={require("../assets/Jersey/"+ clubCode[player.team] +" Jersey.png")} onClick={handleChangePlayer(1,i)}/>
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
                                        <img src={require("../assets/Jersey/"+ clubCode[player.team] +" Jersey.png")} onClick={handleChangePlayer(2,i)}/>
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
                                    <img src={require("../assets/Jersey/"+ clubCode[player.team] +" Jersey.png")} onClick={handleChangePlayer(3,i)}/>
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
                                return player.position === "GKP"
                                    ?   (<label class="playerTeam">
                                            {player.position}
                                            <img class={now === i ? "clicked" : ""} src={require("../assets/Jersey/"+ clubCode[player.team] +" GK Jersey.png")} onClick={handleSub(i)}/>
                                            {player.name}
                                        </label>)
                                    :   (<label class="playerTeam">
                                            {player.position}
                                            <img class={now === i ? "clicked" : ""} src={require("../assets/Jersey/"+ clubCode[player.team] +" Jersey.png")} onClick={handleSub(i)}/>
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
                <label>Formation
                    <div class="spacing"></div>
                    <div class="select">
                        <select onChange={handleFormChange}>
                            (<option value={formation}>{formation}</option>)
                            {   allformation.map((form, i) => {
                                    return formation === form
                                         ? <></>
                                         : (<option value={form}>{form}</option>)
                                })
                            }
                        </select>
                    </div>
                </label>
                <div class="spacing4"></div>
                <div class= "point">
                    <h1>{points}</h1>
                    <>Points</>
                </div>
                <div class="spacing4"></div>
                <div class="point2">
                    Your Team
                    <img src={logo} alt=""/>
                    <p>Change Team</p>
                </div>
                <div class="spacing4"></div>
                <button class="button3" onClick={() => navigate("/transfer")}>Transfer</button>
                <div class="spacing4"></div>
                <button class="button3" onClick={handleSave}>Save</button>
            </div>
        </div>
    );
}
