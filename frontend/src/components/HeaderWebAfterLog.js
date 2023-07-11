import * as React from "react";
import logo from "../assets/logo.png";
import mascot from "../assets/mascot.png";
import Statistic from "./Statistic";
import { useNavigate } from "react-router-dom";
export default function HeaderWebAfterLog({setToken}) {
    const navigate = useNavigate();
    const handleLogOut = () => {
        if(window.confirm("Are you sure to log out?")) {
            setToken(null);
            navigate("/login");
        }
    }
    return (
        <nav>
            <button class="button1" onClick={() => navigate("/home")}><img src={logo} width="150" height="60" alt="logo"/></button>
            <autoRight />
            <button class="button" onClick={() => navigate("/team_management")}>Team Management</button>
            <button class="button" onClick={() => <Statistic />}>Match Schedule</button>
            <button class="button" onClick={handleLogOut}>Log Out</button>
            <img src={mascot} width = "60" height = "60" className="top-0 end-0" alt="maskot" onClick={() => navigate("/profile")}/>
        </nav>
    );
}
