import { useNavigate } from "react-router-dom";
export default function Welcome() {
    const navigate = useNavigate();
    return (<div class="container">
                <div class="spacing1" />
                <button class="button2" onClick={() => navigate("/login")}>Login</button>
                <button class="button2" onClick={() => navigate("/signup")}>Sign Up</button>
            </div>);
}