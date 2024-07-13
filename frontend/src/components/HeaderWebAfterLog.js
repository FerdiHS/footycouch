import * as React from "react";
import logo from "../assets/logo.png";
import axios from "axios";
import mascot from "../assets/mascot.png";
import Statistic from "./Statistic";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "./Token";
import { API_URI } from "../constants";
export default function HeaderWebAfterLog({setToken}) {
    const navigate = useNavigate();
    const [profilePicture, setProfilePicture] = useState(null);
    const handleLogOut = () => {
        if(window.confirm("Are you sure to log out?")) {
            setToken(null);
            navigate("/login");
        }
    }
    const username = useToken().token;
    const loadPP = async () => {
        if(profilePicture === null) {
            const users = (await axios.get(API_URI + "/users/" + username)).data.data;
            console.log(users);
            setProfilePicture(users.profile_picture);
        }
    }
    loadPP();
    return (
        <nav>
            <button class="button1" onClick={() => navigate("/home")}><img src={logo} width="150" height="60" alt="logo"/></button>
            <autoRight />
            <button class="button" onClick={() => navigate("/team_management")}>Team Management</button>
            <button class="button" onClick={() => navigate("/pastHistory")}>Past History</button>
            <button class="button" onClick={handleLogOut}>Log Out</button>
            <img src={profilePicture === null ? mascot : profilePicture} class="ppHeaders" width = "60" height = "60" alt="PP" onClick={() => navigate("/profile")}/>
        </nav>
    );
}

