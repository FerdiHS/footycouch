import { useState } from "react";
import useToken from "./Token";

export default function Post({username, profilePicture, postComponent}) {
    const [liked, setLiked] = useState(postComponent.like);
    const uid = useToken().token;
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
            setLiked([...liked, uid])
        }
    };
    return (
        <div class="posts">
            <div class="profilePicture2"> 
                <img src={profilePicture} />
            </div>
            <div class="unamePost">{username}</div>
            <div class ="caption">{postComponent.text}</div>
            <img src={postComponent.image} />
            <h5>{postComponent.like.length} likes </h5>
            <div class={isLiked() !== -1? "likebutton liked" : "likebutton"} onClick={handleLike}></div>
            <div class="time">{postComponent.time}</div>
        </div>
    );
}