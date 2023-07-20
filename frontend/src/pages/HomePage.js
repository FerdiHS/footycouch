import HeaderWebAfterLog from "../components/HeaderWebAfterLog.js"
import Home from "../components/Home.js";
import axios from "axios";
import { useState } from "react";
import useToken from "../components/Token.js";
import Loading from "../components/Loading.js";
export default function HomePage({setToken}) {
    const [data, setdata] = useState({});
    const username = useToken().token;
    var id = data.id;
    var Posts = data.Posts;
    var ProfilePicture = data.ProfilePicture;
    var allPlayer = data.allPlayer;
    var allUser = data.allUser;
    const loadUser = async () => {
        try {
            const users = (await axios.get("https://footycouch-production.up.railway.app/users/" + username)).data.data;
            id = users.id;
            ProfilePicture = users.profile_picture;
            const postsResp = (await axios.get("https://footycouch-production.up.railway.app//users/id/" + id + "/post")).data.results;
            const updatedPosts = await Promise.all(
                postsResp.map(post => {
                    post.like = [];
                    post.text = post.content;
                    post.time = "";
                    post.image = post.image;
                    return post;
                })
            );
            Posts = updatedPosts;
            const teams = (await axios.get("https://footycouch-production.up.railway.app/teams")).data.teams;
            const allPlayer = (await axios.get("https://footycouch-production.up.railway.app/players")).data.players;
            const allUser = (await axios.get("https://footycouch-production.up.railway.app/users")).data.data;
            const updatedPlayer = await Promise.all(
                allPlayer.map(async p => {
                    p.name = p.web_name;
                    p.teamId = p.team;
                    const teamResp = teams.filter(team => team.id === p.teamId)[0];
                    p.team = teamResp.short_name;
                    p.teamName = teamResp.name;
                    p.teamCode = teamResp.code;
                    p.position = "FWD";
                    return p;
                })
            );
        
            setdata({id, Posts, ProfilePicture, allPlayer, allUser});
        } catch (err) {
            console.log(err);
        }
    };
    if (id === undefined) {
        loadUser();
        return <><HeaderWebAfterLog setToken={setToken}/><Loading /></>;
    } else {
        return (
                <div class = "App">
                    <HeaderWebAfterLog setToken={setToken}/>
                    <Home passPosts={Posts} passProfilePicture={ProfilePicture} passId = {id} passPlayer={allPlayer} passUser={allUser}/>
                </div>
            );
    }
}
