import React, { useEffect, useState } from 'react';
import './SignupPage.css';
import logo from '../assets/logo.png';
import avatar from '../assets/mascot.png';
import NavigationBar from '../components/NavigationBar';
import axios from 'axios';
import { API_URI } from '../constants';
import { useNavigate } from 'react-router-dom';
import Notification from '../components/Notification';
import { useDispatch } from 'react-redux';
import { setMessage } from '../redux/messages/messageAction';

function SignupPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [width, setWidth] = useState(window.innerWidth);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const handleUsername = event => setUsername(event.target.value);
    const handleEmail = event => setEmail(event.target.value);
    const handlePassword = event => setPassword(event.target.value);
    const handleConfirmPassword = event => setConfirmPassword(event.target.value);
    const validateEmail = () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return (regex.test(email));
    };
    const validatePassword = () =>{
        return password.length >= 8 && password.length <= 16;
    }
    const passwordConfirmation = () => {
        return password === confirmPassword;
    }
    const handleSignUp = () => {
        console.log("HAHA");
        if (!validateEmail()) {
            setErrorMessage("Email is not valid.");
            return;
        }
        if (!validatePassword()) {
            setErrorMessage("Password must contain 8 to 16 characters (inclusive).")
            return;
        }
        if (!passwordConfirmation()) {
            setErrorMessage("Password did not match.");
            return;
        }
        setErrorMessage("");
        console.log("HEHE")
        axios.post(API_URI + "/signup", {username, password, email})
            .then(res => {
                dispatch(setMessage("Account Successfully Created"));
                navigate("/login")
            })
            .catch(err => {
                console.log(err);
                setErrorMessage(err.response?.data.message);
        });
    }
    useEffect(() => {
        const handleResize = () => {
          setWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        console.log(width);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    });

    return (
        <div>
            <NavigationBar />
            <div className="container">
                {
                    width < 1200
                        ? <></>
                        : <img src={avatar} alt="Footycouch Logo" className="image"/>
                }
                <div>
                <div className="signup-box">
                    <div className="logo">
                        <img src={logo} alt="Footycouch Logo" />
                    </div>
                    <div className="form">
                        <label htmlFor="username">Username</label>
                        <input 
                        type="text" 
                        name="username" 
                        placeholder="Username" 
                        value={username}
                        onChange={handleUsername}
                        required />
                        <label htmlFor="username">Email</label>
                        <input 
                        type="text" 
                        name="email" 
                        placeholder="Email" 
                        value={email}
                        onChange={handleEmail}
                        required />
                        <label htmlFor="password">Password</label>
                        <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={handlePassword}
                        required />
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input 
                        type="password" 
                        name="confirmPassword" 
                        placeholder="Confirm Password" 
                        value={confirmPassword}
                        onChange={handleConfirmPassword}
                        required />
                        {
                            errorMessage === ""
                            ? <></>
                            : <p>{errorMessage}</p>
                        }
                        <button type="submit" onClick={handleSignUp}>SIGN UP</button>
                    </div>
                    <div className="separator">OR</div>
                    <button className="btn-gmail">Log in with Gmail</button>
                </div>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;