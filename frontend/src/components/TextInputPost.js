import { useState } from "react";
import axios from "axios";
import close from "../assets/close.png";
import Post from "./Post";
import Loading from "./Loading";
export default function TextInputPost({profilePicture, username, id, posts}) {
    const [isLoading, setisLoading] = useState(false);
    const [newPost, setnewPost] = useState(false);
    function autosize(){
        var el = this;
        setTimeout(function(){
          el.style.cssText = 'height:auto; padding:0';
          el.style.cssText = 'height:' + el.scrollHeight + 'px';
        },0);
    }
    const [textarea, settextarea] = useState(document.querySelector('textarea'));
    const [post, setpost] = useState(posts);
    const [text, setText] = useState("");
    const [postImage, setpostImage] = useState([]);
    const PostText = e => {
        setText(e.target.value);
        if(textarea == null) {
            settextarea(document.querySelector('textarea'));
            return;
        }
        textarea.addEventListener('keydown', autosize);   
    }
    const handleInputImages = e => {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        if (file === null) {
            return;
        }
        reader.onloadend = () => {
          setpostImage([reader.result]);
        }
        if (file != null) {
            reader.readAsDataURL(file);
        }
    }
    const handleRemoveImage = index => () => {
        setpostImage([...postImage.splice(0, index), ...postImage.splice(index + 1)]);
    }
    const handleSubmit = () => {
        setisLoading(true);
        if(postImage.length === 0 && text === "") {
            return;
        }
        var today = new Date();
        const postComponent = {
            content: text.replace(/(?:\r\n|\r|\n)/g, '\\n'),
            image: postImage,
            like: [],
            created_at: today.toISOString()
        }
        axios.post("https://footycouch-production.up.railway.app/users/id/" + id + "/post", {
            content: postComponent.content,
            image: postComponent.image.length === 0 ? undefined : postComponent.image[0]
        })
        .then(res => {
            setText("");
            setpostImage([]);
            settextarea(document.querySelector('textarea'));
            textarea.addEventListener('keydown', autosize); 
            const postsResp = (axios.get("https://footycouch-production.up.railway.app/users/id/" + id + "/post")).then(
            postdata => {
                console.log(postdata.data.results)
                const latestPost = postdata.data.results[postdata.data.results.length - 1];
                setpost([latestPost, ...post]);
                setnewPost(true);
                setisLoading(false);
            }
        );
        })
        .catch(err => {
            console.log(err);
            setisLoading(false);
            window.alert("Cannot post with a high quality image, please try with a lower quality image")
        })
    }
    return (
        <>
            {
                isLoading
                    ? <Loading />
                    : <></>
            }
            <div class="inputPost">
                <div class="profilePicture2"> 
                    <img src={profilePicture} />
                </div>
                <textarea class="inputText" value={text} rows="1" onChange={PostText} type="text" placeholder={"What's on your mind, " + username + "?"}></textarea> 
                <button class="enter" onClick={handleSubmit}></button>
                <div class="imgContainer">
                    {
                        postImage.map((image, index) => {
                            return (<><div class="remove"><img src={close} onClick={handleRemoveImage(index)}></img></div><img src = {image}></img></>)
                        })
                    }
                </div>
                <div class = "topInput"></div>
                <div class="imgContainer">
                    <label class="imgUpload" htmlFor="uploadImages">Images</label>
                    <input type="file" id="uploadImages" onChange={handleInputImages}/>  
                    <div class="borderbutton" />
                    <div class="schedulePost" htmlFor="matchSchedule">Events</div> 
                </div>
            </div>
            {
                (post).map((postComp, index) => {
                    if(index === post.length - 1 && newPost) {
                        console.log()
                        return (<Post username={username} profilePicture={profilePicture} postComponent={postComp} newPost={true} setnewPost={() => setnewPost(false)}/>)
                    }
                    return (<Post username={username} profilePicture={profilePicture} postComponent={postComp} newPost={newPost} setnewPost={() => {}}/>)
                })
            }
        </>
    );
}

             
