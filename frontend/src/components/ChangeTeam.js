import { useState } from "react"
import axios from "axios";
import Loading from "./Loading";
import { API_URI } from "../constants";
export default function ChangeTeam({setFavTeam, exitChangeTeam, id, teams, favteams}) {
    const [currfav, setcurrfav] = useState(favteams);
    const [isLoading, setisLoading] = useState(false);
    const handleSave = () => {
        if(currfav !== favteams) {
            setisLoading(true)
            axios.post(API_URI + "/users/id/" + id +"/favteam", {fav_team: currfav}). then(
                x => {setFavTeam(currfav); setisLoading(false);exitChangeTeam(); }
            ).catch(err => {console.log(err); setisLoading(false)});
        } else {
            exitChangeTeam();
        }
           
    }
    return (
    <div class="statistic">
        {
            isLoading
                ? <Loading />
                : <></>
        }
        <div class="changeTeam">
            <h2 style={{textAlign:"center", width: "100%", position:"relative", top:40}}>Change Team</h2>
            <button class="exitStats" onClick={exitChangeTeam}>X</button>
            <div class="teamscon">
                <table class="teams">
                        {
                            teams.slice(0, 5).map((team, index) => {
                                return (<tr class="teams">
                                        <td class="teams" onClick={() => setcurrfav(teams[4 * index].code)} style={currfav === teams[4 * index].code ? {filter: "brightness(70%)"} : {}}>
                                            <img src={"https://resources.premierleague.com/premierleague/badges/t" + teams[4 * index].code + ".png"} />
                                            <h4>{teams[4 * index].name}</h4>
                                        </td>
                                        <td class="teams" onClick={() => setcurrfav(teams[4 * index + 1].code)} style={currfav === teams[4 * index + 1].code ? {filter: "brightness(70%)"} : {}}>
                                            <img src={"https://resources.premierleague.com/premierleague/badges/t" + teams[4 * index + 1].code + ".png"} />
                                            <h4>{teams[4 * index + 1].name}</h4>
                                        </td>
                                        <td class="teams" onClick={() => setcurrfav(teams[4 * index + 2].code)} style={currfav === teams[4 * index + 2].code ? {filter: "brightness(70%)"} : {}}>
                                            <img src={"https://resources.premierleague.com/premierleague/badges/t" + teams[4 * index + 2].code + ".png"} />
                                            <h4>{teams[4 * index + 2].name}</h4>
                                        </td>
                                        <td class="teams" onClick={() => setcurrfav(teams[4 * index + 3].code)} style={currfav === teams[4 * index + 3].code ? {filter: "brightness(70%)"} : {}}>
                                            <img src={"https://resources.premierleague.com/premierleague/badges/t" + teams[4 * index + 3].code + ".png"} />
                                            <h4>{teams[4 * index + 3].name}</h4>
                                        </td>
                            </tr>)
                        })
                    }
                </table>
            </div>
            <button class="changeTeamSave" onClick={handleSave}>Save</button>
        </div>
    </div>)
}