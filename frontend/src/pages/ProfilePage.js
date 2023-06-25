import HeaderWebAfterLog from "../components/HeaderWebAfterLog.js"
import Profile from "../components/Profile.js";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useToken from "../components/Token";
export default function ProfilePage({setToken}) {
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
    var Posts = data.Posts;
    const username = useToken().token;
    const loadUser = async () => {
        try {
            const users = (await axios.get("https://footycouch-production.up.railway.app/users/" + username)).data.data;
            id = users.id;
            bio = users.bio;
            formation = users.formation;
            points = users.points;
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
            const updatedPlayers = await Promise.all(
                players.map(async p => {
                    if (p.id === null) {
                        p.name = "No Player";
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
            players = updatedPlayers;
            Followings = (await axios.get("https://footycouch-production.up.railway.app/users/following/" + id)).data.data;
            Followers = (await axios.get("https://footycouch-production.up.railway.app/users/follower/" + id)).data.data;
            try {
                const imageResp = await axios.get("https://footycouch-production.up.railway.app/users/" + username + "/image");
                if(imageResp.status !== 500) {
                    
                    ProfilePicture = `data:image/jpeg;base64,${imageResp.data.image}`;
                } else {
                    ProfilePicture = null;
                }
            } catch (err) {
                ProfilePicture = null;
            }
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
            setdata({id: id, players: players, formation: formation, bio: bio, points: points, Followings: Followings, Followers: Followers, ProfilePicture: ProfilePicture, Posts: Posts})
        } catch (err) {
            console.log(err);
        }
    };
    if (players === undefined) {
        loadUser();
        return <><HeaderWebAfterLog /></>;
    } else {
        return (
                <div class = "App">
                    <HeaderWebAfterLog setToken={setToken}/>
                    <Profile passData={data}/>
                </div>
            );
    }
}
