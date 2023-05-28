import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register({handlenowPage}) {
    /*
    const initialState = {
        username: "",
        password: "",
        confirmPassword: ""
    }
    */
    const navigate = useNavigate();
    // const [credentials, setCredentials] = useState(initialState);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const handleSubmit = async (event) => {
        event.preventDefault();
        axios.post("http://localhost:5000/signup", {username, password, confirmPassword})
        .then(res => window.alert("Signup Successful!"))
        .then(res => navigate("/login"))
        .catch(err => console.log(err));
    };
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    return (
        <>
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
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    
                    <label>Password</label>
                    <input 
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange} 
                    />

                    <label>Confirm Password</label>
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                    <div class="spacing"></div>
                    <button class="button" type="submit">Submit</button>
                </form>
            </div>
        </div>
        </>
    );
}