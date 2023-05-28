import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
/*
const initialState = {
    username: "",
    password: "",
};
*/
export default function Login() {
    const navigate = useNavigate();
    const [tickrememberme, settickRememberMe] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const [success, setSuccess] = useState(1);
    const handleRemember = () => {
        settickRememberMe(!tickrememberme);
    };
    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const handleSubmit = () => {
        /*
        if (username === "santokyo" && password === "santokyo123") {
            navigate("/home");
        } else {
            window.alert("Incorrect Username or Password");
            // const smth = window.alert("Incorrect Username or Password");
        }
        */
        axios.post("http://localhost:5000/login", {username, password})
        .then(res => navigate("/home"))
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
    return (
            <div class="container">
                <div class="box">
                    <nav2>
                        <h2>Login</h2>
                    </nav2>
                    <div class="spacing"></div>
                    <form>
                        <label>Username<input type="text1" value={username} placeholder="Username" onChange={handleUsernameChange}/></label>
                        <label>Password<input type="password" placeholder="Password" onChange={handlePasswordChange} value={password}/></label>
                    </form>
                    <div class="spacing"></div>
                    <button class="button" onClick={handleSubmit}>Login</button>
                    <div class="spacing"></div>
                    <div class="rememberme">
                        <label>
                            <input type="checkbox" checked={tickrememberme} onClick={handleRemember} name="remember" /> Remember me
                        </label>
                    </div>
                </div>
            </div>
    );
}
        /*
        axios.post("http://localhost:" + process.env.DB_PORT + "/login", credentials)
        .then(res => console.log(res))
        .catch(err => console.log(err));
        */
/*
export default function Login() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState(initialState);
    const [tickrememberme, settickRememberMe] = useState(false);
    const handleRemember = () => {
        settickRememberMe(!tickrememberme);
    };
    const handleUsernameChange = (event) => {
        setCredentials(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setCredentials(event.target.value);
    };
    const handleSubmit = () => {
        if (credentials.username === "santokyo" && credentials.password === "santokyo123") {
            navigate("/home");
        } else {
            // setPassword("");
            window.alert("Incorrect Username or Password");
            // const smth = window.alert("Incorrect Username or Password");
        }
    }
    return (
            <div class="container">
                <div class="box">
                    <nav2>
                        <h2>Login</h2>
                    </nav2>
                    <div class="spacing"></div>
                    <form>
                        <label>Username<input type="text1" value={credentials.username} placeholder="Username" onChange={handleUsernameChange}/></label>
                        <label>Password<input type="password" value={credentials.password} placeholder="Password" onChange={handlePasswordChange}/></label>
                    </form>
                    <div class="spacing"></div>
                    <button class="button" onClick={handleSubmit}>Login</button>
                    <div class="spacing"></div>
                    <div class="rememberme">
                        <label>
                            <input type="checkbox" checked={tickrememberme} onClick={handleRemember} name="remember" /> Remember me
                        </label>
                    </div>
                </div>
            </div>
    );
}
*/