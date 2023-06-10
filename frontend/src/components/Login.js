import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
/*
const initialState = {
    username: "",
    password: "",
};
*/
export default function Login({setToken}) {
    const navigate = useNavigate();
    const [tickrememberme, settickRememberMe] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, seterror] = useState(false);
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
        // axios.post("https://footycouch-production.up.railway.app/login", {username, password})
        axios.post("http://localhost:5000/login", {username, password})
        .then(res => {
            seterror(false);
            setToken(username);
            navigate("/home");
        })
        .then(res => console.log(res))
        .catch(err => {
            seterror(true);
            console.log(err)
        });
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
                    {
                        error ? (<div class="error">Invalid username or password</div>) : (<></>)
                    }
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
