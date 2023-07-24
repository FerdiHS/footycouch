import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

export default function UserFollow({Follow, type, id, followings}) {
    const [user, setuser] = useState({});
    const username = user.username;
    const profilePicture = user.profile_picture;
    const Fid = type ? Follow.follower_id : Follow.followed_id;
    const [followed, setfollowed] = useState(followings.filter(x => x.followed_id === Fid).length > 0);
    const follow = async () => {
        await axios.post("https://footycouch-production.up.railway.app//users/" + id + "/follow/" + Fid).then(x => setfollowed(true)).catch(err => console.log(err));
    }
    const unfollow = async () => {
        await axios.delete("https://footycouch-production.up.railway.app//users/" + id + "/follow/" + Fid).then(x => setfollowed(false)).catch(err => console.log(err));
    }
    const loadUser = async () => {
        axios.get("https://footycouch-production.up.railway.app/users/id/" + Fid).then(x => {setuser(x.data.results)})
    }
    const navigate = useNavigate();
    if (username === undefined) {
        loadUser();
        return (<div style={{position: "relative", left:"5%", top: 25}}><ReactLoading type="spin" color="#0000FF"
        height={60} width={30} /></div>)
    } else {
        return (
        <div style={{borderBottom: "1px solid rgb(222,222,222)", paddingBottom: 20}}>
            <strong class="unameComment" onClick={() => navigate('/user/' + username)}>{username}</strong>
            <div class="profilePicture4"> 
                <img src={profilePicture} onClick={() => navigate('/user/' + username)}/>
            </div>
            {id === Fid
                ? <></>
                : followed
                ? <button class = "Followed" onClick = {unfollow} style={{marginBottom: -40, top:-40, left: 400}}><h4>Unfollow</h4></button>
                : <button class = "Follow" onClick = {follow} style={{marginBottom: -40, top:-40, left: 400}}><h4>Follow</h4></button>
            }
        </div>)
    }
}
