import HeaderWebAfterLog from "../components/HeaderWebAfterLog.js"
import Profile from "../components/Profile.js";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useToken from "../components/Token";
import User from "../components/User.js";
import Loading from "../components/Loading.js";
export default function UsersPage({setToken}) {
    const navigate = useNavigate();
    const [data, setdata] = useState({});
    var id = data.id;
    var players = data.players
    var formation = data.formation;
    var bio = data.bio;
    var points = data.points;
    var Followings = data.Followings;
    var Followers = data.Followers;
    var ProfilePicture = data.ProfilePicture;
    var backgroundPicture = data.backgroundPicture;
    var ranking = data.ranking;
    var Posts = data.Posts;
    var userNotFound = data.userNotFound;
    var favteams = data.favteams;
    const username = window.location.pathname.slice(6);
    if (username === useToken().token) {
        navigate("/profile");
    }
    const loadUser = async () => {
        try {
            const users = (await axios.get("https://footycouch-production.up.railway.app/users/" + username).catch(err => setdata({userNotFound: true}))).data.data;
            id = users.id;
            bio = users.bio;
            formation = users.formation;
            points = users.points;
            favteams = users.fav_team;
            ranking = users.ranking;
            ProfilePicture = users.profile_picture;
            backgroundPicture = users.background_picture;
            players = ([
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
            const teams = (await axios.get("https://footycouch-production.up.railway.app/teams")).data.teams;
            const updatedPlayers = await Promise.all(
                players.map(async p => {
                    if (p.id === null) {
                        p.name = "No Player";
                        p.team = "";
                        p.team_code = 0;
                        return p;
                    }
                    const playerResp = (await axios.get("https://footycouch-production.up.railway.app/players/id/" + p.id)).data;
                    playerResp.name = playerResp.web_name;
                    playerResp.teamId = playerResp.team;
                    const teamResp = teams.filter(team => team.id === playerResp.teamId)[0];
                    playerResp.team = teamResp.short_name;
                    playerResp.teamName = teamResp.name;
                    playerResp.position = p.position;
                    return playerResp;
                })
            );
            players = updatedPlayers;
            Followings = (await axios.get("https://footycouch-production.up.railway.app/users/following/" + id)).data.data;
            Followers = (await axios.get("https://footycouch-production.up.railway.app/users/follower/" + id)).data.data;
            const postsResp = (await axios.get("https://footycouch-production.up.railway.app/users/id/" + id + "/post")).data.results;
            const updatedPosts = await Promise.all(
                postsResp.map(post => {
                    post.like = [];
                    post.text = post.content;
                    post.time = "";
                    post.image = post.image;
                    return post;
                })
            );
            Posts = updatedPosts.reverse();
            setdata({id: id, players: players, formation: formation, bio: bio, points: points, ranking: ranking, Followings: Followings, Followers: Followers, ProfilePicture: ProfilePicture, backgroundPicture: backgroundPicture, Posts: Posts, username: username, favteams: favteams})
        } catch (err) {
            console.log(err);
        }
    };
    if (userNotFound) {
        return  <div class = "App">
                    <HeaderWebAfterLog setToken={setToken} />
                    <h2>User Not Found</h2>
                </div>
    } else if (players === undefined) {
        loadUser();
        return <><HeaderWebAfterLog setToken={setToken}/><Loading /></>;
    } else {
        return (
                <div class = "App">
                    <HeaderWebAfterLog setToken={setToken}/>
                    <User passData={data} />
                </div>
            );
    }
}
