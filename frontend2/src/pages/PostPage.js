import "./PostPage.css";
import NavigationBar from "../components/NavigationBar";
import { useParams } from "react-router-dom";
import Post from "../components/Post";

export default function PostPage() {
    const id = useParams().id;
    return (
        <div className="post-page-container">
            <NavigationBar />
            <div className="post-container">
                <Post postId={id} />
            </div>
        </div>
    )
}