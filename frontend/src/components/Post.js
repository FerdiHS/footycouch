import { useState } from "react";
import useToken from "./Token";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import axios from "axios";
export default function Post({username, profilePicture, postComponent, setnewPost, newPost}) {
    const [data, setdata] = useState({});
    const like = data.like;
    const [liked, setLiked] = useState([]);
    const uid = useToken().token;
    const createdTime = new Date(postComponent.created_at);
    const addZero = x => x < 10 ? '0' + x : x;
    var date = addZero(createdTime.getDate())+' '+ createdTime.toLocaleString('en-US', { month: 'long' })+' '+createdTime.getFullYear();
    var clock = addZero(createdTime.getHours()) + ":" + addZero(createdTime.getMinutes()) + ":" + addZero(createdTime.getSeconds());
    var dateTime = date + " at "+ clock;
    const Enter = str => {
        for (let i = 0; i < str.length - 1; i++) {
            if (str.charAt(i) === '\\' && str.charAt(i + 1) === 'n') {
                return (<>{str.slice(0, i)}<br/>{Enter(str.slice(i + 2))}</>)
            }
        }
        return str;
    }
    const isLiked = () => {
        for (let i = 0; i < liked.length;i++) {
            if (liked[i] === uid) {
                return i;
            }
        }
        return -1;
    }
    const handleLike = () => {
        const check = isLiked();
        if (check !== -1) {
            setLiked([...liked.slice(0, check), ...liked.slice(check + 1)])
        } else {
            setLiked([uid, ...liked])
        }
    };
    const loadLike = () => {
        console.log(postComponent.id);
        (axios.get("https://footycouch-production.up.railway.app/like/" + postComponent.id)).then((like) => {
            setdata({like:like.data.results});
            setnewPost();
            console.log(data.like);
        }).catch(err => {console.log(err); setnewPost();});
    };
    const navigate = useNavigate();
    if (postComponent.content === null || postComponent.content === undefined) {
        return <></>
    } else if (like === undefined) {
        loadLike();
        return (<div style={{position: "relative", left:"50%"}}><ReactLoading type="spin" color="#0000FF"
        height={100} width={50} /></div>);
    } else if (newPost) {
        loadLike();
    }
    return (
        <div class="posts">
            <div class="profilePicture2"> 
                <img src={profilePicture} onClick={() => navigate("/user/" + username)}/>
            </div>
            <div class="unamePost" onClick={() => navigate("/user/" + username)}>{username}</div>
            <div class ="caption">{Enter(postComponent.content)}</div>
            <img src={postComponent.image} />
            <h5>{like.length} likes </h5>
            <div class={isLiked() !== -1? "likebutton liked" : "likebutton"} onClick={handleLike}></div>
            <div class="time">{dateTime}</div>
        </div>
    );
}
