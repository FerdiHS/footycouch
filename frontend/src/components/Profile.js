import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import axios from "axios";
import useToken from "./Token.js";
import test from "../assets/Avatar2.png";
import Avatar2 from "../assets/field.png";
import logo from "../assets/MUN Logo.png";
import TextInputPost from "./TextInputPost";
export default function Profile() {
    const username = useToken().token;
    const [id, setId] = useState(0);
    const [bio, setBio] = useState("SIUUUU");
    const [formation, setFormation] = useState("4-3-3");
    const [points, setPoints] = useState(0);
    const [followings, setFollowings] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [backgroundPicture, setBackgroundPicture] = useState(test);
    const [profilePicture, setProfilePicture] = useState(Avatar2);

    useEffect(() => {
       loadUser();
    }, [id]);

    const loadUser = async () => {
        try {
            const users = (await axios.get("https://footycouch-production.up.railway.app/users/" + username)).data.data;
            setId(users.id);
            setBio(users.bio);
            setFormation(users.formation);
            setPoints(users.points);
            console.log("formation: " + formation);

            const image =  await axios.get("https://footycouch-production.up.railway.app/users/" + username + "/image")

            setFollowings((await axios.get("https://footycouch-production.up.railway.app/users/following/" + id)).data.data);
            console.log("following: " + followings.length);

            setFollowers((await axios.get("https://footycouch-production.up.railway.app/users/follower/" + id)).data.data);
            console.log("follower: " + followers.length);

            const imageResp = await axios.get("https://footycouch-production.up.railway.app/users/" + username + "/image");
            if(imageResp.status !== 500) {
                const imageBuffer = Buffer.from(imageResp.data.image, 'base64');
                setProfilePicture(imageBuffer);
            }
        } catch (err) {
            console.log(err);
        }
        /*
        await axios.get("https://footycouch-production.up.railway.app/users/" + username)
        .then(res => {
            // console.log(res.data.data);
            setId(res.data.data.id);
            setBio(res.data.data.bio);
            setFormation(res.data.data.formation);
            setPoints(res.data.data.points);

            return axios.get("https://footycouch-production.up.railway.app/users/following/" + id);
        })
        .then(res => {
            setFollowings(res.data.data);
            console.log("followings: " + followings.length);
            return axios.get("https://footycouch-production.up.railway.app/users/follower/" + id);
        })
        .then(res => {
            setFollowers(res.data.data);
            console.log("followers: " + followers.length);
        })
        .catch(err => {
            console.log(err);
        });
        */
        /*
        await axios.get("https://footycouch-production.up.railway.app/users/" + username + "/image")
        .then(res => {
            if (res.status !== 500) {
                // Create a buffer from the base64 image string
                const imageBuffer = Buffer.from(res.image, 'base64');
                setProfilePicture(image buffer);
            }
        })
        .catch(err => {
            console.log(err);
        })
        */
    };

    const highestPoints = 0;
    const [rank, setRank] = useState(1);
    const highestRank = 1;
    const [player, setPlayer] = useState([
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
        "": "",
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
    const [gk, setGk] = useState(player[0]);
    const [defender, setDefender] = useState([...player.slice(2,2 + parseInt(formation.charAt(0)))]);
    const [midfield, setMidfield] = useState([...player.slice(7,7 + parseInt(formation.charAt(2)))]);
    const [forward, setForward] = useState([...player.slice(12, 12 + parseInt(formation.charAt(4)))]);
    const [bench, setBench] = useState([player[1], ...player.slice(2 + parseInt(formation.charAt(0)), 7),
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
          setProfilePicture(reader.result);
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
          setBackgroundPicture(reader.result);
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
                <label htmlFor="upload-profilepicture" class="camerabutton" />
                <input type= "file" id="upload-profilepicture" onChange={ppUpload}/>
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
                    <h3>{followers.length}</h3>
                    <h4>Followers</h4>
                </div>
                <div class="followers">
                    <h3>{followings.length}</h3>
                    <h4>Following</h4>
                </div>
                <div class="wrapback">
                    <label htmlFor="upload-backgroundPicture" class = "editbackground"><h4>Edit Cover Photo</h4></label>
                    <input type= "file" id="upload-backgroundPicture" onChange={bpUpload}/>
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
                <div class="post">
                    <TextInputPost profilePicture={profilePicture} username={username} posts={[]}/>
                </div>
            </div>
        </div>
    </div>);
}
