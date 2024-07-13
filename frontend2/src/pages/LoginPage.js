import React, { useEffect, useState } from 'react';
import './LoginPage.css';
import logo from '../assets/logo.png';
import avatar from '../assets/mascot.png';
import NavigationBar from '../components/NavigationBar';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { API_URI } from '../constants';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../redux/user/userAction';
import { setMessage } from '../redux/messages/messageAction';
import { addPlayers } from '../redux/players/playerAction';

function LoginPage() {
    const [width, setWidth] = useState(window.innerWidth);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleUsername = event => setUsername(event.target.value);
    const handlePassword = event => setPassword(event.target.value);
    const login = () => {
        setIsError(false);
        axios.post(API_URI + "/login", {username, password})
        .then(res => {
            console.log(res.data);
            dispatch(setUser(res.data.data));
            dispatch(setMessage("Login Successful"));
            navigate("/");
        })
        .then(res => console.log(res))
        .catch(err => {
            setIsError(true);
            console.log(err);
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
                <div className="login-box">
                    <div className="logo">
                        <img src={logo} alt="Footycouch Logo" />
                    </div>
                    <div className="form">
                        <label htmlFor="username">Username or Email</label>
                        <input 
                        type="text" 
                        name="username" 
                        placeholder="Username" 
                        value={username}
                        onChange={handleUsername}
                        required />
                        <label htmlFor="password">Password</label>
                        <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={handlePassword}
                        required />
                        {
                            isError
                                ? <p>Invalid Username or Password</p>
                                : <></>
                        }
                        <button type="submit" onClick={login}>LOG IN</button>
                    </div>
                    <div className="separator">OR</div>
                    <button className="btn-gmail">Log in with Gmail</button>
                    <a href="./forgotpassword">Forgot password?</a>
                </div>
                <div className="login-box">
                    <p className="signup-link">Don't have an account? <a href="./signup">Sign up here</a></p>
                </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;