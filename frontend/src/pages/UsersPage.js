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
    var Posts = data.Posts;
    var userNotFound = data.userNotFound;
    const username = window.location.pathname.slice(6);
    if (username === useToken().token) {
        navigate("/profile");
    }
    const loadUser = async () => {
        try {
            const users = (await axios.get("https://footycouch-production.up.railway.app/users/" + username)).data.data;
            id = users.id;
            bio = users.bio;
            formation = users.formation;
            points = users.points;
            ProfilePicture = users.profile_picture;
            backgroundPicture = users.background_picture;
            players = ([
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
            const allPlayer = (await axios.get("https://footycouch-production.up.railway.app/players")).data.players;
            const teams = (await axios.get("https://footycouch-production.up.railway.app/teams")).data.teams;
            const updatedPlayers = await Promise.all(
                players.map(async p => {
                    if (p.id === null) {
                        p.name = "No Player";
                        p.team = "";
                        return p;
                    }
                    const playerResp = allPlayer.filter(player => player.id === p.id)[0];
                    p.name = playerResp.web_name;
                    p.teamId = playerResp.team;
                    const teamResp = teams.filter(team => team.id === p.teamId)[0];
                    p.team = teamResp.short_name;
                    return p;
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
                    console.log(post);
                    return post;
                })
            );
            Posts = updatedPosts.reverse();
            setdata({id: id, players: players, formation: formation, bio: bio, points: points, Followings: Followings, Followers: Followers, ProfilePicture: ProfilePicture, backgroundPicture: backgroundPicture, Posts: Posts, username: username})
        } catch (err) {
            setdata({userNotFound: true})
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
