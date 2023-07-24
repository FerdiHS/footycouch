import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

export default function Comment({comment}) {
    const [user, setuser] = useState({});
    const username = user.username;
    const profilePicture = user.profile_picture;
    const loadUser = () => {
        axios.get("https://footycouch-production.up.railway.app/users/id/" + comment.user).then(x => {setuser(x.data.results)})
    }
    const navigate = useNavigate();
    const Enter = str => {
        for (let i = 0; i < str.length - 1; i++) {
            if (str.charAt(i) === '\\' && str.charAt(i + 1) === 'n') {
                return (<>{str.slice(0, i)}<br/>{Enter(str.slice(i + 2))}</>)
            } 
        }
        return str;
    }
    if (username === undefined) {
        loadUser();
        return (<div style={{position: "relative", top: 30, left:"10%"}}><ReactLoading type="spin" color="#0000FF"
        height={30} width={15} /></div>)
    } else {
        return (
        <div style={{}}>
            <strong class="unameComment" onClick={() => navigate('/user/' + username)}>{username}</strong>
            <div class="profilePicture4"> 
                <img src={profilePicture} onClick={() => navigate('/user/' + username)}/>
            </div>
            <div class="comments">{Enter(comment.content)}</div>
        </div>)
    }
}
