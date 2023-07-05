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
            Posts = updatedPosts.reverse();
            setdata({id, Posts, ProfilePicture});
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
                    <Home passPosts={Posts} passProfilePicture={ProfilePicture} passId = {id}/>
                </div>
            );
    }
}
