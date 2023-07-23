import { useState } from "react";
import useToken from "./Token";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import axios from "axios";
import PostPopUp from "./PostPopUp";
export default function Post({postComponent, pp,setnewPost, newPost, id}) {
    const [data, setdata] = useState({});
    const like = data.like;
    const username = data.username;
    const profilePicture = data.profile_picture;
    const createdTime = new Date(postComponent.created_at);
    const addZero = x => x < 10 ? '0' + x : x;
    var date = addZero(createdTime.getDate())+' '+ createdTime.toLocaleString('en-US', { month: 'long' })+' '+createdTime.getFullYear();
    var clock = addZero(createdTime.getHours()) + ":" + addZero(createdTime.getMinutes()) + ":" + addZero(createdTime.getSeconds());
    var dateTime = date + " at "+ clock;
    const comment = data.comment;
    const Enter = str => {
        for (let i = 0; i < str.length - 1; i++) {
            if (str.charAt(i) === '\\' && str.charAt(i + 1) === 'n') {
                return (<>{str.slice(0, i)}<br/>{Enter(str.slice(i + 2))}</>)
            }
        }
        return str;
    }
    const isLiked = () => {
        for (let i = 0; i < like.length;i++) {
            if (like[i].user === id) {
                return i;
            }
        }
        return -1;
    }
    
    const handleLike = async () => {
        const check = isLiked();
        if (check !== -1) {
            axios.delete("https://footycouch-production.up.railway.app/users/" + id + "/like/" + postComponent.id).then(x => setdata({like: [...data.like.slice(0, check), ...data.like.slice(check + 1)], comment: data.comment, username: data.username, profile_picture: data.profile_picture})).catch(err => console.log(err));
        } else {
            axios.post("https://footycouch-production.up.railway.app/users/" + id + "/like/" + postComponent.id).then(x => setdata({like: [{user: id}, ...data.like], comment: data.comment, username: data.username, profile_picture: data.profile_picture}));
        }
    };
    const loadLike = () => {
        axios.get("https://footycouch-production.up.railway.app/users/id/" + postComponent.user).then(user => {
            (axios.get("https://footycouch-production.up.railway.app/like/" + postComponent.id)).then((like) => {
                axios.get("https://footycouch-production.up.railway.app/reply/" + postComponent.id).then(comment => {
                    console.log(comment);
                    setdata({like:like.data.results, comment: comment.data.results, username: user.data.results.username, profile_picture:user.data.results.profile_picture});
                    setnewPost();
                })
                
            }).catch(err => {console.log(err); setnewPost();})
        }).catch(err => console.log(err));
    };
    const [viewPost, setviewPost] = useState(false);
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
    const handleComment = async (content, setText) => {
        axios.post("https://footycouch-production.up.railway.app/reply/" + postComponent.id, {id: id, type: true, content: content.replace(/(?:\r\n|\r|\n)/g, '\\n')}).then(
            x => {
                setdata({username: data.username, profile_picture: data.profile_picture,like: data.like, comment: [...data.comment,{user: id, content: content.replace(/(?:\r\n|\r|\n)/g, '\\n')}]});
                setText("");
            }
        ).catch(err => console.log(err))
    }
    return (
        <>
        {
            viewPost
                ? <PostPopUp username={username} profilePicture={profilePicture} pp = {pp} postComponent={postComponent} id={id} exit={() => setviewPost(false) } handleLike={handleLike} like={like} comments={comment} handleComment={handleComment}/>
                : <></>
        }
        <div class="posts">
            <div class="profilePicture2"> 
                <img src={profilePicture} onClick={() => navigate("/user/" + username)}/>
            </div>
            <div class="unamePost" onClick={() => navigate("/user/" + username)}>{username}</div>
            <div class ="caption">{Enter(postComponent.content)}</div>
            <img src={postComponent.image} />
            <h5>{like.length} likes {' '} {comment.length} comments</h5>
            <div style={{display:"flex"}}>
                <div class={isLiked() !== -1? "likebutton liked" : "likebutton"} onClick={handleLike}></div>
                <div class="comment" onClick={() => setviewPost(true)}/>
            </div>
            <div class="time">{dateTime}</div>
        </div>
        </>
    );
}
