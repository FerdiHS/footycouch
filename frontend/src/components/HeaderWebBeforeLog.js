import * as React from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function HeaderWebBeforeLog() {
    const navigate = useNavigate();
    return (
        <nav>
          <button class="button1" onClick={() => navigate("/")}><img src={logo} width="200" height="80" alt="logo"/></button>
          <autoRight />
          <button class="button" onClick={() => navigate("/login")}>Login</button>
          <button class="button" onClick={() => navigate("/signup")}>Register</button>
        </nav>
    );
}