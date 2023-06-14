import { useState } from "react";
import close from "../Images/close.png";
export default function TextInputPost({profilePicture, username}) {
    function autosize(){
        var el = this;
        setTimeout(function(){
          el.style.cssText = 'height:auto; padding:0';
          // for box-sizing other than "content-box" use:
          // el.style.cssText = '-moz-box-sizing:content-box';
          el.style.cssText = 'height:' + el.scrollHeight + 'px';
        },0);
      }
    const [textarea, settextarea] = useState(document.querySelector('textarea'));
    const [text, setText] = useState("");
    const [postImage, setpostImage] = useState([]);
    const [posts, setposts] = useState([]);
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
          setpostImage([...postImage, reader.result]);
        }
        if (file != null) {
            reader.readAsDataURL(file);
        }
    }
    const handleRemoveImage = index => () => {
        setpostImage([...postImage.splice(0, index), ...postImage.splice(index + 1)]);
    }
    return (
        <>
            <div class="inputPost">
                <div class="profilePicture2"> 
                    <img src={profilePicture} />
                </div>
                <textarea class="inputText" value={text} rows="1" onChange={PostText} type="text" placeholder={"What's on your mind, " + username + "?"}></textarea> 
                <button class="enter"></button>
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
        </>
    );
}

             
