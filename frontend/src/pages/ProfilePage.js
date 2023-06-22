import HeaderWebAfterLog from "../components/HeaderWebAfterLog.js"
import Profile from "../components/Profile.js";
import axios from "axios";
import { useState } from "react";
import useToken from "../components/Token.js"
export default function ProfilePage({setToken}) {
    const username = useToken().token;
    const [Id, setId] = useState(0);
    const [Bio, setBio] = useState("SIUUUU");
    const [Formation, setFormation] = useState("4-3-3");
    const [Points, setPoints] = useState(0);
    const [Following, setFollowing] = useState([]);
    axios.get("https://footycouch-production.up.railway.app/users/" + username)
    .then(res => {
        console.log(res);
        setId(res.data.data.id);
        setBio(res.data.data.bio);
        setFormation(res.data.data.formation);
        setPoints(res.data.data.points);
    })
    .catch(err => {
        console.log(err);
    });
    /*
    axios.get("https://footycouch-production.up.railway.app/users/" + username + "/image")
    .then(res => {
        if (res.status !== 500) {
            // Create a buffer from the base64 image string
            const imageBuffer = Buffer.from(res.image, 'base64');
            setProfilePicture(image buffer);
        }
    })
    .catch(err => {
        console.log(err);
    })
    */
    axios.get("https://footycouch-production.up.railway.app/users/following/" + Id)
    .then(res => {
        setFollowing(res.data);
    })
    .catch(err => {
        console.log(err);
    })
    
    return (
        <div class="App">
            <HeaderWebAfterLog setToken={setToken}/>
            <Profile passID = {Id} passBio = {Bio} passFormation = {Formation} passPoints={Points} passFollowing={Following}/>
        </div>
    );
}
