import { useState } from "react";
import axios from "axios";
import { isValidUsername } from "./Verification";
import { isValidPassword } from "./Verification";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
/*
const initialState = {
    username: "",
    password: "",
    confirmPassword: "",
};
*/
export default function Register({handlenowPage}) {
    // const [credentials, setCredentials] = useState(initialState);
    const [isLoading, setisLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorusername, seterrorusername] = useState("");
    const [errorPassword, seterrorPassword] = useState("");
    const [errorConfirmpw, seterrorConfirmpw] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (username.length === 0) {
            seterrorusername("Username must be filled")
        } else if (!isValidUsername(username)) {
            seterrorusername("Username must only contain alphanumeric character");
        } else {
            seterrorusername("");
        } 
        if (password.length < 8) {
            seterrorPassword("Password must contain at least 8 character");
            seterrorConfirmpw("")
        } else if (!isValidPassword(password)) {
            seterrorPassword("Password must contain at least one: Uppercase letters: A-Z. Lowercase letters: a-z. Numbers: 0-9");
            seterrorConfirmpw("");
        } else if (password !== confirmPassword) {
            seterrorConfirmpw("Password didn't match");
            seterrorPassword("");
        } else if (errorusername === "") {
            setisLoading(true);
            seterrorConfirmpw("");
            seterrorPassword("");
            axios.post("https://footycouch-production.up.railway.app/signup", {username, password, confirmPassword})
            // axios.post("https://footycouch-backend.vercel.app/signup", {username, password, confirmPassword})
            // axios.post("http://localhost:5000/signup", {username, password, confirmPassword})
            .then(res => {setisLoading(false); window.alert("Signup Successful!")})
            .then(res => navigate("/login"))
            .catch(err => {
                setisLoading(false);
                seterrorusername("Username already been used");
                console.log(err);
            });
        }
    };
    const handleUsernameChange = (event) => {
        // setCredentials(event.target.value);
        setUsername(event.target.value);
    };
    const handlePasswordChange = (event) => {
        // setCredentials(event.target.value);
        setPassword(event.target.value);
    };
    const handleConfirmPasswordChange = (event) => {
        // setCredentials(event.target.value);
        setConfirmPassword(event.target.value);
    };

    return (
        <>
        {
            isLoading ? <Loading /> : <></>
        }
        <div class="container">
            <div class="box2">
                <nav2>
                    <h2>Register</h2>
                </nav2>
                <div class="spacing"></div>
                <form onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input 
                        type="text1" 
                        placeholder="Username" 
                        // value={credentials.username} 
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    {
                        errorusername !== ""
                            ? (<div class="error">{errorusername}</div>)
                            : (<></>)
                    }
                    
                    <label>Password</label>
                    <input 
                        type="password" 
                        placeholder="Password"
                        // value={credentials.password}
                        value={password}
                        onChange={handlePasswordChange} 
                    />
                    {
                        errorPassword !== ""
                            ? (<div class="error">{errorPassword}</div>)
                            : (<></>)
                        
                    }
                    <label>Confirm Password</label>
                    <input 
                        type="password" 
                        placeholder="Password" 
                        // value={credentials.confirmPassword}
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                    {
                        errorConfirmpw !== ""
                            ? (<div class="error">{errorConfirmpw}</div>)
                            : (<></>)
                        
                    }
                    <div class="spacing"></div>
                    <button class="button" type="submit" onSubmit={handleSubmit}>Submit</button>
                    <div class="spacing4"></div>
                </form>
            </div>
        </div>
        </>
    );
}
