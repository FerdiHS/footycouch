import { useState } from "react";
export default function TeamManagement({login, nowPage, handlenowPage}) {
    const [now, setnow] = useState(-1);
    const [gk, setgk] = useState(
        {
            name: "David de Gea",
        }
    )
    const [defender, setdefender] = useState([
        {
            name: "A. Wan Bissaka"
        },
        {
            name: "H. Maguire"
        },
        {
            name: "R.Varane"
        },
        {
            name: "L. Shaw"
        }
    ])
    const [midfield, setmidfield] = useState([
        {
            name: "Casemiro"
        },
        {
            name: "C. Eriksen"
        },
        {
            name: "B. Fernandes"
        }
    ])
    const [forward, setforward] = useState([
        {
            name: "J. Sancho"
        },
        {
            name: "A. Martial"
        },
        {
            name: "M. Rashford"
        }
    ])
    const [bench, setbench] = useState([
        {
            name: "J. Butland",
            position: "GK"
        },
        {
            name: "V. Lindelof",
            position: "CB"
        },
        {
            name: "Fred",
            position: "MF"
        },
        {
            name: "W. Weghorst",
            position: "FW"
        }
    ])
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
                if (bench[now].position === "GK") {
                const temp = gk.name;
                setgk({
                    name: bench[now].name
                })
                setbench([
                    ...bench.slice(0, now),
                    {
                      name: temp,
                      position: "GK"
                    },
                    ...bench.slice(now + 1)
                  ]);
                }
            }
            if (a === 1) {
                if (bench[now].position === "CB") {
                    const temp = defender[b].name;
                    setdefender([
                        ...defender.slice(0, b),
                        {
                            name: bench[now].name
                        },
                        ...defender.slice(b + 1)
                    ])
                    setbench([
                        ...bench.slice(0, now),
                        {
                             name: temp,
                          position: "CB"
                        },
                        ...bench.slice(now + 1)
                      ]);
                }
            }
            if (a === 2) {
                if (bench[now].position === "MF") {
                    const temp = midfield[b].name;
                    setmidfield([
                        ...midfield.slice(0, b),
                        {
                            name: bench[now].name
                        },
                        ...midfield.slice(b + 1)
                    ])
                    setbench([
                        ...bench.slice(0, now),
                        {
                             name: temp,
                          position: "MF"
                        },
                        ...bench.slice(now + 1)
                      ]);
                }
            }
            if (a === 3) {
                if (bench[now].position === "FW") {
                    const temp = forward[b].name;
                    setforward([
                        ...forward.slice(0, b),
                        {
                            name: bench[now].name
                        },
                        ...forward.slice(b + 1)
                    ])
                    setbench([
                        ...bench.slice(0, now),
                        {
                             name: temp,
                          position: "FW"
                        },
                        ...bench.slice(now + 1)
                      ]);
                }
            }
        }
        setnow(-1);
    }
    return (
        <container>
        <div class="spacing2"></div>
        <h2>Pick Team</h2>
            <div class="field">
                <div class="fieldcon">
                <div class="line">
                    <div class="trans"></div>
                    {   gk.name === ""
                            ? ( <label>
                                .
                                <button class ="button4"></button>
                                No Player
                                </label>
                                )
                            : (<label>.
                                <button class ="button3" onClick={handleChangePlayer(0,0)}></button>{gk.name}</label>)           
                    }
                    <div class="trans"></div>
                </div>
                <div class="spacing3"></div>
                <div class="line">
                    <div class="trans"></div>
                    {   defender.map((player, i) => {
                        return player.name === ""
                            ? ( <label key = {i}>
                                <button class ="button4"></button>
                                No Player
                                </label>
                                )
                            : (<label>
                                <button class ="button3" onClick={handleChangePlayer(1,i)}></button>
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
                                <button class ="button4"></button>
                                No Player
                                </label>
                                )
                            : (<label>
                                <button class ="button3" onClick={handleChangePlayer(2,i)}></button>
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
                                <button class ="button4"></button>
                                No Player
                                </label>
                                )
                            : (<label>
                                <button class ="button3" onClick={handleChangePlayer(3,i)}></button>
                                {player.name}
                                </label>)   
                    })          
                    }
                    <div class="trans"></div>
                </div>
                <div class="bench">
                    <h2>Bench</h2>
                <div class="line">
                    <div class="trans"></div>
                    {   bench.map((player, i) => {
                        return player.name === ""
                            ? ( <label key = {i}>
                             <button class ="button4"></button>
                                No Player
                                </label>
                                )
                            : (<label>{player.position}
                                <button class ={i === now ? "buttonClick" : "button3"} onClick ={handleSub(i)}></button>
                                {player.name}
                                </label>)   
                    })          
                    }
                    <div class="trans"></div>
                </div>
                </div>
            </div>
            </div>
        </container>
    );
}