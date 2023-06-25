import HeaderWebAfterLog from "../components/HeaderWebAfterLog.js"
import Home from "../components/Home.js";
import axios from "axios";
import { useState } from "react";
import useToken from "../components/Token.js";
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
            try {
                const imageResp = await axios.get("https://footycouch-production.up.railway.app/users/" + username + "/image");
                if(imageResp.status !== 500) {
                    ProfilePicture = `data:image/jpeg;base64,${imageResp.data.image}`;
                }
            } catch (err) {
                ProfilePicture = null;
            }
            const postsResp = (await axios.get("https://footycouch-production.up.railway.app//users/id/" + id + "/post")).data.results;
            const updatedPosts = await Promise.all(
                postsResp.map(post => {
                    post.like = [];
                    post.text = post.content;
                    post.time = "";
                    post.image = postsResp.image;
                    return post;
                })
            );
            Posts = updatedPosts;
            setdata({id: id, Posts: Posts, ProfilePicture: ProfilePicture});
        } catch (err) {
            console.log(err);
        }
    };
    if (id === undefined) {
        loadUser();
        return <><HeaderWebAfterLog setToken={setToken}/></>;
    } else {
        return (
                <div class = "App">
                    <HeaderWebAfterLog setToken={setToken}/>
                    <Home passPosts={Posts} passProfilePicture={ProfilePicture}/>
                </div>
            );
    }
}
