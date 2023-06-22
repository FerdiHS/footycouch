import HeaderWebAfterLog from "../components/HeaderWebAfterLog.js"
import Profile from "../components/Profile.js";
import axios from "axios";
import { useState } from "react";
import useToken from "../components/Token.js"
export default function ProfilePage({setToken}) {
    return (
        <div class="App">
            <HeaderWebAfterLog setToken={setToken}/>
            <Profile/>
        </div>
    );
}
