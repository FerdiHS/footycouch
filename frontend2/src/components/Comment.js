import './Comment.css';
import axios from 'axios';
import avatar from '../assets/Avatar2.png';
import { API_URI } from '../constants';
import { useEffect, useState } from 'react';

export default function Comment({ comment }) {
    const [profilePic, setProfilePic] = useState(avatar);
    const [username, setUsername] = useState("");

    useEffect(() => {
        axios.get(`${API_URI}/users/id/${comment.user}`)
            .then(res => {
                setProfilePic(res.data.results.profile_picture || avatar);
                setUsername(res.data.results.username);
            })
            .catch(err => {
                console.log(err);
            });
    }, [comment.user]);

    const formatTime = (time) => {
        const now = new Date();
        const postDate = new Date(time);
        const diff = (now - postDate) / 1000; // difference in seconds
        if (diff < 180) {
            return 'just now';
        } else if (diff < 3600) {
            const minutes = Math.floor(diff / 60);
            return `${minutes}m ago`;
        } else if (diff < 86400) {
            const hours = Math.floor(diff / 3600);
            return `${hours}h ago`;
        } else if (diff < 604800) {
            const days = Math.floor(diff / 86400);
            return `${days}d ago`;
        } else if (diff < 31536000) {
            const weeks = Math.floor(diff / 604800);
            return `${weeks}w ago`;
        } else {
            const years = Math.floor(diff / 31536000);
            return `${years}y ago`;
        }
    };

    return (
        <div className="comment">
            <img src={profilePic || avatar} alt="Commenter" className="comment-avatar" />
            <div className="comment-wrapper">
                <div className="comment-content">
                    <div className="comment-header">
                        <span className="comment-username">{username}</span>
                    </div>
                    <p className="comment-text">{comment.content}</p>
                </div>
                <span className="comment-time">{formatTime(comment.created_at)}</span>
            </div>
        </div>
    );
}
