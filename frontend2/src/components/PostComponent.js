import React, { useEffect, useState } from 'react';
import './PostComponent.css';
import avatar from '../assets/Avatar2.png'; // Import your avatar image here
import { useDispatch, useSelector } from 'react-redux';
import { getPlayers } from '../redux/players/playerAction';
import MUN from '../assets/MUN Logo.png'
import { setMessage } from '../redux/messages/messageAction';
import axios from 'axios';
import { API_URI, WEB_URI } from '../constants';
import { getUserId } from '../redux/user/userAction';
import { getShares, share } from '../redux/shares/sharesAction';
import Modal from './Modal';
import Post from './Post';

const PostComponent = ({ postComponent, isNeedModal }) => {
    const dispatch = useDispatch();
    const id = useSelector(getUserId);
    const time = new Date(postComponent.created_at);
    const [name, setName] = useState("");
    const [profilePic, setProfilePic] = useState(avatar);
    const [postImage, setPostImage] = useState(postComponent.image);
    const [text, setText] = useState(postComponent.content);
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(postComponent.likes_count);
    const [comments, setComments] = useState(postComponent.comments_count); // Example count
    const [shares, setShares] = useState(postComponent.shares_count); // Example count
    const [showHeart, setShowHeart] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const last_updated = useSelector(getShares)[postComponent.id];

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleDoubleClick = () => {
        if (!isLiked) {
            handleLikeClick();
        } else {
            setShowHeart(true);
            setTimeout(() => {
                setShowHeart(false);
            }, 500);
        }
    };

    const handleLikeClick = () => {
        if (id === null) {
            return;
        }
        if (isLiked) {
            axios.delete(API_URI + "/users/" + id + "/like/" + postComponent.id)
            .then(x => {
                setLikes(likes -1);
                setIsLiked(!isLiked);
            });
        } else {
            axios.post(API_URI + "/users/" + id + "/like/" + postComponent.id)
            .then(x => {
                setLikes(likes + 1);
                setShowHeart(true);
                setTimeout(() => {
                    setShowHeart(false);
                }, 500);
                setIsLiked(!isLiked);
            });
        }
    };

    const formatNumber = (num) => {
        console.log(postComponent);
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        } else {
            return num.toString();
        }
    };

    const handleShareClick = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(WEB_URI + "/post/" + postComponent.id).then(() => {
                dispatch(setMessage("Link has been copied to the clipboard"))
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
            const diff = new Date() - new Date(last_updated);
            if (last_updated === null || last_updated === undefined || diff > 3600000) {
                dispatch(share(postComponent.id));
                axios.patch(API_URI + "/posts/" + postComponent.id + "/shares").then(res => setShares(shares + 1));
            }
        } else {
            console.warn('Clipboard API not supported');
        }
    };

    useEffect(() => {
        axios.get(API_URI + "/users/id/" + postComponent.user)
        .then(res => {
            setName(res.data.results.username);
            setProfilePic(res.data.results.profile_picture ? res.data.results.profile_picture : avatar)
            setPostImage(postComponent.image);
            setText(postComponent.content);
            setComments(postComponent.comments_count)
        })
        if (id !== null)
            axios.get(API_URI + "/like/" + postComponent.id + "/user/" + id)
            .then(res => {
                setIsLiked(res.data.userLikesPost);
            })
    }, [postComponent])
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
        <div className="post-card">
            {
            isNeedModal && <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                imageUrl="https://via.placeholder.com/600" // Replace with your image URL
            >
                <Post postId={postComponent.id}/>
            </Modal>
            }
            <div className="post-header">
                <img src={profilePic} alt="Profile" className="post-avatar" />
                <div className="post-info">
                    <h2 className="post-name">{name}</h2>
                    <p className="post-time">{formatTime(time)}</p>
                </div>
            </div>
            <div className="post-content">
                <p>{text}</p>
                {postImage &&
                    <div className="post-image-container" onDoubleClick={handleDoubleClick}>
                        <img src={postImage} alt="Post" className="post-image" />
                        {showHeart && <i className="fas fa-heart heart-icon"></i>}
                    </div>
                }
            </div>
            <div className="post-stats">
                <span>{formatNumber(likes)} Likes</span>
                <span>{formatNumber(comments)} Comments</span>
                <span>{formatNumber(shares)} Shares</span>
            </div>
            <div className="post-actions">
                <button 
                    className={`like-button ${isLiked ? 'liked' : ''}`}
                    onClick={handleLikeClick}
                >
                    <i className="fas fa-heart"></i>
                </button>
                <button className="comment-button" onClick={openModal}>
                    <i className="fas fa-comment"></i>
                </button>
                <button className="share-button" onClick={handleShareClick}>
                    <i className="fas fa-share"></i>
                </button>
            </div>
        </div>
    );
};

export default PostComponent;
