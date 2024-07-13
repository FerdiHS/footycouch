import { useSelector } from "react-redux";
import "./WelcomePage.css";
import NavigationBar from "../components/NavigationBar";
import Leaderboard from "../components/LeaderBoard";
import { getUserId } from "../redux/user/userAction";
import { getPlayers } from "../redux/players/playerAction";
import { useEffect, useState } from "react";
import TextInputPost from "../components/TextInputPost";
import PostComponent from "../components/PostComponent";
import axios from "axios";
import { API_URI } from "../constants";
import { useNavigate, useParams } from "react-router-dom";
export default function WelcomePage({ isPublic }) {
    const page = useParams().page;
    const userId = useSelector(getUserId);
    const players = useSelector(getPlayers).players.players;
    const navigate = useNavigate();
    const [width, setWidth] = useState(window.innerWidth);
    const [posts, setPosts] = useState([]);
    const [update, setUpdate] = useState(true);

    const handlePublic = (props) => () => {
        if (props !== isPublic) {
            if (props) {
                navigate("/page/1");
            } else {
                navigate("/page/1/follow");
            }
        }
    }
    useEffect(() => {
        const handleResize = () => {
          setWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    });
    useEffect(() => {
        if (isPublic) {
            axios.get(API_URI + "/post/public/" + page)
            .then(res => setPosts([...res.data.results]));
            setUpdate(false);
        } else {
            axios.get(API_URI + "/post/following/" + userId + "/page/" + page)
            .then(res => setPosts([...res.data.results]))
            setUpdate(false);
        }
    }, [isPublic, update])
    return (
        <div>
            <NavigationBar />
            <div className="content">
                { 
                    players === undefined
                    ? <></>
                    : width > 1000
                        ? <div className="leaderboard_list">
                            <Leaderboard members={players} type="points_per_game" title="PPG"/>
                            <Leaderboard members={players} type="total_points" title="PTS"/>
                        </div>
                        : <>
                            <Leaderboard members={players} type="points_per_game" title="PPG"/>
                            <Leaderboard members={players} type="points_per_game" title="PPG"/>
                        </>
                }
                <div>
                    {
                        userId && <TextInputPost setUpdate={setUpdate}/>
                    }
                    <div className="post-filter">
                        <button className={isPublic ? "clicked" : ""} onClick={handlePublic(true)}>Public Posts</button>
                        <button className={!isPublic ? "clicked" : ""} onClick={handlePublic(false)}>Following Posts</button>
                    </div>
                        {
                            posts.map((post) => {
                                return <PostComponent postComponent={post} isNeedModal={true}/>
                            })
                        }
                    </div>
            </div>
        </div>
    )
}
