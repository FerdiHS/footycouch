import React, { useEffect, useState } from 'react';
import './TextInputPost.css';
import avatar from '../assets/Avatar2.png'; 
import uploadImage from '../assets/image.png'; 
import { getProfilePicture, getUserId } from '../redux/user/userAction';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { API_URI } from '../constants';
import { setMessage } from '../redux/messages/messageAction';

const TextInputPost = ({setUpdate}) => {
    const profilePic = useSelector(getProfilePicture);
    const id = useSelector(getUserId);
    const dispatch = useDispatch();
    const [text, setText] = useState("");
    const [photo, setPhoto] = useState(null);

    const handleInputText = event => {
        setText(event.target.value);
    }

    const autosize = () => {
        var el = document.querySelector(".inputText");
        setTimeout(() => {
            console.log((el.scrollHeight === 55 ? 10 : el.scrollHeight))
            el.style.cssText = 'height:auto; padding:0';
            el.style.cssText = 'height:' + el.scrollHeight + 'px';
        },0);
    }

    const removePhoto = () => {
        setPhoto(null);
    }

    const handlePhotoUpload = event => {
        event.preventDefault();
        const reader = new FileReader();
        const file = event.target.files[0];
        if (file) {
            reader.onloadend = () => {
                setPhoto(reader.result);
            }
            reader.readAsDataURL(file);
        }
    }

    const handlePost = () => {
        console.log("Button clicked");
        axios.post(API_URI + "/users/id/" + id + "/post", {
            content: text,
            image: photo
        })
        .then(res => {
            setText("");
            setPhoto(null);
            setUpdate(true);
            dispatch(setMessage("Post Successfully Created"))
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        const textArea = document.querySelector(".inputText")
        console.log(textArea);
        textArea.addEventListener('keydown', autosize);   
    }, [])

    return (
        <div className="post-container">
            <div className="input-wrapper">
                <div className="text-wrapper">
                    <img src={profilePic === undefined ? avatar : profilePic} alt="Profile" className="profile-pic" />
                    <textarea 
                        className="inputText" 
                        placeholder="What's on your mind?" 
                        value={text} 
                        onChange={handleInputText}
                    />
                </div>
                {photo && 
                <div className="uploaded-photo-container">
                    <button className="close-button" onClick={removePhoto}>✖</button>
                    <img src={photo} alt="Uploaded" className="uploaded-photo" />
                </div>}
            </div>
            <div className="button-container">
                <label htmlFor="photoUpload" className="photo-upload-button">
                    <img src={uploadImage} alt="Add Photo" className="upload-icon" />
                    Add Images
                </label>
                <input 
                    type="file" 
                    id="photoUpload" 
                    accept="image/*" 
                    onChange={handlePhotoUpload} 
                    style={{ display: 'none' }}
                />
                <button className="post-button" onClick={handlePost}>Post</button>
            </div>
        </div>
    );
};

export default TextInputPost;