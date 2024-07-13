import React, { useState, useEffect } from 'react';
import axios from 'axios';
import submitIcon from '../assets/Submit.png';
import avatar from '../assets/Avatar2.png'; // Import your avatar image here
import { API_URI } from '../constants';
import './Post.css'; // Create a CSS file for the comment styles
import { useSelector } from 'react-redux';
import { getProfilePicture, getUserId } from '../redux/user/userAction';
import PostComponent from './PostComponent';
import Comment from './Comment';

const Post = ({ postId }) => {
    const id = useSelector(getUserId);
    const profilePic = useSelector(getProfilePicture);
    const [postComponent, setPostComponent] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        // Fetch comments for the post
        axios.get(API_URI + "/post/" + postId)
            .then(res => {
                console.log(res.data.results);
                setPostComponent(res.data.results[0]);
            })
            .catch(err => {
                console.error("Failed to fetch Post: ", err);
            });
        axios.get(API_URI + "/comment/" + postId)
            .then(res => {
                console.log(res.data);
                setComments(res.data.results);
            })
            .catch(err => {
                console.error(err)
            })
    }, [postId, comments]);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim() === "") return;
        console.log(id);
        const commentData = {
            content: newComment,
            id: id,
        };

        axios.post(`${API_URI}/comment/${postId}`, commentData)
            .then(res => {
                axios.get(API_URI + "/comment/" + postId)
                    .then(res => {
                        setComments([]);
                    })
                    .catch(err => {
                        console.error(err)
                    })
                setNewComment("");
            })
            .catch(err => {
                console.error("Failed to post comment: ", err);
            });
    };

    return (
        <div>
            { postComponent && <PostComponent postComponent={postComponent} />}
            <div className="comments-section">
                {
                    id &&
                <form className="comment-form" onSubmit={handleCommentSubmit}>
                    <img src={profilePic ? profilePic : avatar} alt="Profile" className="comment-form-avatar" />
                    <div className="comment-input-wrapper">
                        <input
                            type="text"
                            placeholder="Write a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button type="submit" className="comment-submit-button">
                            <img src={submitIcon} alt="Submit" />
                        </button>
                    </div>
                </form>
                }
                <div className="comments-list">
                    {comments.map((comment) => (
                        <Comment comment={comment} />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Post;
