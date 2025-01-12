import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/Avatar2.png";
import Post from "./Post";
import Statistic from "./Statistic";
import Follow from "./Follow";
import useToken from "./Token";

export default function User({passData}) {
    const navigate = useNavigate();
    const favteams = passData.favteams;
    const[morePost, setmorePost] = useState(10);
    const [backgroundPicture, setBackgroundPicture] = useState(passData.backgroundPicture === undefined ? logo : passData.backgroundPicture);
    const [profilePicture, setProfilePicture] = useState(passData.ProfilePicture);
    const username = passData.username;
    const id = passData.id;
    const [bio, setbio] = useState(passData.bio);
    const [followers, setfollowers] = useState(passData.Followers);
    const [followings, setfollowing] = useState(passData.Followings);
    const [points, setPoints] = useState(passData.points);
    const highestPoints = 0;
    const [rank, setrank] = useState(passData.ranking);
    const highestRank = 1;
    const [posts, setPosts] = useState(passData.Posts.slice(0, morePost));
    const [player, setplayer] = useState(passData.players);
    const users = JSON.parse(localStorage.getItem('id'));
    const [followed, setfollowed] = useState(followers.filter(x => x.follower_id === users).length > 0);
    const [pressFollow, setpressFollow] = useState(null);
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
    const follow = async () => {
        setfollowed(true);
        await axios.post("https://footycouch-production.up.railway.app//users/" + users + "/follow/" + id).then(x => setfollowers([...followers, {followed_id: id, follower_id: users}])).catch(err => console.log(err));
    }
    const unfollow = async () => {
        setfollowed(false);
        await axios.delete("https://footycouch-production.up.railway.app//users/" + users + "/follow/" + id).then(x => setfollowers(followers.filter(x => x.follower_id != users))).catch(err => console.log(err));
    }
    const [stats, setstats] = useState(null);
    const [followingsUser, setfollowingsUser] = useState(null);
    const [pp, setpp] = useState(undefined);
    const loadpp = async () => {
        axios.get("https://footycouch-production.up.railway.app/users/id/" + users).then(x => {setpp(x.data.results.profile_picture)});
    } 
    if(pp === undefined) {
        loadpp();
    }
    return (
        
    <div class="container4">
        {
            stats === null
                ? <></>
                : <Statistic player={stats} exitStats={() => setstats(null)} style = {{left: 250}}/> 
        }
        {
            pressFollow === null
                ? <></>
                : <Follow FollowComponent={pressFollow} exitFollow={() => setpressFollow(null)} type={pressFollow === followers} id={users}/>
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
                <div class="name2">
                    <h1>{username}</h1>
                    <p style={bio === "" || bio === null ? {marginBottom:20} : {marginBottom: -20}}>{bio}</p>
                    {followed
                        ? <button class = "Followed" onClick = {unfollow}><h4>Unfollow</h4></button>
                        : <button class = "Follow" onClick = {follow}><h4>Follow</h4></button>
                    }
                </div>
                <div class="followers2">
                    <h3>{passData.Posts.length}</h3>
                    <h4>Posts</h4>
                </div>
                <div class="followers2">
                    <h3 onClick={() => setpressFollow(followers)} style={{cursor:"pointer", height: "fit-content"}}>{followers.length}</h3>
                    <h4 onClick={() => setpressFollow(followers)} style={{cursor:"pointer", height: "fit-content"}}>Followers</h4>
                </div>
                <div class="followers2">
                    <h3 onClick={() => setpressFollow(followings)} style={{cursor:"pointer", height: "fit-content"}}>{followings.length}</h3>
                    <h4 onClick={() => setpressFollow(followings)} style={{cursor:"pointer", height: "fit-content"}}>Following</h4>
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
                <div class = "post">
                    {
                        posts.length > 0 
                        ? posts.map((post, index) => {
                            return (<Post username={username} pp={pp} postComponent={post} newPost={false} setnewPost={() => {}} id={users}/>)
                        })
                        : <h2>{username} hasn't made any posts yet</h2>
                    }
                    {   morePost < passData.Posts.length
                    ? <button class="loadMore" onClick = {() => {setmorePost(morePost + 5); setPosts(passData.Posts.slice(0, morePost))}}>Load More Post</button>
                    : <></>
                    }
                </div>
            </div>
        </div>
    </div>);
}
