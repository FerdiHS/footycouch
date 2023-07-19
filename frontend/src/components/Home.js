import TextInputPost from "./TextInputPost";
import useToken from "./Token";
import Statistic from "./Statistic";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Home({passProfilePicture, passPosts, passId, passPlayer, passUser}) {
    const navigate = useNavigate();
    const now_costRank = [];
    const performanceRank = [];
    const mostPickedRank = [];
    const player = passPlayer.map(x => {
        now_costRank[x.now_cost_rank - 1] = x;
        performanceRank[x.points_per_game_rank - 1] = x;
        mostPickedRank[x.selected_rank - 1] = x;
        return x;
    })
    const [searchUsername, setsearchUsername] = useState("");
    const [stats, setstats] = useState(null);
    const handleSearchUsername = (e) => {
        setsearchUsername(e.target.value)
    }

    return (
        <div class="container6">
            {
                stats !== null 
                    ? <Statistic player={stats} exitStats={() => setstats(null)}/>
                    : <></>
            }
            <div class="besidePostHome">
                <div class="homeLeaderboard">
                    <h3>Most Expensive Player</h3>
                    <table>
                        <tr>
                            <th style={{textAlign: "center"}}>#</th>
                            <th style={{width: 220, paddingLeft: 5}}>Player</th>
                            <th style={{textAlign: "center"}}>€</th>
                        </tr>
                        {
                            now_costRank.slice(0,10).map((player, index) => {
                                return (<tr style = {index % 2 === 0 ? {backgroundColor: "rgb(233, 233, 233)"} : {}}>
                                            <td style={{textAlign: "center"}}>{index + 1}</td>
                                            <td style={{width: 220, paddingLeft: 5}}><strong class="textLeaderboard" onClick={() => setstats(player)}>{player.first_name + " " + player.second_name}</strong></td>
                                            <td style={{width: 40, textAlign: "center"}}>{player.now_cost}</td>
                                        </tr>)
                            })
                        }
                    </table>
                </div>
                <div class="homeLeaderboard">
                    <h3>Top Player Weekly</h3>
                    <table>
                        <tr>
                            <th style={{textAlign: "center"}}>#</th>
                            <th style={{width: 220, paddingLeft: 5}}>Player</th>
                            <th style={{textAlign: "center"}}>€</th>
                        </tr>
                        {
                            performanceRank.slice(0,10).map((player, index) => {
                                return (<tr style = {index % 2 === 0 ? {backgroundColor: "rgb(233, 233, 233)"} : {}}>
                                            <td style={{textAlign: "center"}}>{index + 1}</td>
                                            <td style={{width: 220, paddingLeft: 5}}><strong class="textLeaderboard" onClick={() => setstats(player)}>{player.first_name + " " + player.second_name}</strong></td>
                                            <td style={{width: 40, textAlign: "center"}}>{player.now_cost}</td>
                                        </tr>)
                            })
                        }
                    </table>
                </div>
                <div class="homeLeaderboard" style={{height: 90}}>
                    <h3>Find User</h3>
                    <div style={{display:"flex", marginTop:15}}> 
                        Handle:
                        <input type="text" class="searchUser" value={searchUsername} onChange={handleSearchUsername}/>    
                    </div>
                    <div class="suggestedUser">
                        {   
                            searchUsername !== ""
                                ? passUser.filter(x => x.username.toLowerCase().includes(searchUsername.toLowerCase())).map((user, i) => {
                                    return (<option onClick={() => navigate("/user/" + user.username)}>{user.username}</option>)
                                })
                                : <></>
                        }
                    </div>
                </div>
                <div class="homeLeaderboard">
                    <h3>Most Selected Player in FPL</h3>
                    <table>
                        <tr>
                            <th style={{textAlign: "center"}}>#</th>
                            <th style={{width: 220, paddingLeft: 5}}>Player</th>
                            <th style={{textAlign: "center"}}>€</th>
                        </tr>
                        {
                            mostPickedRank.slice(0,10).map((player, index) => {
                                return (<tr style = {index % 2 === 0 ? {backgroundColor: "rgb(233, 233, 233)"} : {}}>
                                            <td style={{textAlign: "center"}}>{index + 1}</td>
                                            <td style={{width: 220, paddingLeft: 5}}><strong class="textLeaderboard" onClick={() => setstats(player)}>{player.first_name + " " + player.second_name}</strong></td>
                                            <td style={{width: 40, textAlign: "center"}}>{player.now_cost}</td>
                                        </tr>)
                            })
                        }
                    </table>
                </div>
            </div>
            <div class="post2">
                <TextInputPost username={useToken().token} posts={passPosts} profilePicture={passProfilePicture} id = {passId}/>
            </div>
        </div>);
}
