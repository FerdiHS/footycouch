import { useState } from "react";
import logo from "../assets/MUN Logo.png";
export default function TeamManagement({login, nowPage, handlenowPage}) {
    const [formation, setformation] = useState("4-3-3");
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
    const [score, setscore] = useState(0);
    const [player, setplayer] = useState([
        {
            name: "D. de Gea",
            position: "GK",
            team: "MUN"
        },
        {
            name: "J. Butland",
            position: "GK",
            team: "MUN"
        },
        {
            name: "A. Wan Bissaka",
            position: "CB",
            team: "MUN"
        },
        {
            name: "H. Maguire",
            position: "CB",
            team: "MUN"
        },
        {
            name: "R.Varane",
            position: "CB",
            team: "MUN"
        },
        {
            name: "L. Shaw",
            position: "CB",
            team: "MUN"
        },
        {
            name: "V. Lindelof",
            position: "CB",
            team: "MUN"
        },
        {
            name: "Casemiro",
            position: "MF",
            team: "MUN"
        },
        {
            name: "C. Eriksen",
            position: "MF",
            team: "MUN"
        },
        {
            name: "B. Fernandes",
            position: "MF",
            team: "MUN"
        },
        {
            name: "Fred",
            position: "MF",
            team: "MUN"
        },
        {
            name: "K. De Bruyne",
            position: "MF",
            team: "MCI"
        },
        {
            name: "J. Sancho",
            position: "FW",
            team: "MUN"
        },
        {
            name: "A. Martial",
            position: "FW",
            team: "MUN"
        },
        {
            name: "M. Rashford",
            position: "FW",
            team: "MUN"
        },
    ])
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
        if (now != -1) {
            if (a === 0) {
                if (bench[now].position === "GK") {
                    const temp = gk;
                    setgk(bench[now])
                    if (temp.name !== "") {
                        setbench([
                            ...bench.slice(0, now),
                            temp,
                            ...bench.slice(now + 1)
                        ]);
                    } else {
                        setbench([
                            ...bench.slice(0, now),
                            ...bench.slice(now + 1)
                        ]);
                    }
                } else {
                    window.alert("You cannot assign " + bench[now].position + " to " + "GK");
                }
            }
            if (a === 1) {
                if (bench[now].position === "CB") {
                    const temp = defender[b];
                    setdefender([
                        ...defender.slice(0, b),
                        bench[now],
                        ...defender.slice(b + 1)
                    ])
                    if (temp.name !== "") {
                        setbench([
                            ...bench.slice(0, now),
                            temp,
                            ...bench.slice(now + 1)
                        ]);
                    } else {
                        setbench([
                            ...bench.slice(0, now),
                            ...bench.slice(now + 1)
                        ]);
                    }
                } else {
                    window.alert("You cannot assign " + bench[now].position + " to " + "CB");
                }
            }
            if (a === 2) {
                if (bench[now].position === "MF") {
                    const temp = midfield[b];
                    setmidfield([
                        ...midfield.slice(0, b),
                        bench[now],
                        ...midfield.slice(b + 1)
                    ])
                    if (temp.name !== "") {
                        setbench([
                            ...bench.slice(0, now),
                            temp,
                            ...bench.slice(now + 1)
                        ]);
                    } else {
                        setbench([
                            ...bench.slice(0, now),
                            ...bench.slice(now + 1)
                        ]);
                    }
                } else {
                    window.alert("You cannot assign " + bench[now].position + " to " + "MF");
                }
            }
            if (a === 3) {
                if (bench[now].position === "FW") {
                    const temp = forward[b];
                    setforward([
                        ...forward.slice(0, b),
                        bench[now],
                        ...forward.slice(b + 1)
                    ])
                    if (temp.name !== "") {
                        setbench([
                            ...bench.slice(0, now),
                            temp,
                            ...bench.slice(now + 1)
                        ]);
                    } else {
                        setbench([
                            ...bench.slice(0, now),
                            ...bench.slice(now + 1)
                        ]);
                    }
                } else {
                    window.alert("You cannot assign " + bench[now].position + " to " + "FW");
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
    return (
        <div class ="container2">
            <div>
            <div class="spacing2"></div>
            <h2>Pick Team</h2>
            <div class="field">
                <div class="fieldcon">
                    <div class="line">
                        <div class="trans"></div>
                        {   gk.name === ""
                                ? ( <label>
                                    <button class = "Player" onClick={handleChangePlayer(0,0)}></button>
                                    No Player
                                    </label>
                                    )
                                : (<label>
                                    <button class = {gk.team + "GK"} onClick={handleChangePlayer(0,0)}></button>{gk.name}</label>)           
                        }
                        <div class="trans"></div>
                    </div>
                    <div class="spacing3"></div>
                    <div class="line">
                        <div class="trans"></div>
                        {   defender.map((player, i) => {
                            return player.name === ""
                                ? ( <label key = {i}>
                                    <button class ="Player" onClick={handleChangePlayer(1,i)}></button>
                                    No Player
                                    </label>
                                    )
                                : (<label>
                                    <button class = {player.team + "Player"} onClick={handleChangePlayer(1,i)}></button>
                                    {player.name}
                                    </label>)   
                        })          
                        }
                        <div class="trans"></div>
                    </div>
                    <div class="spacing3"></div>
                    <div class="line">
                        <div class="trans"></div>
                        {   midfield.map((player, i) => {
                            return player.name === ""
                                ? ( <label key = {i}>
                                    <button class ="Player" onClick={handleChangePlayer(2,i)}></button>
                                    No Player
                                    </label>
                                    )
                                : (<label>
                                    <button class = {player.team + "Player"} onClick={handleChangePlayer(2,i)}></button>
                                    {player.name}
                                    </label>)   
                        })          
                        }
                        <div class="trans"></div>
                    </div>
                    <div class="spacing3"></div>
                    <div class="line">
                        <div class="trans"></div>
                        {   forward.map((player, i) => {
                        return player.name === ""
                                ? ( <label key = {i}>
                                    <button class ="Player" onClick={handleChangePlayer(3,i)}></button>
                                    No Player
                                    </label>
                                    )
                                : (<label>
                                    <button class = {player.team + "Player"} onClick={handleChangePlayer(3,i)}></button>
                                    {player.name}
                                    </label>)   
                        })          
                        }
                        <div class="trans"></div>
                    </div>
                    <div class="spacing6"></div>
                    <div class="bench">
                        <h5>Bench</h5>
                        <div class="line2">
                            {   bench.map((player, i) => {
                                return (player.position === "GK"
                                    ? (<label>{player.position}
                                        <button class ={i === now ? (player.team + "GKBenchClick") : (player.team + "GKBench")} onClick ={handleSub(i)}></button>
                                        {player.name}
                                        </label>)
                                    : (<label>{player.position}
                                        <button class ={i === now ? (player.team + "BenchClick") : (player.team + "Bench")} onClick ={handleSub(i)}></button>
                                        {player.name}
                                        </label>))   
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
                    <h1>{score}</h1>
                    <>Points</>
                </div>
                <div class="spacing4"></div>
                <div class="point2">
                    Your Team
                    <img src={logo}/>
                    <p>Change Team</p>
                </div>
                <div class="spacing4"></div>
                <button class="button3">Transfer</button>
                <div class="spacing4"></div>
                <button class="button3">Save</button>
            </div>
        </div>
    );
}
