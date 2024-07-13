import { useState } from "react"
import axios from "axios";
import Loading from "./Loading";
import { API_URI } from "../constants";
import UserFollow from "./UserFollow";

export default function Follow({FollowComponent, exitFollow, type, id}) {
    const [isLoading, setisLoading] = useState(false);
    const [followings, setfollowings] = useState(null);
    const loadFollowings = async () => {
        axios.get(API_URI + "/users/following/" + id).then(following => setfollowings(following.data.data)).catch(err => console.log(err))
    }
    if (followings === null) {
        loadFollowings();
        return <Loading />
    }
    return (
    <div class="statistic" style={{cursor:"pointer"}}>
        <div class="followCon">
            <button class="exitStats" onClick={exitFollow}>X</button>
            <h2 style={{textAlign:"center", width:"100%"}}>{!type ? "Followings" : "Followers"}</h2>
            <div style={{borderTop: "1px solid black", width:"100%", overflowY:"auto"}} />
            {
                FollowComponent.length > 0
                    ? FollowComponent.map((user, index) => {
                        return <UserFollow Follow={user} type={type} followings={followings} id ={id}/>
                    })
                    : <h4 style={{textAlign: "center"}}>No Account Found</h4>
            }
        </div>
    </div>)
}
