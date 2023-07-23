import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import test from "../assets/field.png";
import logo from "../assets/Avatar2.png";
import TextInputPost from "./TextInputPost";
import useToken from "./Token";
import Statistic from "./Statistic";
import Loading from "./Loading";
import Follow from "./Follow";

export default function Profile({passData}) {
    const [backgroundPicture, setBackgroundPicture] = useState(passData.backgroundPicture === undefined ? test : passData.backgroundPicture);
    const [profilePicture, setProfilePicture] = useState(passData.ProfilePicture);
    const username = useToken().token;
    const id = passData.id;
    const favteams = passData.favteams;
    const [bio, setbio] = useState(passData.bio);
    const [followers, setfollowers] = useState(passData.Followers);
    const [followings, setfollowing] = useState(passData.Followings);
    const [points, setPoints] = useState(passData.points);
    const highestPoints = 0;
    const [rank, setrank] = useState(passData.ranking);
    const highestRank = 1;
    const [posts, setPosts] = useState(passData.Posts);
    const [player, setplayer] = useState(passData.players);
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
    const [formation, setformation] = useState(passData.formation);
    const [gk, setgk] = useState(player[0]);
    const [defender, setdefender] = useState([...player.slice(2,2 + parseInt(formation.charAt(0)))]);
    const [midfield, setmidfield] = useState([...player.slice(7,7 + parseInt(formation.charAt(2)))]);
    const [forward, setforward] = useState([...player.slice(12, 12 + parseInt(formation.charAt(4)))]);
    const [bench, setbench] = useState([player[1], ...player.slice(2 + parseInt(formation.charAt(0)), 7),
                                    ...player.slice(7 + parseInt(formation.charAt(2)), 12), 
                                    ...player.slice(12 + parseInt(formation.charAt(4)), 17)]);
    const [changeBio, setchangeBio] = useState(false);
    const [bioInput, setbioInput] = useState(bio);
    const bioChange = e => {
        setbioInput(e.target.value);
    }
    const bioSave = () => {
        setisLoading(true);
        setbio(bioInput);
        setchangeBio(false);
        axios.post("https://footycouch-production.up.railway.app/users/update/" + username, {bio: bioInput}).then(x => {setbio(bioInput);
        setchangeBio(false);setisLoading(false)})
        .catch(err => console.log(err));
    }
    const ppUpload = e => {
        setisLoading(true);
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        if (file === null) {
            return;
        }
        reader.onloadend = () => {
            axios.post("https://footycouch-production.up.railway.app/users/" + username + "/image", {image: reader.result}).then(x => setisLoading(false)).catch(err => setisLoading(false));
            setProfilePicture(reader.result);
        };
        reader.readAsDataURL(file);
    }
    const bpUpload = e => {
        setisLoading(true);
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        if (file === null) {
            return;
        }
        reader.onloadend = () => {
          axios.post("https://footycouch-production.up.railway.app/users/" + username + "/background", {image: reader.result}).then(x => {setisLoading(false);reader.readAsDataURL(file);}).catch(err => setisLoading(false));
          setBackgroundPicture(reader.result);
        }
        
        
    }
    const [stats, setstats] = useState(null);
    const [isLoading, setisLoading] = useState(false);
    const [pressFollow, setpressFollow] = useState(null);
    return (
    <div class="container4">
        {
            isLoading
                ? <Loading />
                : <></>
        }
        {
            stats === null
                ? <></>
                : <Statistic player={stats} exitStats={() => setstats(null)} style = {{left: 250}}/> 
        }
        {
            pressFollow === null
                ? <></>
                : <Follow FollowComponent={pressFollow} exitFollow={() => setpressFollow(null)} type={pressFollow === followers} id={id}/>
        }
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
                    { changeBio
                        ? <><input type="text" value={bioInput} onChange={bioChange}/><button onClick={bioSave}>Save</button></>
                        : <p>{bio}</p>
                    }
                    <button class = "editProfile" onClick = {() => setchangeBio(true)}><h4>Edit profile</h4></button>
                </div>
                <div class="followers">
                    <h3>{posts.length}</h3>
                    <h4>Posts</h4>
                </div>
                <div class="followers">
                    <h3 onClick={() => setpressFollow(followers)}>{followers.length}</h3>
                    <h4 onClick={() => setpressFollow(followers)}>Followers</h4>
                </div>
                <div class="followers">
                    <h3 onClick={() => setpressFollow(followings)}>{followings.length}</h3>
                    <h4 onClick={() => setpressFollow(followings)}>Following</h4>
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
                        <h3>Current Rank</h3>
                        <h4>#{rank}</h4>
                        <div class="myteam">
                            <h3>{username}'s Team</h3>
                            <img src={favteams === 0 ? logo : "https://resources.premierleague.com/premierleague/badges/t" + favteams + ".png"}></img>
                        </div>
                    </div>
                    <div class="lineup">
                        <h2>Line-up</h2>
                        <div class="field2">
                            <div class="fieldcon"> 
                                <div class="line">
                                    <div class="trans2"></div>
                                    <label class ="playername">
                                    <img src={"https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_"+ gk.team_code+ "_1-220.webp"} onClick={() => {if(gk.name !== "No Player") {setstats(gk)}}}/>
                                    {gk.name}</label>
                                    <div class="trans2"></div>
                                </div>
                                <div class="line">
                                    <div class="trans2"></div>
                                    {   defender.map((player, i) => {
                                        return (<label class="playername">
                                            <img src={"https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_"+ player.team_code+ "-220.webp"} onClick={() => {if(player.name !== "No Player") {setstats(player)}}}/>
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
                                        <img src={"https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_"+ player.team_code+ "-220.webp"} onClick={() => {if(player.name !== "No Player") {setstats(player)}}}/>
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
                                        <img src={"https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_"+ player.team_code+ "-220.webp"} onClick={() => {if(player.name !== "No Player") {setstats(player)}}}/>
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
                    <TextInputPost profilePicture={profilePicture} username={username} id={id} posts={posts}/>
                </div>
            </div>
        </div>
        
    </div>);
}
