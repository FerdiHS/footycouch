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
    const [gk, setGk] = useState(player[0]);
    const [defender, setDefender] = useState([]);
    const [midfield, setMidfield] = useState([]);
    const [forward, setForward] = useState([]);
    const [bench, setBench] = useState([]);
    const [posts, setPosts] = useState([]);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        if(counter < 5) {
            setCounter(counter + 1);
            loadUser();
        }
        console.log(posts);
        console.log("counter: " + counter);
    }, [id, player, posts]);

    const loadUser = async () => {
        try {
            const users = (await axios.get("https://footycouch-production.up.railway.app/users/" + username)).data.data;
            await setId(users.id);
            setBio(users.bio);
            await setFormation(users.formation);
            setPoints(users.points);
            const players = ([
                {
                    position: "gk_1",
                    id: users.gk_1,
                },
                {
                    position: "gk_2",
                    id: users.gk_2
                },
                {
                    position: "def_1",
                    id: users.def_1
                },
                {
                    position: "def_2",
                    id: users.def_2
                },
                {
                    position: "def_3",
                    id: users.def_3
                },
                {
                    position: "def_4",
                    id: users.def_4
                },
                {
                    position: "def_5",
                    id: users.def_5
                },
                {
                    position: "mid_1",
                    id: users.mid_1
                },
                {
                    position: "mid_2",
                    id: users.mid_2
                },
                {
                    position: "mid_3",
                    id: users.mid_3
                },
                {
                    position: "mid_4",
                    id: users.mid_4
                },
                {
                    position: "mid_5",
                    id: users.mid_5
                },
                {
                    position: "fow_1",
                    id: users.fow_1
                },
                {
                    position: "fow_2",
                    id: users.fow_2
                },
                {
                    position: "fow_3",
                    id: users.fow_3
                },
            ]);
            const updatedPlayers = await Promise.all(
                players.map(async p => {
                    if (p.id === null) {
                        p.name = "";
                        p.team = "";
                        return p;
                    }
                    const playerResp = (await axios.get("https://footycouch-production.up.railway.app/players/id/" + p.id)).data;
                    p.name = playerResp.web_name;
                    p.teamId = playerResp.team;
                    const teamResp = (await axios.get("https://footycouch-production.up.railway.app/teams/id/" + p.teamId)).data;
                    p.team = teamResp.short_name;
                    return p;
                })
            );
            setPlayer(updatedPlayers);
            setGk(player[0]);
            setDefender([...player.slice(2,2 + parseInt(formation.charAt(0)))]);
            setMidfield([...player.slice(7,7 + parseInt(formation.charAt(2)))]);
            setForward([...player.slice(12, 12 + parseInt(formation.charAt(4)))]);
            setBench([player[1], ...player.slice(2 + parseInt(formation.charAt(0)), 7),
                                            ...player.slice(7 + parseInt(formation.charAt(2)), 12), 
                                            ...player.slice(12 + parseInt(formation.charAt(4)), 17)]);

            const image =  await axios.get("https://footycouch-production.up.railway.app/users/" + username + "/image")

            setFollowings((await axios.get("https://footycouch-production.up.railway.app/users/following/" + id)).data.data);

            setFollowers((await axios.get("https://footycouch-production.up.railway.app/users/follower/" + id)).data.data);

            const imageResp = await axios.get("https://footycouch-production.up.railway.app/users/" + username + "/image");
            if(imageResp.status !== 500) {
                const imageBuffer = Buffer.from(imageResp.data.image, 'base64');
                setProfilePicture(imageBuffer);
            }
            const postsResp = (await axios.get("https://footycouch-production.up.railway.app//users/id/" + id + "/post")).data.results;
            const updatedPosts = await Promise.all(
                postsResp.map(post => {
                    post.like = [];
                    post.text = post.content;
                    post.time = post.created_at;
                    post.image = null;
                    return {postComponent: post};
                })
            );
            await setPosts(updatedPosts);
        } catch (err) {
            console.log(err);
        }
    };
    const clubCode = {
        "": "No",
        "ARS": "Arsenal",
        "AVL": "Aston Villa",
        "BRE": "Brentford",
        "BOU": "Bournemouth",
        "BHA": "Brighton",
        "CRY": "Crystal Palace",
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
    };
    
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
                    <h3>{posts.length}</h3>
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
                    <TextInputPost profilePicture={profilePicture} username={username} posts={posts}/>
                </div>
            </div>
        </div>
    </div>);
}
