import React, { useState } from 'react';
import logo from "../assets/logo.png";
import './NavigationBar.css'; // Import your CSS file for styling
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfilePicture, getUserId, logOut } from '../redux/user/userAction';
import avatar from '../assets/Avatar2.png'

export default function NavigationBar() {
    const userId = useSelector(getUserId);
    const profilePicture = useSelector(getProfilePicture);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const handleSearchInput = (event) => {
        setQuery(event.target.value)
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            navigate("/search/" + query);
        }
    };
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={logo} alt="Logo" onClick={() => navigate("/")}/>
                <div className="search-bar">
                    <input 
                    type="text" 
                    placeholder="Search..." 
                    value={query} 
                    onChange={handleSearchInput} 
                    onKeyDown={handleKeyDown}
                    />
                </div>
            </div>
            {
                userId === null
                ? <div className="navbar-buttons">
                    <button className="btn-login" onClick={() => navigate("/login")}>Login</button>
                    <button className="btn-signup" onClick={() => navigate("/signup")}>Sign Up</button>
                </div>
                : <><div className="navbar-buttons">
                    <button className="btn-login">Team Management</button>
                    <button className="btn-signup">Past History</button>
                    <button className="btn-signup" onClick={() => dispatch(logOut())}>LOGOUT</button>
                </div>
                <div className="navbar-buttons">
                    <img src={profilePicture === null ? profilePicture : avatar} alt="PP"/>
                </div>
                </>
            }
        </nav>
    );
}