import { useState } from "react"
import axios from "axios";
import Loading from "./Loading";
import UserFollow from "./UserFollow";
export default function Follow({FollowComponent, exitFollow, type, id, followings}) {
    const [isLoading, setisLoading] = useState(false);

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