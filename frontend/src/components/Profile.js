import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import test from "../assets/Avatar2.png";
import Avatar2 from "../assets/field.png";
import logo from "../Images/MUN Logo.png";
export default function Profile() {
    const [backgroundPicture, setbackgroundPicture] = useState(test);
    const [profilePicture, setprofilePicture] = useState(Avatar2);
    const [username, setusername] = useState("San Tokyo");
    const [bio, setbio] = useState("SIUUUUUUU");
    const [posts, setposts] = useState([]);
    const [followers, setfollowers] = useState([]);
    const [following, setfollowing] = useState([]);
    const [points, setPoints] = useState(0);
    const highestPoints = 0;
    const [rank, setrank] = useState(1);
    const highestRank = 1;
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
    ]);
    const clubCode = {
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
    const [formation, setformation] = useState("4-3-3");
    const [gk, setgk] = useState(player[0]);
    const [defender, setdefender] = useState([...player.slice(2,2 + parseInt(formation.charAt(0)))]);
    const [midfield, setmidfield] = useState([...player.slice(7,7 + parseInt(formation.charAt(2)))]);
    const [forward, setforward] = useState([...player.slice(12, 12 + parseInt(formation.charAt(4)))]);
    const [bench, setbench] = useState([player[1], ...player.slice(2 + parseInt(formation.charAt(0)), 7),
                                    ...player.slice(7 + parseInt(formation.charAt(2)), 12), 
                                    ...player.slice(12 + parseInt(formation.charAt(4)), 17)]);
    
    const ppUpload = e => {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        if (file === null) {
            return;
        }
        reader.onloadend = () => {
          setprofilePicture(reader.result);
        }
        reader.readAsDataURL(file);
    }
    const bpUpload = e => {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        if (file === null) {
            return;
        }
        reader.onloadend = () => {
          setbackgroundPicture(reader.result);
        }
        reader.readAsDataURL(file);
    }
    return (
    <div class="container4">
            <div class="backgroundProfileBlur">
                <img src={backgroundPicture} />
            </div>
        <div class = "profile">
            <div class="backgroundProfile">
                <img src={backgroundPicture} />
            </div>
            <div class = "status">
                <div class="profilePicture"> 
                    <img src={profilePicture}></img>
                </div>
                <input type= "file" class = "camerabutton" onChange={ppUpload}/>
                <div class="name">
                    <h1>{username}</h1>
                    <p>{bio}</p>
                    <button class = "editProfile"><h4>Edit profile</h4></button>
                </div>
                <div class="followers">
                    <h3>0</h3>
                    <h4>Posts</h4>
                </div>
                <div class="followers">
                    <h3>0</h3>
                    <h4>Followers</h4>
                </div>
                <div class="followers">
                    <h3>0</h3>
                    <h4>Following</h4>
                </div>
                <div class="wrapback">
                    <div class="editbackground"><h4>Edit cover photo</h4></div>
                    <input type="file" onChange={bpUpload}/>
                </div>
            </div>
        </div>
        <div class="container5">
            <div class = "bodycon">
                <div class="team">
                    <div class="stats">
                        <h2>Statistic</h2>
                        <h3>Current Points</h3>
                        <h4>{points}</h4>
                        <h3>Highest Points</h3>
                        <h4>{highestPoints}</h4>
                        <h3>Current Rank</h3>
                        <h4>#{rank}</h4>
                        <h3>Highest Rank</h3>
                        <h4>#{highestRank}</h4>
                        <div class="myteam">
                            <h3>{username}'s Team</h3>
                            <img src={logo}></img>
                        </div>
                    </div>
                    <div class="lineup">
                        <h2>Line-up</h2>
                        <div class="field2">
                            <div class="fieldcon"> 
                                <div class="line">
                                    <div class="trans2"></div>
                                    <label class ="playername">
                                    <img src= {require("../assets/Jersey/"+ clubCode[gk.team] +" GK Jersey.png")} />
                                    {gk.name}</label>
                                    <div class="trans2"></div>
                                </div>
                                <div class="line">
                                    <div class="trans2"></div>
                                    {   defender.map((player, i) => {
                                        return (<label class="playername">
                                            <img src={require("../assets/Jersey/"+ clubCode[player.team] +" Jersey.png")} />
                                            {player.name}
                                        </label>) 
                                    })          
                                    }
                                    <div class="trans2"></div>
                                </div>
                                <div class="line">
                                    <div class="trans2"></div>
                                    {   midfield.map((player, i) => {
                                        return (<label class="playername">
                                        <img src={require("../assets/Jersey/"+ clubCode[player.team] +" Jersey.png")} />
                                        {player.name}
                                    </label>) 
                                    })          
                                    }
                                    <div class="trans2"></div>
                                </div>
                                <div class="line">
                                    <div class="trans2"></div>
                                    {   forward.map((player, i) => {
                                        return (<label class="playername">
                                        <img src={require("../assets/Jersey/"+ clubCode[player.team] +" Jersey.png")} />
                                        {player.name}
                                    </label>) 
                                    })          
                                    }
                                    <div class="trans2"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}
