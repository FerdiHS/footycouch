import { useState } from "react";
import useToken from "./Token";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import axios from "axios";
import Loading from "./Loading";
import Comment from "./Comment";
export default function PostPopUp({username, profilePicture, pp, postComponent, id, exit, handleLike, like, comments, handleComment}) {
    const [text, setText] = useState("");
    const [textarea, settextarea] = useState(document.querySelector('.inputText2'));
    function autosize(){
        var el = this;
        setTimeout(function(){
          el.style.cssText = 'height:auto; padding:0';
          el.style.cssText = 'height:' + el.scrollHeight + 'px';
        },0);
    }
    const PostText = e => {
        setText(e.target.value);
        if(textarea == null) {
            settextarea(document.querySelector('.inputText2'));
            return;
        }
        textarea.addEventListener('keydown', autosize);   
    }
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
        for (let i = 0; i < like.length;i++) {
            if (like[i].user === id) {
                return i;
            }
        }
        return -1;
    }
    const navigate = useNavigate();
    return (
        <div class="statistic">
            <div class="post3">
                <button class="exitStats" onClick={exit}>X</button>
                <div class="profilePicture3"> 
                    <img src={profilePicture} onClick={() => navigate("/user/" + username)}/>
                </div>
                <div class="unamePost2" onClick={() => navigate("/user/" + username)}>{username}</div>
                <div class ="caption">{Enter(postComponent.content)}</div>
                <img src={postComponent.image} />
                <h5>{like.length} likes </h5>
                <div class={isLiked() !== -1? "likebutton liked" : "likebutton"} onClick={handleLike}></div>
                <div class="time">{dateTime}</div>
                <div class="replies">
                    <div class="profilePicture2"> 
                        <img src={pp} />
                    </div>
                    <textarea class="inputText2" value={text} rows="1" onChange={PostText} type="text" placeholder={"Add a Comment...."}></textarea>
                    <button class="enter" style={{left:690, top:-15}} onClick={() => handleComment(text, setText)}></button>
                    <h4 style={{marginBottom: 0, marginLeft:15}}>{comments.length} Comments</h4>
                    {
                        comments.map(x => {
                            return <Comment comment={x} />
                        })
                    }
                </div>
            </div>
        </div>
    );
}
