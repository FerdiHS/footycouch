import HeaderWebAfterLog from "../components/HeaderWebAfterLog.js"
import Profile from "../components/Profile.js";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useToken from "../components/Token";
import Loading from "../components/Loading.js";
export default function ProfilePage({setToken}) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
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
    const username = useToken().token;
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
                    position: "FWd",
                    id: users.fow_3
                },
            ]);
            const allPlayer = (await axios.get("https://footycouch-production.up.railway.app/players")).data.players;
            const shortTeamById = []
            shortTeamById[0] = "";
            const teamResp = (await axios.get("https://footycouch-production.up.railway.app/teams")).data.teams;
            teamResp.forEach(x => {
                shortTeamById[x.id] = x;
            });
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
                    playerResp.teamName = shortTeamById[playerResp.team].name;
                    playerResp.team = shortTeamById[playerResp.team].short_name;
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
            setdata({id: id, players: players, formation: formation, bio: bio, points: points, Followings: Followings, Followers: Followers, ProfilePicture: ProfilePicture, backgroundPicture: backgroundPicture, Posts: Posts})
        } catch (err) {
            console.log(err);
        }
    };
    if (players === undefined) {
        loadUser();
        return <><HeaderWebAfterLog setToken={setToken}/><Loading /></>;
    } else {
        return (
                <div class = "App">
                    <HeaderWebAfterLog setToken={setToken}/>
                    <Profile passData={data}/>
                </div>
            );
    }
}
