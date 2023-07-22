import { useState } from "react"
import axios from "axios";
import Loading from "./Loading";
import UserFollow from "./UserFollow";
export default function Follow({FollowComponent, exitFollow, type, id}) {
    const [isLoading, setisLoading] = useState(false);
    const [followings, setfollowings] = useState(null);
    const loadFollowings = async () => {
        axios.get("https://footycouch-production.up.railway.app/users/following/" + id).then(following => setfollowings(following.data.data)).catch(err => console.log(err))
    }
    if (followings === null) {
        loadFollowings();
        return <Loading />
    }
    return (
    <div class="statistic">
        <div class="followCon">
            <button class="exitStats" onClick={exitFollow}>X</button>
            <h2 style={{textAlign:"center", width:"100%"}}>{!type ? "Followings" : "Followers"}</h2>
            <div style={{borderTop: "1px solid black", width:"100%", overflowY:"auto"}} />
            {
                FollowComponent.map((user, index) => {
                    return <UserFollow Follow={user} type={type} followings={followings} id ={id}/>
                })
            }
        </div>
    </div>)
}
