import { useState } from "react";
import close from "../assets/close.png";
import Post from "./Post";
export default function TextInputPost({profilePicture, username, posts}) {
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
        if(postImage.length === 0 && text === "") {
            return;
        }
        var today = new Date();
        const addZero = x => x < 10 ? '0' + x : x;
        var date = addZero(today.getDate())+' '+ today.toLocaleString('en-US', { month: 'long' })+' '+today.getFullYear();
        var clock = addZero(today.getHours()) + ":" + addZero(today.getMinutes()) + ":" + addZero(today.getSeconds());
        var dateTime = date + " at "+ clock;
        const postComponent = {
            text: text.replace(/(?:\r\n|\r|\n)/g, '\\n'),
            image: postImage,
            like: [],
            time: dateTime
        }
        setpost([postComponent, ...post]);
        setText("");
        setpostImage([]);
        settextarea(document.querySelector('textarea'));
        textarea.addEventListener('keydown', autosize); 
    }
    return (
        <>
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
                post.map((post, index) => {
                    return (<Post username={username} profilePicture={profilePicture} postComponent={post}/>)
                })
            }
        </>
    );
}

             

             
